export type ToolResult = {
  title: string;
  body: string;
  bullets?: string[];
};

export const localToolHandlers = {
  draft_transaction_followup(args: { audience: string; dealStage: string; missingItems: string[]; tone: string }): ToolResult {
    const itemLine = args.missingItems.length
      ? `We are still waiting on: ${args.missingItems.join(", ")}.`
      : "There are no outstanding items at the moment.";

    return {
      title: `Follow-up for ${args.audience}`,
      body: [
        `Subject: Quick update on your transaction`,
        ``,
        `Hi there,`,
        ``,
        `I wanted to share a quick update. Your deal is currently at the \"${args.dealStage}\" stage. ${itemLine}`,
        ``,
        `Our goal is to keep everything moving with as little friction as possible. Once the outstanding items are in, I will update the next step right away.`,
        ``,
        `Please reply here if you want help gathering any of the remaining items.`,
        ``,
        `Best,`,
        `AIRE Concierge`
      ].join("\n")
    };
  },
  create_document_chase_plan(args: { audience: string; missingItems: string[]; deadline: string }): ToolResult {
    return {
      title: `Document chase plan for ${args.audience}`,
      body: `Use a 3-touch sequence before the ${args.deadline} target. Start with a same-day email, follow with a next-day text message, and finish with a concise deadline reminder if anything is still missing.`,
      bullets: args.missingItems.map((item, index) => `Touch ${Math.min(index + 1, 3)}: request ${item} with a simple reason and expected due date.`)
    };
  }
};
