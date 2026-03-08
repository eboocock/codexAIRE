export type IntakeInput = {
  role: string;
  fullName: string;
  email: string;
  address: string;
  timeline: string;
  goals: string;
  painPoints: string;
  state: string;
};

export type ReadinessReport = {
  readinessScore: number;
  summary: string;
  nextSteps: string[];
  missingItems: string[];
  humanEscalations: string[];
};

export type IntakeResponse = {
  report: ReadinessReport;
};

export type DealRecord = {
  id: string;
  userId: string;
  name: string;
  stage: string;
  address: string;
};

export type SubscriptionRecord = {
  customerEmail: string;
  status: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  plan: string;
};
