# Cheerio Resolve: Evidence to Resolution Prototype (Phase 2 Upgrade)

An interactive, high-fidelity B2B SaaS prototype for the **Cheerio AI Product Intern take-home assignment**.

Cheerio Resolve demonstrates how nontechnical business users move from a support issue to an evidence-backed, verified outcome, turning reviewed procedures into reusable troubleshooting knowledge without speculative hallucinations.


## 🚀 Live Demo

**Explore Cheerio Resolve:** [Open the Interactive Prototype](https://cheerio-resolve.vercel.app/)

The deployed prototype demonstrates evidence-first troubleshooting, guided resolution, verification, the Resolution Passport, reusable troubleshooting knowledge, and contextual human escalation.

**Note:** This is a simulated demonstration environment. It does not connect to Cheerio's live systems.


---

## 1. What's New in Phase 2: Visual Intelligence & Interaction Upgrade

1. **Signature Orchestration Engine Visualizer ([OrchestrationVisualizer.tsx](file:///c:/Users/Yashas/Cheerio%20AI/Design%20Prototype/src/components/OrchestrationVisualizer.tsx)):**
   - Live interactive visual architecture coordinating **User Context**, **Evidence Inspector**, **Rule Engine**, **AI Assist**, **Guided Fix**, **Verification**, and **Resolution Passport**.
   - Dual loop branches for **Fix Memory Curation** and **Contextual Human Handoff Path**.
   - Dynamic SVG connective paths reflecting real case state (`Idle` -> `Active` -> `Completed` / `Escalated`).
   - Clickable nodes with interactive inspection drawer surfacing telemetry inputs, outputs, and safe boundary rules.

2. **6-Stage Interactive Resolution Journey Timeline ([PrimaryInvestigationFlow.tsx](file:///c:/Users/Yashas/Cheerio%20AI/Design%20Prototype/src/components/PrimaryInvestigationFlow.tsx)):**
   - Connected visual timeline: **1. Understand (Goal)** → **2. Inspect (Telemetry)** → **3. Guide (Rule)** → **4. Correct (Mapping)** → **5. Verify (Gatekeeper)** → **6. Preserve (Passport)**.
   - Smooth state transitions from initial blocker diagnosis to interactive parameter configuration and post-fix automated verification.

3. **Floating Contextual Resolve Intelligence Assistant ([ResolveAssistantDrawer.tsx](file:///c:/Users/Yashas/Cheerio%20AI/Design%20Prototype/src/components/ResolveAssistantDrawer.tsx)):**
   - Floating launcher in the bottom right corner with original node-and-spark branding.
   - Responsive slide-over drawer connected directly to the active simulated case.
   - 6 quick suggested prompts (*"Explain this diagnosis"*, *"What evidence supports this?"*, *"What should I do next?"*, *"Why can't this be verified?"*, *"When should a human step in?"*, *"Show me the Resolution Passport"*).
   - Deterministic contextual query parser and direct quick-action links.

4. **Complete Light & Dark Mode System:**
   - Persistent theme toggle in the top header.
   - Deep, comfortable dark background surfaces (`#0b0f19`), accessible text contrast, recolored SVG diagram paths, and synchronized cards, modals, and tables.
   - Automatically saves and restores user preference via `localStorage` with OS media query fallback.

5. **Enhanced Resolution Passport ([ResolutionPassportView.tsx](file:///c:/Users/Yashas/Cheerio%20AI/Design%20Prototype/src/components/ResolutionPassportView.tsx)):**
   - Cryptographic hash reference (`SHA256-8F02`), background seal watermark, 100% verification coverage indicator, and full clipboard summary export.

6. **5-Stage Knowledge Learning Loop ([FixMemoryPage.tsx](file:///c:/Users/Yashas/Cheerio%20AI/Design%20Prototype/src/pages/FixMemoryPage.tsx)):**
   - Clear visual progression: *Verified Case* → *Candidate Recipe* → *Human Review* → *Approved Recipe* → *Future Case Match*.

---

## 2. Technology Stack

- **Framework:** React 19 + TypeScript (Strict mode)
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4 with dark mode support (`@import "tailwindcss"; .dark`)
- **Icons:** Lucide React
- **Motion & Micro-interactions:** Canvas Confetti, SVG flow dash animations, CSS micro-interactions
- **State Management:** Centralized React Context with persistent `localStorage` synchronization and 1-click **Reset Demo State**

---

## 3. Running the Application Locally

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Start the local development server
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173
```

### Production Build
```bash
npm run build
```
*(Produces an optimized static bundle in `/dist` in under 600ms).*

---

## 4. Key Demonstration Flows

1. **Test the Orchestration Visualizer:**
   - On the **Overview** page, observe the signature orchestration diagram.
   - Click on nodes (e.g., *Evidence Inspector*, *AI Assist*, *Verification*, *Human Escalation*) to inspect telemetry inputs and boundaries in the detail panel below.
   - Click **"Step through Primary Flow"** or click the *User Context* node to jump directly into the guided troubleshooting workflow.

2. **Walkthrough Primary Resolution Flow:**
   - In **INV-4092**, review the 6-stage timeline.
   - Run the diagnostic checks.
   - Click **"Review and correct mapping"**, change parameter `{{1}}` to **First name**, and validate.
   - Click **"Apply configuration in demo"** to observe sequential verification passes.
   - Return to the **Overview** page to see the Orchestration Visualizer immediately reflect the *Completed / Verified* pipeline state!

3. **Test the Contextual Assistant:**
   - Click the **"Ask Resolve"** floating button in the bottom right corner (or in the top header).
   - Click any suggested prompt or type questions like *"Explain this diagnosis"* or *"When should a human step in?"*.
   - Use the embedded quick-action links to navigate directly to case records or escalation dossiers.

4. **Toggle Light / Dark Themes:**
   - Click the Moon/Sun icon in the top header to seamlessly switch themes across all pages, modal dialogues, the orchestration canvas, and the assistant drawer.
