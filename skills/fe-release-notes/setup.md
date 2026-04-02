## Agent

Symlink `skills` folder to your agent config dir.

In case of Cursor it would be
```shell
ln -s  ../skills/ .cursor/skills
```

## YouTrack auth

Provide youtrack token (YT_TOKEN) in .env, get it on your profile page at "Account security" tab.

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
