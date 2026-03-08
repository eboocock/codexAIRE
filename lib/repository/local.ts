import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { DealRecord, ReadinessReport, SubscriptionRecord } from "@/lib/types";

type FileDb = {
  reports: Array<{
    id: string;
    email: string;
    role: string;
    fullName: string;
    address: string;
    state: string;
    report: ReadinessReport;
  }>;
  deals: DealRecord[];
  subscriptions: Array<SubscriptionRecord & { updatedAt: string }>;
};

const dbPath = path.join(process.cwd(), ".local-db.json");

async function readDb(): Promise<FileDb> {
  try {
    const raw = await fs.readFile(dbPath, "utf8");
    return JSON.parse(raw) as FileDb;
  } catch {
    const starter: FileDb = {
      reports: [],
      deals: [
        {
          id: crypto.randomUUID(),
          userId: "demo-user",
          name: "123 Main St Seller Deal",
          stage: "Listing prep",
          address: "123 Main St, Everett, WA"
        }
      ],
      subscriptions: []
    };
    await fs.writeFile(dbPath, JSON.stringify(starter, null, 2));
    return starter;
  }
}

async function writeDb(db: FileDb) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

export class FileRepository {
  async saveReport(input: { email: string; role: string; fullName: string; address: string; state: string; report: ReadinessReport }) {
    const db = await readDb();
    db.reports.push({ id: crypto.randomUUID(), ...input });
    await writeDb(db);
  }

  async listDeals(userId: string) {
    const db = await readDb();
    return db.deals.filter((deal) => deal.userId === userId);
  }

  async upsertSubscription(input: SubscriptionRecord) {
    const db = await readDb();
    const existingIndex = db.subscriptions.findIndex((item) => item.customerEmail === input.customerEmail);
    const next = { ...input, updatedAt: new Date().toISOString() };
    if (existingIndex >= 0) db.subscriptions[existingIndex] = next;
    else db.subscriptions.push(next);
    await writeDb(db);
  }

  async deactivateSubscription(stripeCustomerId: string) {
    const db = await readDb();
    db.subscriptions = db.subscriptions.map((item) =>
      item.stripeCustomerId === stripeCustomerId ? { ...item, status: "canceled", updatedAt: new Date().toISOString() } : item
    );
    await writeDb(db);
  }
}
