## Agent

Symlink `skills` folder to your agent config dir.

In case of Cursor it would be
```shell
ln -s  ../skills/ .cursor/skills
```

## YouTrack auth

Provide YouTrack token (`YT_TOKEN`) in **`skills/fe-release-notes/scripts/.env`** (copy from `scripts/.env.example`). Get the token on your profile page under the **Account security** tab.

## Chrome devtools MCP

Add that MCP config for agent.

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest",
        "--",
        "--executablePath=/usr/bin/google-chrome-beta"
      ]
    }
  }
}
```

### Cursor
Cursor reads MCP servers from:
.cursor/mcp.json (workspace), and
~/.cursor/mcp.json (global)

also enable mcp:
`cursor-agent mcp enable chrome-devtools`
`cursor-agent mcp login chrome-devtools`
