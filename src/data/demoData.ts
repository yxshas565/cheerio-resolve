import { Investigation, FixRecipe, ResolutionInsight, ActivityEvent } from '../types';

export const INITIAL_INVESTIGATIONS: Investigation[] = [
  {
    id: 'INV-4092',
    title: 'Campaign readiness check blocked by variable mapping',
    category: 'Campaign readiness',
    campaignName: 'Spring Welcome Campaign',
    templateName: 'Welcome_Offer_v2',
    status: 'Action required',
    owner: 'Alex Rivera (Marketing)',
    lastUpdated: '10 mins ago',
    humanSupportInvolved: false,
    userGoal: 'Prepare the Spring Welcome Campaign for review and schedule deployment',
    initialEvidence: [
      {
        id: 'ev-1',
        label: 'Template status',
        value: 'Approved',
        type: 'fact',
        description: 'Meta WhatsApp template review returned Approved status on Oct 14.',
        timestamp: '10:15 AM'
      },
      {
        id: 'ev-2',
        label: 'Required variable',
        value: '{{1}}',
        type: 'fact',
        description: 'Template body requires one dynamic personalization variable in greetings header.',
        timestamp: '10:15 AM'
      },
      {
        id: 'ev-3',
        label: 'Current mapping',
        value: 'Not configured',
        type: 'fact',
        description: 'No contact property is assigned to variable {{1}} in the campaign settings.',
        timestamp: '10:16 AM'
      },
      {
        id: 'ev-4',
        label: 'Campaign readiness',
        value: 'Action required',
        type: 'fact',
        description: 'Validation pre-flight checks flagged 1 critical blocker before campaign can be queued.',
        timestamp: '10:16 AM'
      }
    ],
    diagnosticChecks: [
      {
        id: 'chk-1',
        name: 'Checking template status',
        status: 'pending',
        message: 'Verifies WhatsApp Business template registration status.'
      },
      {
        id: 'chk-2',
        name: 'Checking variable configuration',
        status: 'pending',
        message: 'Validates contact attribute mapping for all template parameters.'
      },
      {
        id: 'chk-3',
        name: 'Checking campaign readiness',
        status: 'pending',
        message: 'Executes comprehensive pre-flight campaign rule engine.'
      }
    ],
    currentVariableMapping: 'none',
    targetVariableMapping: 'first_name'
  },
  {
    id: 'INV-3881',
    title: 'WhatsApp template status pending approval',
    category: 'Template status',
    campaignName: 'Diwali Flash Promo',
    templateName: 'Diwali_Offer_2026',
    status: 'Investigating',
    owner: 'Priya Sharma (Growth)',
    lastUpdated: '25 mins ago',
    humanSupportInvolved: false,
    isEdgeCase: 'pending_template',
    userGoal: 'Launch Diwali promotional broadcast to loyalty segment',
    initialEvidence: [
      {
        id: 'ev-pt-1',
        label: 'Template status',
        value: 'Pending Review',
        type: 'fact',
        description: 'Submitted to Meta WhatsApp Business API 2.5 hours ago.',
        timestamp: '08:45 AM'
      },
      {
        id: 'ev-pt-2',
        label: 'Rejection reason',
        value: 'None recorded',
        type: 'fact',
        description: 'No error or rejection payload returned by provider.',
        timestamp: '08:45 AM'
      },
      {
        id: 'ev-pt-3',
        label: 'External review SLA',
        value: 'Unconfirmed / Up to 24h',
        type: 'unknown',
        description: 'External provider approval times vary dynamically based on queue and regional review velocity.',
        timestamp: '08:46 AM'
      }
    ],
    diagnosticChecks: [
      {
        id: 'chk-pt-1',
        name: 'Checking provider sync status',
        status: 'passed',
        message: 'Synced with WhatsApp Cloud API webhook listener.'
      },
      {
        id: 'chk-pt-2',
        name: 'Evaluating template rejection codes',
        status: 'passed',
        message: 'No violation or rejection codes present.'
      },
      {
        id: 'chk-pt-3',
        name: 'Determining review resolution',
        status: 'warning',
        message: 'Awaiting asynchronous external decision. Action cannot be forced.'
      }
    ]
  },
  {
    id: 'INV-3914',
    title: 'Campaign delivery failed with contradictory provider error',
    category: 'Provider delivery',
    campaignName: 'VIP Customer Re-engagement',
    templateName: 'Vip_Invite_Direct',
    status: 'Unable to verify',
    owner: 'Marcus Vance (Customer Ops)',
    lastUpdated: '1 hour ago',
    humanSupportInvolved: false,
    isEdgeCase: 'insufficient_evidence',
    userGoal: 'Send targeted exclusive survey to tier 1 VIP cohort',
    initialEvidence: [
      {
        id: 'ev-ie-1',
        label: 'Dispatch result',
        value: 'Failed (Batch #48)',
        type: 'fact',
        description: 'Campaign attempted dispatch to 450 contacts; provider rejected the batch.',
        timestamp: '07:20 AM'
      },
      {
        id: 'ev-ie-2',
        label: 'Provider error payload',
        value: 'Contradictory / Truncated',
        type: 'unknown',
        description: 'Upstream gateway returned HTTP 502 with mismatched nested error_subcode.',
        timestamp: '07:21 AM'
      },
      {
        id: 'ev-ie-3',
        label: 'Contact attribute integrity',
        value: 'Verified valid',
        type: 'fact',
        description: 'Phone numbers conform to E.164 and all recipient opt-ins are active.',
        timestamp: '07:22 AM'
      }
    ],
    diagnosticChecks: [
      {
        id: 'chk-ie-1',
        name: 'Parsing upstream error log',
        status: 'failed',
        message: 'Provider error schema corrupt or truncated by gateway timeout.'
      },
      {
        id: 'chk-ie-2',
        name: 'Verifying recipient eligibility',
        status: 'passed',
        message: 'All 450 contacts have valid consent and phone formatting.'
      },
      {
        id: 'chk-ie-3',
        name: 'Attempting deterministic classification',
        status: 'warning',
        message: 'Insufficient telemetry to differentiate gateway throttling from credential lapse.'
      }
    ]
  },
  {
    id: 'INV-3740',
    title: 'Customer phone number international prefix missing',
    category: 'Contact mapping',
    campaignName: 'Regional Store Opening Invite',
    templateName: 'Store_Opening_Geo',
    status: 'Resolved and verified',
    owner: 'Elena Rostova (Store Marketing)',
    lastUpdated: 'Yesterday',
    humanSupportInvolved: false,
    userGoal: 'Deliver opening invitations to regional retail opt-ins',
    initialEvidence: [
      {
        id: 'ev-cr-1',
        label: 'Contact count',
        value: '1,200',
        type: 'fact'
      },
      {
        id: 'ev-cr-2',
        label: 'Default country code',
        value: 'Auto-detected +91',
        type: 'fact'
      }
    ],
    diagnosticChecks: [
      {
        id: 'chk-cr-1',
        name: 'Parsing contact list format',
        status: 'passed',
        message: 'Cleaned numbers and appended standardized country prefix.'
      }
    ],
    resolutionPassport: {
      caseId: 'INV-3740',
      problemSummary: '142 numbers missing country dialing code +91.',
      initialCampaignStatus: 'Action required',
      evidenceInspected: ['Contact list export CSV', 'Country code default setting'],
      diagnosis: 'CSV import omitted leading dial codes for local formats.',
      recommendedAction: 'Apply automatic E.164 formatting rule with default country +91.',
      userCorrection: 'Enabled auto-prefix formatting filter.',
      verificationChecks: [
        {
          check: 'E.164 syntax compliance check',
          result: '1,200 / 1,200 valid numbers',
          passed: true
        }
      ],
      finalOutcome: 'Configuration verified. All contacts ready for dispatch.',
      status: 'Resolved and verified',
      timestamp: '2026-10-14 16:30',
      verifiedAt: '2026-10-14 16:32',
      disclaimer: 'The verification covers simulated configuration checks. Message delivery has not been tested.'
    }
  }
];

export const INITIAL_RECIPES: FixRecipe[] = [
  {
    id: 'REC-101',
    name: 'Map required template variables',
    category: 'Campaign configuration',
    status: 'Approved for demo use',
    description: 'Checks required template variables, identifies missing mappings, guides the user through the correction, and validates the result.',
    problemConditions: [
      'Template status is Approved in Meta WhatsApp Business manager',
      'One or more placeholder tokens (e.g. {{1}}, {{2}}) lack field bindings',
      'Campaign pre-flight validation throws variable_mapping_missing blocker'
    ],
    requiredEvidence: [
      'Meta Approved template schema JSON',
      'Campaign draft configuration payload',
      'Audience schema field dictionary'
    ],
    recommendedProcedure: [
      'Inspect template body tokens to identify required parameter indices',
      'Retrieve contact attribute list and find compatible semantic matches',
      'Prompt user to select matching contact attribute in guided picker',
      'Simulate message body preview with sample contact data',
      'Re-execute campaign readiness verification checks'
    ],
    expectedVerificationResult: 'All template parameters mapped to valid contact attributes; campaign status advances to Ready for review.',
    knownLimitations: [
      'Does not verify customer opt-in validity',
      'Does not guarantee WhatsApp delivery or handset reception',
      'Assumes contact data is non-null for selected attribute'
    ],
    lastReviewed: 'Oct 14, 2026 by Systems Lead',
    successRateDemo: '98.4%',
    timesAppliedDemo: 42
  },
  {
    id: 'REC-102',
    name: 'Investigate a pending template',
    category: 'Template status',
    status: 'Under review',
    description: 'Helps users understand the available status and identify the appropriate next step without inventing approval timelines.',
    problemConditions: [
      'WhatsApp template status shows Pending in provider webhook',
      'No explicit error or rejection reason provided by Meta',
      'User is blocked from scheduling broadcast'
    ],
    requiredEvidence: [
      'Provider template submission receipt timestamp',
      'Current Meta review webhook payload',
      'Template category classification (Marketing / Utility / Auth)'
    ],
    recommendedProcedure: [
      'Confirm submission receipt and lack of rejection flags',
      'Distinguish observed facts from unknown external review SLAs',
      'Advise against premature duplicate submissions which reset review queues',
      'Offer automated status watch alert or escalation if past expected threshold'
    ],
    expectedVerificationResult: 'User acknowledges pending state without duplicate submissions; notification watch created.',
    knownLimitations: [
      'Cannot expedite external Meta review queue',
      'Cannot predict exact approval completion minute',
      'Requires human support escalation for expedited enterprise appeals'
    ],
    lastReviewed: 'Oct 12, 2026 by QA Lead',
    successRateDemo: '91.2%',
    timesAppliedDemo: 19
  },
  {
    id: 'REC-103',
    name: 'Diagnose a campaign with missing provider evidence',
    category: 'Campaign troubleshooting',
    status: 'Needs review',
    description: 'Identifies missing diagnostic information and prepares an escalation when the available evidence is insufficient.',
    problemConditions: [
      'Campaign dispatch failure with incomplete or corrupted upstream error payload',
      'Discrepancy between local pre-flight checks and gateway rejection code',
      'Ambiguity cannot be resolved deterministically without inspecting raw provider logs'
    ],
    requiredEvidence: [
      'Raw gateway HTTP status code and response header dump',
      'Batch trace identifier',
      'Recipient eligibility checklist'
    ],
    recommendedProcedure: [
      'Surface explicit statement acknowledging inability to confirm root cause',
      'Catalog observed facts vs missing provider telemetry',
      'Assemble structured diagnostic handoff packet',
      'Escalate to Level 2 technical support with pre-filled context'
    ],
    expectedVerificationResult: 'Seamless human escalation created with zero repeated question burden for customer.',
    knownLimitations: [
      'Cannot automatically resolve upstream network outages',
      'Requires tier 2 engineer access to cloud gateway trace logs'
    ],
    lastReviewed: 'Oct 10, 2026 by Product Ops',
    successRateDemo: '87.5%',
    timesAppliedDemo: 14
  }
];

export const INITIAL_INSIGHTS: ResolutionInsight[] = [
  {
    id: 'INS-01',
    pattern: 'Repeated field mapping problems',
    category: 'Campaign configuration UX',
    status: 'Active',
    observation: 'Several simulated cases encountered missing contact attribute mappings during campaign authoring.',
    evidenceAvailable: '68% of campaign setup drop-offs in demo telemetry coincide with unmapped {{1}} tokens.',
    possibleInterpretation: 'Nontechnical users frequently assume approved templates auto-bind to contact fields without manual selection in Step 3.',
    suggestedNextStep: 'Review the campaign creation flow and consider inline smart auto-mapping suggestions with required confirmation.',
    confidenceLevel: 'High',
    impactArea: 'Campaign Setup Funnel',
    sampleCases: ['INV-4092', 'INV-4011', 'INV-3982']
  },
  {
    id: 'INS-02',
    pattern: 'Troubleshooting recipe repeatedly fails',
    category: 'Recipe efficacy',
    status: 'Active',
    observation: 'A simulated procedure for multi-language template variable pairing is not consistently producing the expected verification result.',
    evidenceAvailable: 'REC-088 verification check failed in 3 out of 7 simulated trials due to localized token mismatch (e.g. {{nombre}} vs {{1}}).',
    possibleInterpretation: 'The recipe does not adequately account for multi-locale template parameter normalization across Spanish and English variations.',
    suggestedNextStep: 'Flag procedure for immediate review, pause automated recommendation, and add locale-specific token extraction steps.',
    confidenceLevel: 'Medium',
    impactArea: 'Fix Memory Reliability',
    sampleCases: ['INV-3844', 'INV-3870']
  },
  {
    id: 'INS-03',
    pattern: 'Cases repeatedly escalate due to missing diagnostic data',
    category: 'Provider telemetry & observability',
    status: 'Active',
    observation: 'The simulated support team lacks sufficient evidence to confidently diagnose a recurring upstream gateway failure pattern.',
    evidenceAvailable: '4 escalated cases in the last 48 hours featured truncated HTTP 502 error payloads with missing gateway subcodes.',
    possibleInterpretation: 'Upstream gateway timeout strips diagnostic body details before reaching the Cheerio logging layer.',
    suggestedNextStep: 'Investigate whether product instrumentation or upstream gateway diagnostic headers need retention enhancements.',
    confidenceLevel: 'Cautious',
    impactArea: 'Diagnostic Observability',
    sampleCases: ['INV-3914', 'INV-3902', 'INV-3899']
  }
];

export const INITIAL_ACTIVITY_LOG: ActivityEvent[] = [
  {
    id: 'ACT-901',
    timestamp: 'Today at 08:02 AM',
    eventType: 'Investigation created',
    caseOrRecipeId: 'INV-4092',
    description: 'System flagged campaign readiness blocker for "Spring Welcome Campaign".',
    outcome: 'Warning'
  },
  {
    id: 'ACT-900',
    timestamp: 'Today at 07:45 AM',
    eventType: 'Investigation created',
    caseOrRecipeId: 'INV-3914',
    description: 'VIP Customer Re-engagement campaign dispatch reported batch failure.',
    outcome: 'Escalated'
  },
  {
    id: 'ACT-899',
    timestamp: 'Yesterday at 04:32 PM',
    eventType: 'Verification completed',
    caseOrRecipeId: 'INV-3740',
    description: 'E.164 international country code prefix validation passed for 1,200 contacts.',
    outcome: 'Success'
  },
  {
    id: 'ACT-898',
    timestamp: 'Yesterday at 04:30 PM',
    eventType: 'Resolution Passport generated',
    caseOrRecipeId: 'INV-3740',
    description: 'Immutable resolution passport issued with verified pre-flight status.',
    outcome: 'Success'
  },
  {
    id: 'ACT-897',
    timestamp: 'Oct 14 at 11:20 AM',
    eventType: 'Recipe reviewed',
    caseOrRecipeId: 'REC-101',
    description: 'Recipe "Map required template variables" approved for demo use following QA validation.',
    outcome: 'Info'
  }
];
