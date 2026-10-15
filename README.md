# Cheerio Resolve

### From a support question to a verified outcome.

**An evidence-first support resolution experience for nontechnical users.**

[**Open the live prototype**](https://cheerio-resolve.vercel.app/) · [View the GitHub repository](https://github.com/yxshas565/cheerio-resolve)

Cheerio Resolve is a proposed support experience designed to help nontechnical business users investigate configuration problems, follow guided corrections, verify outcomes, and preserve troubleshooting knowledge for future cases.

> **Product principle:** An AI-generated answer is not proof that a problem has been solved.

Rather than building another generic support chatbot, Resolve connects diagnosis, guided action, verification, contextual human escalation, and reusable troubleshooting knowledge in one workflow.

> **Prototype notice:** This is an interactive concept prototype using simulated data. It does not connect to Cheerio's live systems, send messages, or create real support tickets.

---

## Explore the live prototype

**[cheerio-resolve.vercel.app](https://cheerio-resolve.vercel.app/)**

The prototype demonstrates an investigation journey, an interactive orchestration view, guided troubleshooting, a Resolution Passport, reusable fix procedures, resolution insights, contextual assistance, and human escalation.

### The primary scenario

The main walkthrough uses a simulated WhatsApp campaign called **Spring Welcome Campaign**. A required template variable, `{{1}}`, has not been mapped to the appropriate contact attribute.

The user can:

1. Open the investigation and run diagnostic checks.
2. Inspect the evidence supporting the diagnosis.
3. Map `{{1}}` to the **First name** contact attribute.
4. Validate and apply the correction in demo mode.
5. Run simulated verification checks.
6. Open the Resolution Passport and inspect the recorded outcome.

Passing these checks confirms only the simulated configuration conditions. It does not mean a real campaign was sent or that messages were delivered.

### Try the edge cases

- **Pending template:** Resolve explains the available status without inventing approval timelines or recommending an unsupported resubmission.
- **Insufficient evidence:** Resolve acknowledges that the cause cannot be confirmed and prepares a contextual handoff.
- **Human escalation:** The user can review the investigation summary and confirm a simulated handoff without having to restate the whole issue.

---

## What the product proposes

### 1. Evidence-first diagnosis

Inspect available diagnostic information before recommending a correction. Separate observed facts from recommendations and explicitly identify missing information.

### 2. Guided resolution

Recommend one relevant next step, explain why it matters, and guide the user through a simulated correction.

### 3. Resolution Passport

Create a structured record of the problem, evidence inspected, diagnosis, recommended action, user action, verification checks, and final outcome.

### 4. Verified Fix Memory

Suggest reusable troubleshooting procedures when suitable patterns emerge. A human specialist must review and approve a procedure before it becomes approved for reuse; a successful demo case does not automatically make a procedure trusted.

### 5. Resolution Intelligence

Surface recurring support patterns that may warrant better guidance, improved diagnostic visibility, or product investigation. A repeated pattern is a signal to investigate, not proof of a product defect.

These are proposed capabilities, not claims that Cheerio lacks equivalent internal functionality.

---

## How the experience works

The proposed resolution path is:

**Understand → Inspect → Guide → Correct → Verify → Preserve**

The orchestration visualisation represents the connected responsibilities in the flow:

1. User Context
2. Evidence Inspector
3. Rule Engine
4. AI Assist
5. Guided Fix
6. Verification
7. Resolution Passport
8. Verified Fix Memory Loop
9. Contextual Human Handoff

Deterministic checks handle known conditions. AI assistance can help interpret a user's description or explain findings when useful, but it should not invent evidence or independently authorize consequential actions. When the available evidence is insufficient, the system should say so and escalate with context.

---

## Interface highlights

- **Interactive orchestration:** Inspect pipeline nodes and their responsibilities.
- **Guided investigation:** Move through diagnosis, correction, and verification.
- **Resolution Passport:** Review and copy a structured case summary.
- **Resolve assistant:** Explore the active simulated case using contextual suggestions.
- **Fix Memory:** Inspect reusable procedures and their human-review states.
- **Resolution Intelligence:** Review simulated support patterns and mark insights for investigation.
- **Human escalation:** Prepare a contextual handoff when automated troubleshooting is insufficient.
- **Activity Log:** Review recorded application interactions.
- **Light and dark themes:** Switch themes across the application.

---

## Technology stack

| Area | Technology |
|---|---|
| Frontend | React 19 |
| Language | TypeScript |
| Development server and bundler | Vite |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Motion and interaction | Framer Motion and CSS transitions |
| State management | React Context |
| Demo persistence | Browser `localStorage` |
| Deployment | Vercel |

The prototype uses local application state and simulated records. It does not require a production backend or an external AI API.

---

## Run locally

### Prerequisites

Install Node.js and npm.

### Installation

```bash
git clone https://github.com/yxshas565/cheerio-resolve.git
cd cheerio-resolve
npm install
npm run dev
```

Open the local URL printed by Vite. The default address is `http://localhost:5173`.

### Production build

```bash
npm run build
```

This runs the configured TypeScript build checks and creates the production bundle in `dist/`.

To preview the production build locally:

```bash
npm run preview
```

### Available scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Run TypeScript project checks and build the app |
| `npm run lint` | Run Oxlint |
| `npm run preview` | Preview the production build |

---

## Project structure

```text
cheerio-resolve/
├── public/                   # Static assets
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── EdgeCaseInvestigation.tsx
│   │   ├── EscalationModal.tsx
│   │   ├── EvidencePanel.tsx
│   │   ├── OrchestrationVisualizer.tsx
│   │   ├── PrimaryInvestigationFlow.tsx
│   │   ├── ResolutionPassportView.tsx
│   │   ├── ResolveAssistantDrawer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatusBadge.tsx
│   │   └── Topbar.tsx
│   ├── context/
│   │   └── AppContext.tsx
│   ├── data/
│   │   └── demoData.ts
│   ├── pages/
│   │   ├── ActivityPage.tsx
│   │   ├── FixMemoryPage.tsx
│   │   ├── InvestigationsPage.tsx
│   │   ├── OverviewPage.tsx
│   │   └── ResolutionIntelligencePage.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── package-lock.json
└── vite.config.ts
```

---

## Scope and limitations

Cheerio Resolve is a product concept and interactive frontend prototype, not a production support system. The current implementation does not include:

- A live Cheerio account connection or real provider diagnostics.
- Actual WhatsApp message sending or campaign execution.
- A production support-ticket integration.
- A production knowledge approval or learning pipeline.

The demonstration uses deterministic simulated data to communicate the proposed experience. Production feasibility would depend on available diagnostic signals, account permissions, security requirements, and validation against real support cases.

A sensible next step would be to examine real support categories and handling times, confirm which diagnostic signals are available with appropriate permissions, and test a limited pilot against existing support approaches.

---

## Project links

- **Live prototype:** [https://cheerio-resolve.vercel.app/](https://cheerio-resolve.vercel.app/)
- **GitHub repository:** [https://github.com/yxshas565/cheerio-resolve](https://github.com/yxshas565/cheerio-resolve)
- **Supporting assignment materials:** To be linked once the submission folder is finalized.

---

*Cheerio Resolve · Product Intern Assignment A · 15 October 2026*
