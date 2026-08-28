#!/usr/bin/env bash
#
# Simulate the GitHub Actions **fb producer** CI build and RC draft-release upload.
#
# Mirrors GHA RC release flow (orchestrated by `.github/workflows/ci.yml`):
#   ci-bundle.yml              → earthly +prepare-rc-archives-from-pack (RC) or +npm-bundle (PR)
#   ci-build-documentation.yml → earthly +prepare-documentation-sites-archives
#   ci-publish-rc-release.yml  → earthly +validate-rc-archives, +npm-publish-rc-release (optional)
#
# Optional CI jobs (disabled by default; pass flags to enable):
#   --checks           → earthly +npm-check-all
#   --tests            → earthly +npm-test
#   --e2e              → earthly +npm-e2e
#   --apps-and-views   → earthly +npm-build-apps-and-views
#
# Usage:
#   ./scripts/simulate-ci-rc-release.sh
#   ./scripts/simulate-ci-rc-release.sh --publish
#   ./scripts/simulate-ci-rc-release.sh --no-publish
#   ./scripts/simulate-ci-rc-release.sh --all --publish
#   ./scripts/simulate-ci-rc-release.sh --pr
#   ./scripts/simulate-ci-rc-release.sh --dry-run
#
# -----------------------------------------------------------------------------
# Environment variables
# -----------------------------------------------------------------------------
#
# Publish step (required on `rc/*` branches by default, or with `--publish`):
#   GH_TOKEN
#     GitHub API token with `contents: write`. `GITHUB_TOKEN` is accepted as an alias.
#     Export explicitly, for example: `export GH_TOKEN="$(gh auth token)"`
#
#   GITHUB_REPOSITORY / GITHUB_SHA
#     Used by the upload script inside the container. Pass to Earthly as REPO_SLUG and
#     GITHUB_SHA build args (Earthly reserves the GITHUB_REPOSITORY arg name).
#
# Optional:
#   ARCHIVES_DIR
#     Directory containing release archive files. Default: `.archives`
#
#   PREPARE_RC_ARCHIVES
#     When `1` (default), runs `earthly --output +prepare-rc-archives-from-pack`
#     (pack + RC archives exported to `.archives/`). When `0` (or `--pr`), runs
#     `earthly +npm-bundle` with pack only - same as a non-RC PR.
#
#   EARTHLY_BIN
#     Earthly executable name/path. Default: `earthly`
#
#   EARTHLY_EXTRA_ARGS
#     Extra arguments appended to every earthly invocation (e.g. `--disable-remote-cache`).
#
# Set inside Earthly targets (normally no need to set locally):
#   NODE_OPTIONS=--max-old-space-size=8192   (npm-bundle, archive prepare)
#   CI=true                                   (npm-test, npm-e2e)
#   PLAYWRIGHT_DOCKER=1                       (npm-e2e)
#   PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1 (npm-e2e)
#
# Prerequisites:
#   earthly, git
#   node - required when archive validation runs (default RC flow)
#   gh - optional; used to infer GITHUB_REPOSITORY
#
# See also: scripts/release/README.md

set -euo pipefail

if [ -z "${BASH_VERSION:-}" ]; then
  exec /usr/bin/env bash "$0" "$@"
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

ARCHIVES_DIR="${ARCHIVES_DIR:-.archives}"
export ARCHIVES_DIR
PREPARE_RC_ARCHIVES="${PREPARE_RC_ARCHIVES:-1}"
EARTHLY_BIN="${EARTHLY_BIN:-earthly}"
EARTHLY_EXTRA_ARGS="${EARTHLY_EXTRA_ARGS:-}"

RUN_CHECKS=false
RUN_TESTS=false
RUN_E2E=false
RUN_BUNDLE=true
RUN_DOCS=true
RUN_APPS_AND_VIEWS=false
RUN_VALIDATE=true
RUN_PUBLISH=false
PUBLISH_EXPLICIT=false
DRY_RUN=false

log() {
  printf '==> %s\n' "$*"
}

die() {
  printf 'error: %s\n' "$*" >&2
  exit 1
}

usage() {
  sed -n '2,/^set -euo pipefail$/p' "$0" | sed '1d;$d' | sed 's/^# \{0,1\}//'
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"
}

report_missing_requirements() {
  local -n missing_commands="$1"
  local -n missing_env="$2"

  if [[ ${#missing_commands[@]} -gt 0 || ${#missing_env[@]} -gt 0 ]]; then
    printf 'error: preflight failed\n' >&2
    if [[ ${#missing_commands[@]} -gt 0 ]]; then
      printf '  missing commands:\n' >&2
      printf '    - %s\n' "${missing_commands[@]}" >&2
    fi
    if [[ ${#missing_env[@]} -gt 0 ]]; then
      printf '  missing environment variables:\n' >&2
      printf '    - %s\n' "${missing_env[@]}" >&2
      if [[ " ${missing_env[*]} " == *" GH_TOKEN "* ]]; then
        printf '  hint: export GH_TOKEN="$(gh auth token)" or set GITHUB_TOKEN\n' >&2
      fi
    fi
    exit 1
  fi
}

log_preflight_plan() {
  local plan="none"

  if [[ "${RUN_CHECKS}" == true ]]; then plan="checks"; fi
  if [[ "${RUN_TESTS}" == true ]]; then
    [[ "${plan}" == "none" ]] && plan="tests" || plan="${plan} tests"
  fi
  if [[ "${RUN_E2E}" == true ]]; then
    [[ "${plan}" == "none" ]] && plan="e2e" || plan="${plan} e2e"
  fi
  if [[ "${RUN_BUNDLE}" == true ]]; then
    [[ "${plan}" == "none" ]] && plan="bundle" || plan="${plan} bundle"
  fi
  if [[ "${RUN_DOCS}" == true ]]; then
    [[ "${plan}" == "none" ]] && plan="docs" || plan="${plan} docs"
  fi
  if [[ "${RUN_APPS_AND_VIEWS}" == true ]]; then
    [[ "${plan}" == "none" ]] && plan="apps-and-views" || plan="${plan} apps-and-views"
  fi
  if [[ "${RUN_VALIDATE}" == true && "${PREPARE_RC_ARCHIVES}" == 1 ]]; then
    [[ "${plan}" == "none" ]] && plan="validate" || plan="${plan} validate"
  fi
  if [[ "${RUN_PUBLISH}" == true ]]; then
    [[ "${plan}" == "none" ]] && plan="publish" || plan="${plan} publish"
  fi

  log "Preflight plan: ${plan}"
  if [[ "${RUN_PUBLISH}" == true ]]; then
    log "Publish target: ${GITHUB_REPOSITORY:-pending} @ ${GITHUB_SHA:-pending}"
  elif [[ "${PREPARE_RC_ARCHIVES}" == 1 ]]; then
    log "Publish disabled: use --publish or run on an rc/* branch to mirror CI publish-rc-release"
  fi
}

resolve_gh_token() {
  if [[ -n "${GH_TOKEN:-}" ]]; then
    export GH_TOKEN
    return
  fi

  if [[ -n "${GITHUB_TOKEN:-}" ]]; then
    export GH_TOKEN="${GITHUB_TOKEN}"
    log "Using GITHUB_TOKEN as GH_TOKEN"
  fi
}

run_earthly() {
  # shellcheck disable=SC2086
  "${EARTHLY_BIN}" --ci ${EARTHLY_EXTRA_ARGS} "$@"
}

infer_github_repository() {
  if [[ -n "${GITHUB_REPOSITORY:-}" ]]; then
    printf '%s' "${GITHUB_REPOSITORY}"
    return
  fi

  if command -v gh >/dev/null 2>&1; then
    gh repo view --json nameWithOwner --jq .nameWithOwner 2>/dev/null && return
  fi

  local remote_url
  remote_url="$(git -C "${REPO_ROOT}" config --get remote.origin.url 2>/dev/null || true)"
  [[ -n "${remote_url}" ]] || die "Set GITHUB_REPOSITORY (could not infer from git remote)"

  case "${remote_url}" in
    git@github.com:*)
      printf '%s' "${remote_url#git@github.com:}" | sed 's/\.git$//'
      ;;
    https://github.com/*)
      printf '%s' "${remote_url#https://github.com/}" | sed 's/\.git$//'
      ;;
    *)
      die "Unsupported git remote URL for GITHUB_REPOSITORY inference: ${remote_url}"
      ;;
  esac
}

resolve_publish_env() {
  if [[ -z "${GITHUB_REPOSITORY:-}" ]]; then
    export GITHUB_REPOSITORY="$(infer_github_repository)"
  fi
  if [[ -z "${GITHUB_SHA:-}" ]]; then
    export GITHUB_SHA="$(git -C "${REPO_ROOT}" rev-parse HEAD)"
  fi
  export ARCHIVES_DIR
}

check_requirements() {
  local -a MISSING_COMMANDS=()
  local -a MISSING_ENV=()

  if ! command -v "${EARTHLY_BIN}" >/dev/null 2>&1; then
    MISSING_COMMANDS+=("${EARTHLY_BIN}")
  fi
  if ! command -v git >/dev/null 2>&1; then
    MISSING_COMMANDS+=('git')
  fi

  if [[ "${RUN_VALIDATE}" == true && "${PREPARE_RC_ARCHIVES}" == 1 ]]; then
    if ! command -v node >/dev/null 2>&1; then
      MISSING_COMMANDS+=('node')
    fi
  fi

  if [[ "${RUN_PUBLISH}" == true ]]; then
    if [[ "${PREPARE_RC_ARCHIVES}" != 1 ]]; then
      die "Cannot publish without RC archives; rerun without --pr or set PREPARE_RC_ARCHIVES=1"
    fi

    resolve_gh_token
    if [[ -z "${GH_TOKEN:-}" ]]; then
      MISSING_ENV+=('GH_TOKEN')
    fi
    resolve_publish_env
    if [[ -z "${GITHUB_REPOSITORY:-}" ]]; then
      MISSING_ENV+=('GITHUB_REPOSITORY')
    fi
    if [[ -z "${GITHUB_SHA:-}" ]]; then
      MISSING_ENV+=('GITHUB_SHA')
    fi
  elif [[ "${RUN_VALIDATE}" == true && "${PREPARE_RC_ARCHIVES}" == 1 && "${RUN_BUNDLE}" == false ]]; then
    if [[ ! -d "${REPO_ROOT}/${ARCHIVES_DIR}" ]]; then
      die "ARCHIVES_DIR does not exist: ${ARCHIVES_DIR} (run bundle first or drop --skip-bundle)"
    fi
  fi

  report_missing_requirements MISSING_COMMANDS MISSING_ENV
  log_preflight_plan

  if [[ "${RUN_PUBLISH}" == true && "${RUN_BUNDLE}" == false && ! -d "${REPO_ROOT}/${ARCHIVES_DIR}" ]]; then
    die "ARCHIVES_DIR does not exist: ${ARCHIVES_DIR} (run bundle first or drop --skip-bundle)"
  elif [[ "${RUN_VALIDATE}" == true && "${PREPARE_RC_ARCHIVES}" == 1 && "${RUN_BUNDLE}" == false && ! -d "${REPO_ROOT}/${ARCHIVES_DIR}" ]]; then
    die "ARCHIVES_DIR does not exist: ${ARCHIVES_DIR} (run bundle first or drop --skip-bundle)"
  fi

  if [[ "${RUN_PUBLISH}" == true ]]; then
    log "Publish env: GITHUB_REPOSITORY=${GITHUB_REPOSITORY} GITHUB_SHA=${GITHUB_SHA} GH_TOKEN=***"
  fi
}

validate_archives_at() {
  local archives_dir="$1"
  test -d "$archives_dir" || die "Missing archives directory $archives_dir"
  find "$archives_dir" -maxdepth 1 -type f | grep -q . || die "$archives_dir is empty"
  local required name
  required=$(node -e "import {REQUIRED_ARCHIVE_FILES} from './scripts/release/constants.ts'; process.stdout.write(REQUIRED_ARCHIVE_FILES.join(' '))")
  for name in $required; do
    test -f "$archives_dir/$name" || die "Missing $archives_dir/$name"
  done
  find "$archives_dir" -maxdepth 1 -type f -name 'react-form-builder-*.tgz' | grep -q . \
    || die "No react-form-builder-*.tgz in $archives_dir"
  log "Archives OK: $archives_dir"
}

validate_archives() {
  log "Validate archives in ${ARCHIVES_DIR}"
  validate_archives_at "${REPO_ROOT}/${ARCHIVES_DIR}"
}

publish_release() {
  log "Publish draft GitHub release to ${GITHUB_REPOSITORY} @ ${GITHUB_SHA}"
  # shellcheck disable=SC2086
  "${EARTHLY_BIN}" --ci ${EARTHLY_EXTRA_ARGS} --secret GH_TOKEN +npm-publish-rc-release \
    --REPO_SLUG="${GITHUB_REPOSITORY}" \
    --GITHUB_SHA="${GITHUB_SHA}"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --checks)
      RUN_CHECKS=true
      shift
      ;;
    --tests)
      RUN_TESTS=true
      shift
      ;;
    --e2e)
      RUN_E2E=true
      shift
      ;;
    --apps-and-views)
      RUN_APPS_AND_VIEWS=true
      shift
      ;;
    --all)
      RUN_CHECKS=true
      RUN_TESTS=true
      RUN_E2E=true
      RUN_APPS_AND_VIEWS=true
      shift
      ;;
    --publish)
      RUN_PUBLISH=true
      PUBLISH_EXPLICIT=true
      shift
      ;;
    --no-publish)
      RUN_PUBLISH=false
      PUBLISH_EXPLICIT=true
      shift
      ;;
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --skip-bundle)
      RUN_BUNDLE=false
      shift
      ;;
    --skip-docs)
      RUN_DOCS=false
      shift
      ;;
    --skip-validate)
      RUN_VALIDATE=false
      shift
      ;;
    --pr)
      PREPARE_RC_ARCHIVES=0
      shift
      ;;
    --rc)
      PREPARE_RC_ARCHIVES=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      die "Unknown argument: $1 (use --help)"
      ;;
  esac
done

cd "${REPO_ROOT}"

if [[ "${PUBLISH_EXPLICIT}" == false ]]; then
  current_branch="$(git branch --show-current 2>/dev/null || true)"
  if [[ "${current_branch}" == rc/* ]]; then
    RUN_PUBLISH=true
  fi
fi

check_requirements

if [[ "${DRY_RUN}" == true ]]; then
  log "Dry run complete."
  exit 0
fi

if [[ "${RUN_CHECKS}" == true ]]; then
  log "CI checks (earthly +npm-check-all)"
  run_earthly +npm-check-all
fi

if [[ "${RUN_TESTS}" == true ]]; then
  log "CI tests (earthly +npm-test)"
  run_earthly +npm-test
fi

if [[ "${RUN_E2E}" == true ]]; then
  log "CI e2e (earthly +npm-e2e)"
  run_earthly +npm-e2e
fi

if [[ "${RUN_BUNDLE}" == true ]]; then
  if [[ "${PREPARE_RC_ARCHIVES}" == 1 ]]; then
    log "CI RC bundle: earthly +prepare-rc-archives-from-pack"
    run_earthly --output +prepare-rc-archives-from-pack
  else
    log "CI bundle: earthly +npm-bundle pack only"
    run_earthly +npm-bundle --prepareRcArchives=0
  fi
fi

if [[ "${RUN_DOCS}" == true ]]; then
  log "CI documentation sites build: earthly +prepare-documentation-sites-archives"
  run_earthly --output +prepare-documentation-sites-archives
fi

if [[ "${RUN_APPS_AND_VIEWS}" == true ]]; then
  log "CI apps and views build (earthly +npm-build-apps-and-views)"
  run_earthly --output +npm-build-apps-and-views
fi

if [[ "${RUN_VALIDATE}" == true ]]; then
  if [[ "${PREPARE_RC_ARCHIVES}" == 1 ]]; then
    validate_archives
  else
    log "Skip archive validation (PREPARE_RC_ARCHIVES=0 / --pr)"
  fi
fi

if [[ "${RUN_PUBLISH}" == true ]]; then
  if [[ ! -d "${REPO_ROOT}/${ARCHIVES_DIR}" ]]; then
    die "ARCHIVES_DIR does not exist: ${ARCHIVES_DIR}"
  fi
  publish_release
fi

log "Done."
