## Tone of Voice

The release notes should sound clear, professional, and
developer-friendly, balancing technical accuracy with readability.

### Core Principles

**1. Concise but Informative**\
Communicate changes in as few words as possible without losing meaning.
Avoid unnecessary filler or marketing language.

**2. Neutral and Objective**\
Do not exaggerate impact. Avoid hype words like "amazing,"
"revolutionary," or "game-changing." Let the changes speak for
themselves.

**3. Technical but Accessible**\
Assume the reader is a developer, but not necessarily familiar with the
internal context.\
- Use correct technical terminology\
- Briefly clarify non-obvious changes when needed

**4. Action-Oriented**\
Prioritize what users need to *know* and *do*:\
- What changed\
- Why it matters\
- What action (if any) is required

**5. Structured and Scannable**\
Use consistent formatting so readers can quickly skim: - Short bullet
points - Group by type (Features, Fixes, Breaking Changes, etc.) - Start
each item with a strong verb when possible

------------------------------------------------------------------------

### Writing Style Guidelines

**Use:** - Active voice\
- Present tense\
- Specific descriptions

**Avoid:** - Marketing language\
- Internal jargon without explanation\
- Long paragraphs\
- Vague statements ("improved performance" → specify how, if known)

------------------------------------------------------------------------

### Preferred Patterns

-   "Add support for ..."
-   "Fix issue where ..."
-   "Improve handling of ..."
-   "Deprecate ... in favor of ..."
-   "Remove ... (breaking change)"

------------------------------------------------------------------------

### Breaking Changes

Be explicit, direct, and slightly more instructive:

-   Clearly label as **Breaking Change**
-   Explain impact
-   Provide migration guidance when possible

Example tone: - "**Breaking:** Remove `X` API. Use `Y` instead." -
"**Breaking:** Rename `foo` to `bar`. Update imports accordingly."

------------------------------------------------------------------------

### Consistency Rules

-   Use the same terminology across entries\
-   Prefer deterministic phrasing (avoid synonyms for the same concept)\
-   Keep similar changes phrased similarly

------------------------------------------------------------------------

### Example

**Good:** - Add support for custom config paths\
- Fix crash when loading empty datasets\
- **Breaking:** Remove deprecated `init()` method. Use `create()`
  instead

**Bad:** - Introduced an awesome new way to configure things\
- Fixed some bugs\
- Made improvements to performance
