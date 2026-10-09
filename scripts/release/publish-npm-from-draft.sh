#!/usr/bin/env bash
# Download react-form-builder-*.tgz from a draft GitHub Release and publish to npm.
# Intended for GitHub Actions OIDC trusted publishing (no NPM_TOKEN / NODE_AUTH_TOKEN).
set -euo pipefail

VERSION="${VERSION:?VERSION is required (draft release tag / lerna version)}"
REPO="${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"
TAG="${NPM_PUBLISH_TAG:-latest}"
OUT_DIR="${ARCHIVES_DIR:-.archives}"
PATTERN="react-form-builder-*-${VERSION}.tgz"

if [ -n "${NODE_AUTH_TOKEN:-}" ] || [ -n "${NPM_TOKEN:-}" ]; then
  echo "NODE_AUTH_TOKEN/NPM_TOKEN must be unset for OIDC trusted publishing" >&2
  exit 1
fi

mkdir -p "${OUT_DIR}"
rm -f "${OUT_DIR}"/react-form-builder-*.tgz

echo "==> Download ${PATTERN} from draft release ${VERSION} on ${REPO}"
if command -v gh >/dev/null 2>&1; then
  gh release download "${VERSION}" \
    --repo "${REPO}" \
    --pattern "${PATTERN}" \
    --dir "${OUT_DIR}" \
    --clobber
else
  echo "gh CLI is required to download draft release assets" >&2
  exit 1
fi

shopt -s nullglob
archives=("${OUT_DIR}"/react-form-builder-*-"${VERSION}".tgz)
if [ "${#archives[@]}" -eq 0 ]; then
  echo "No archives matching ${PATTERN} in ${OUT_DIR}" >&2
  exit 1
fi

echo "==> Publishing ${#archives[@]} package(s) with dist-tag ${TAG}"
for tarball in "${archives[@]}"; do
  name_version="$(tar -xOf "${tarball}" package/package.json | node -e 'let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{const j=JSON.parse(d);console.log(`${j.name}@${j.version}`)})')"
  echo "==> npm publish ${tarball} (${name_version})"
  # Skip if already on the registry (re-runs / partial publishes).
  if npm view "${name_version}" version >/dev/null 2>&1; then
    echo "Already published ${name_version} — skipping"
    continue
  fi
  npm publish "${tarball}" --access public --tag "${TAG}"
done

echo "==> Done"
