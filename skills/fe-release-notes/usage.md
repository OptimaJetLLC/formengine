Copy-paste prompt:

```markdown
@skills/fe-release-notes/SKILL.md Use this skill. Release ticket: `<release-ticket-url>`
```

```shell
cursor-agent --approve-mcps '@./skills/fe-release-notes/SKILL.md Use this skill. Release ticket: FE-1892'
```

This skill covers **release notes + version bump + generators + docs build** only. CI artifact publishing and deploy are separate — see `scripts/release/README.md` (fb) and [formengine-tools](https://github.com/OptimaJetLLC/formengine-tools).

After modifying this skill, validate with https://github.com/agentskills/agentskills/tree/main/skills-ref
