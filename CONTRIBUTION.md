## Contribution Guide

How to contribute to FormEngine.

### Licenses

FormEngine uses two package licenses:

- **MIT** — community packages listed in [LICENSE.md](LICENSE.md) (including FormEngine Core)
- **FormEngine EULA** — Designer, commercial add-ons, and other non-MIT packages ([EULA.md](EULA.md), [https://formengine.io/eula/](https://formengine.io/eula/))

Production commercial use of EULA packages requires a commercial license from Optimajet. See the [EULA](https://formengine.io/eula/).

By contributing, you agree to the [Contributor License Agreement](CLA.md).

### Contributor License Agreement (required)

**All external contributors must sign the CLA before a pull request can merge.** CI fails on unsigned pull requests.
The [CLA](CLA.md) is an individual agreement. Commenting the sign phrase binds you, not your employer.

1. Open your pull request (usually from a fork).
2. Read [CLA.md](CLA.md).
3. Comment on the pull request **exactly**:

   ```
   I have read the CLA Document and I hereby sign the CLA
   ```

4. Wait for the CLA workflow to commit your signature to `cla.json` on the **pull request branch**.
5. **Re-run** failed checks (or push another commit). Until the CLA step passes, later CI jobs that depend on it do not run.

If you already signed on a previous **merged** pull request, and your branch includes the updated `cla.json` from the base branch, you do not need to sign again.

Maintainers who are members of the `optimajet` GitHub organization (or repository owners / collaborators) are exempt from signing.

### Contributing as an employee

If you contribute as an employee (including for a company with a commercial FormEngine license):

- Follow the same technical workflow as other contributors.
- Sign the [CLA](CLA.md) as an individual. The pull request comment does not bind your company.
- Get your employer's authorization (or a waiver of their rights in the contribution) before you sign.
- If the company itself must be the licensor, contact [hello@optimajet.com](mailto:hello@optimajet.com). Do not use the
  GitHub sign phrase as a corporate signature.
- Call out licensing or distribution impact in your pull request when the change touches packaging, license
  enforcement, or customer-facing distribution.

### How to contribute

For larger changes, open a GitHub issue first (Bug report, Feature request, or Question templates). Say what problem
you are solving, which package you are changing, and whether the API or behavior changes.

Fork the repository and create a feature branch from the main development branch.

Match the existing codebase: TypeScript, React, and the conventions in `AGENTS.md` and `documentation/AGENTS.md`. Before you open a pull request, run `npm run check-all`.

Add or update tests in `tests/` where it makes sense. User-facing changes should include documentation in `documentation/docs`.

Open a pull request and fill in [.github/pull_request_template.md](.github/pull_request_template.md): summary, packages
affected, checklist, and breaking changes or migration steps.

If your change includes third-party code, or work that is not entirely your original creation, disclose licenses and
other restrictions in the pull request as required by [CLA.md](CLA.md) sections 5 and 6.

### What we look at in review

We check whether the change works, performs reasonably, and fits existing APIs. Tests and documentation should be there when they matter, and the code should match how the rest of the project is built. Pull requests also get CLA compliance checks.

We may merge as-is, ask for changes, or turn down work that does not fit the product roadmap or licensing model. Maintainers sometimes make follow-up changes after merge to keep things consistent.
