import readline from "readline";

const tools = {
  draft_transaction_followup(args) {
    const itemLine = Array.isArray(args.missingItems) && args.missingItems.length
      ? `We are still waiting on: ${args.missingItems.join(", ")}.`
      : "There are no outstanding items at the moment.";
    return {
      title: `Follow-up for ${args.audience}`,
      body: [
        `Subject: Quick update on your transaction`,
        ``,
        `Hi there,`,
        ``,
        `Your deal is currently at the \"${args.dealStage}\" stage. ${itemLine}`,
        ``,
        `Please send the remaining items when you can, and reply if you would like help with the next step.`,
        ``,
        `Best,`,
        `AIRE Concierge`
      ].join("\n")
    };
  },
  create_document_chase_plan(args) {
    return {
      title: `Document chase plan for ${args.audience}`,
      body: `Use a 3-touch sequence before ${args.deadline}. Start with email, follow with text, and end with a final deadline reminder.`,
      bullets: (args.missingItems || []).map((item, index) => `Touch ${Math.min(index + 1, 3)}: request ${item} with a specific due date.`)
    };
  }
};

function respond(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

const rl = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
rl.on("line", (line) => {
  if (!line.trim()) return;
  const request = JSON.parse(line);

  if (request.method === "initialize") {
    return respond({
      jsonrpc: "2.0",
      id: request.id,
      result: {
        protocolVersion: "2025-03-26",
        serverInfo: { name: "codexAIRE-local-mcp", version: "0.3.0" },
        capabilities: { tools: {} }
      }
    });
  }

  if (request.method === "tools/call") {
    const name = request.params?.name;
    const args = request.params?.arguments || {};
    const handler = tools[name];
    if (!handler) {
      return respond({ jsonrpc: "2.0", id: request.id, error: { code: -32601, message: `Unknown tool: ${name}` } });
    }
    const result = handler(args);
    return respond({
      jsonrpc: "2.0",
      id: request.id,
      result: {
        content: [{ type: "text", text: JSON.stringify(result) }]
      }
    });
  }

  if (request.method === "tools/list") {
    return respond({
      jsonrpc: "2.0",
      id: request.id,
      result: {
        tools: [
          { name: "draft_transaction_followup", description: "Drafts a status follow-up message." },
          { name: "create_document_chase_plan", description: "Generates a document collection follow-up plan." }
        ]
      }
    });
  }

  return respond({ jsonrpc: "2.0", id: request.id, error: { code: -32601, message: "Unsupported method" } });
});
