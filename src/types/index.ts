export type InvestigationStatus =
  | 'New'
  | 'Investigating'
  | 'Action required'
  | 'Awaiting verification'
  | 'Resolved and verified'
  | 'Escalated'
  | 'Unable to verify';

export type IssueCategory =
  | 'Campaign readiness'
  | 'Template status'
  | 'Contact mapping'
  | 'Provider delivery'
  | 'Workflow automation';

export interface EvidenceItem {
  id: string;
  label: string;
  value: string;
  type: 'fact' | 'recommendation' | 'user_action' | 'verification' | 'unknown';
  description?: string;
  timestamp?: string;
}

export interface DiagnosticCheckStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'passed' | 'warning' | 'failed';
  message: string;
  details?: string;
}

export interface ResolutionPassportData {
  caseId: string;
  problemSummary: string;
  initialCampaignStatus: string;
  evidenceInspected: string[];
  diagnosis: string;
  recommendedAction: string;
  userCorrection: string;
  verificationChecks: {
    check: string;
    result: string;
    passed: boolean;
  }[];
  finalOutcome: string;
  status: InvestigationStatus;
  timestamp: string;
  verifiedAt?: string;
  disclaimer: string;
}

export interface Investigation {
  id: string;
  title: string;
  category: IssueCategory;
  campaignName: string;
  templateName?: string;
  status: InvestigationStatus;
  owner: string;
  lastUpdated: string;
  humanSupportInvolved: boolean;
  ticketId?: string;
  initialEvidence: EvidenceItem[];
  diagnosticChecks: DiagnosticCheckStep[];
  currentVariableMapping?: string;
  targetVariableMapping?: string;
  resolutionPassport?: ResolutionPassportData;
  isEdgeCase?: 'pending_template' | 'insufficient_evidence';
  escalationReason?: string;
  userGoal: string;
}

export type RecipeReviewStatus =
  | 'Approved for demo use'
  | 'Under review'
  | 'Needs review'
  | 'Flagged for review';

export interface FixRecipe {
  id: string;
  name: string;
  category: string;
  status: RecipeReviewStatus;
  description: string;
  problemConditions: string[];
  requiredEvidence: string[];
  recommendedProcedure: string[];
  expectedVerificationResult: string;
  knownLimitations: string[];
  lastReviewed: string;
  successRateDemo: string;
  timesAppliedDemo: number;
}

export interface ResolutionInsight {
  id: string;
  pattern: string;
  category: string;
  status: 'Active' | 'Under review' | 'Resolved';
  observation: string;
  evidenceAvailable: string;
  possibleInterpretation: string;
  suggestedNextStep: string;
  confidenceLevel: 'High' | 'Medium' | 'Cautious';
  impactArea: string;
  sampleCases: string[];
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  eventType:
    | 'Investigation created'
    | 'Diagnostic check completed'
    | 'Mapping changed'
    | 'Validation passed'
    | 'Configuration applied in demo'
    | 'Verification completed'
    | 'Resolution Passport generated'
    | 'Recipe reviewed'
    | 'Human handoff created'
    | 'Insight reviewed';
  caseOrRecipeId: string;
  description: string;
  outcome: 'Success' | 'Warning' | 'Info' | 'Escalated';
  metadata?: Record<string, string>;
}
