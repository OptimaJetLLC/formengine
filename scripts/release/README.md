# Release archive scripts

TypeScript CLIs for building `.archives/` and publishing them to a **draft GitHub Release** on RC branches.

Deployment (npm, SSH, GitHub mirrors, smoke tests) lives in [formengine-tools](https://github.com/OptimaJetLLC/formengine-tools).

## CI flow (RC branches)

1. GitHub Actions `ci.yml` runs checks, tests, bundle, and documentation build.
2. On `rc/*` branches, `earthly --output +prepare-rc-archives-from-pack` exports RC archives to `.archives/`; documentation is built in parallel.
3. The `publish-rc-release` job runs only on **manual** `workflow_dispatch` from an `rc/*` branch. It validates `.archives/` in Docker (`earthly +npm-publish-rc-release`), creates or updates a **draft prerelease** tagged with the version from `lerna.json`, and uploads every archive file as a release asset.

formengine-tools downloads assets from that draft release and runs deploy steps.

## Local archive build

```bash
npm run archives:build
# or after pack:
npm run archives:build:from-pack
```

## Simulate CI build and RC publish locally

```bash
# RC branch flow: pack + archives + documentation (no GitHub upload)
./scripts/simulate-ci-rc-release.sh

# Same as above, then create/update the draft GitHub Release
export GH_TOKEN="$(gh auth token)"   # or a PAT with contents: write
export GITHUB_REPOSITORY=owner/repo  # optional if gh/git remote is configured
./scripts/simulate-ci-rc-release.sh --publish

# PR-style bundle only (pack:ci, no .archives RC set)
./scripts/simulate-ci-rc-release.sh --pr

# Include optional CI jobs (checks, tests, e2e, apps-and-views)
./scripts/simulate-ci-rc-release.sh --all --publish
```

Or via npm: `npm run simulate:ci-rc-release -- --publish`

On an `rc/*` branch the script mirrors CI and enables publish by default; use `--no-publish` for build-only. Run `--dry-run` to check prerequisites without starting Earthly.

### Environment variables

| Variable              | Required     | Default                            | Used by                                                                 |
|-----------------------|--------------|------------------------------------|-------------------------------------------------------------------------|
| `GH_TOKEN`            | publish only | —                                  | `upload-release-artifacts.ts` — GitHub API token with `contents: write` |
| `GITHUB_REPOSITORY`   | publish only | inferred from `gh` or `git remote` | draft release target repo (`owner/name`)                                |
| `GITHUB_SHA`          | publish only | `git rev-parse HEAD`               | `target_commitish` for the draft release                                |
| `ARCHIVES_DIR`        | no           | `.archives`                        | archive validation and upload                                           |
| `PREPARE_RC_ARCHIVES` | no           | `1`                                | `1` = full RC archives in bundle; `0` = PR-style pack only (`--pr`)     |
| `EARTHLY_BIN`         | no           | `earthly`                          | earthly executable                                                      |
| `EARTHLY_EXTRA_ARGS`  | no           | —                                  | extra flags for every earthly call                                      |

Earthly targets also set `NODE_OPTIONS`, `CI`, and Playwright env vars internally; you normally do not need to export those locally.

## Scripts

| Script                        | Purpose                                                 |
|-------------------------------|---------------------------------------------------------|
| `prepare-npm-archives.ts`     | Pack workspace packages into `react-form-builder-*.tgz` |
| `validate-archives.ts`        | Verify `.archives/` matches `REQUIRED_ARCHIVE_FILES`    |
| `upload-release-artifacts.ts` | Create or update draft GitHub Release and upload assets |

## Archive contract

Keep `REQUIRED_ARCHIVE_FILES` in `constants.ts` aligned with formengine-tools `scripts/release/constants.ts`.
