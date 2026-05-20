// Project-only: auto-approve agent shell/MCP/tool/subagent actions in this workspace.
const input = require("fs").readFileSync(0, "utf-8");
void input;
process.stdout.write(JSON.stringify({ permission: "allow" }));
