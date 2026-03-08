import { spawn } from "child_process";
import path from "path";
import { localToolHandlers, ToolResult } from "@/lib/mcp/tools";

async function runInlineTool(toolName: string, args: any): Promise<ToolResult> {
  const handler = (localToolHandlers as Record<string, (args: any) => ToolResult>)[toolName];
  if (!handler) throw new Error(`Unknown tool: ${toolName}`);
  return handler(args);
}

async function runStdioTool(toolName: string, args: any): Promise<ToolResult> {
  const scriptPath = path.join(process.cwd(), "scripts", "mcp-server.mjs");
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath], { stdio: ["pipe", "pipe", "pipe"] });
    let output = "";
    let error = "";

    child.stdout.on("data", (chunk) => {
      output += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      error += chunk.toString();
    });
    child.on("close", () => {
      if (error) {
        return reject(new Error(error));
      }
      try {
        const lines = output.trim().split(/\n+/).filter(Boolean);
        const last = JSON.parse(lines[lines.length - 1]);
        const content = last.result?.content?.[0]?.text;
        resolve(JSON.parse(content) as ToolResult);
      } catch (err) {
        reject(err instanceof Error ? err : new Error("Could not parse MCP response."));
      }
    });

    const init = {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "codexAIRE", version: "0.3.0" } }
    };
    const call = {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: { name: toolName, arguments: args }
    };

    child.stdin.write(`${JSON.stringify(init)}\n`);
    child.stdin.write(`${JSON.stringify(call)}\n`);
    child.stdin.end();
  });
}

export async function runMcpTool(toolName: string, args: any): Promise<ToolResult> {
  const mode = process.env.MCP_MODE || "inline";
  if (mode === "stdio") {
    return runStdioTool(toolName, args);
  }
  return runInlineTool(toolName, args);
}
