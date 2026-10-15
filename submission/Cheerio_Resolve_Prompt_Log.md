# Cheerio Resolve | AI Prompt Log

**Assignment:** Cheerio AI Product Intern, Assignment A: Make customer support scale for nontechnical users  
**Product concept:** Cheerio Resolve  
**Prototype:** https://cheerio-resolve.vercel.app/  
**Source repository:** https://github.com/yxshas565/cheerio-resolve

## Note on prompt evidence

The prompt entries below are concise records of the prompt approaches used during the project. They are summaries, not claimed verbatim transcripts. The linked ChatGPT conversation and screenshots supplied in the accompanying AI usage evidence document provide supporting context. Antigravity did not provide a shareable conversation link, so the prototype link is included as evidence of the resulting implementation, not as an AI chat link.

## 1. Research before choosing a solution

**Prompt summary**

Investigate Cheerio's existing capabilities, compare potential solutions for nontechnical support users, and distinguish documented facts from assumptions and unanswered questions.

**What I changed after the response**

I did not treat a generic support chatbot as the default answer. I considered Cheerio's existing help, workflow, AI assistant, and MCP capabilities, then narrowed the first pilot to template and campaign troubleshooting. I also kept ticket frequency and internal safeguards as open questions because public documentation alone cannot establish them.

**Evidence to attach**

Add an actual screenshot of the research prompt and the relevant response, or use the genuine shared ChatGPT conversation link in the submission form.

## 2. Refine the product around verifiable outcomes

**Prompt summary**

Develop a support resolution experience that inspects available evidence, recommends appropriate actions, verifies outcomes, and escalates cases when reliable resolution is not possible. Explore how successful procedures could become reusable troubleshooting knowledge.

**What I changed after the response**

I developed the Evidence to Resolution Loop: investigate, inspect evidence, guide a correction, verify the relevant condition, and record the outcome in a Resolution Passport. I added Fix Memory for troubleshooting procedures that require human review before reuse, and Resolution Intelligence for surfacing recurring patterns as opportunities to investigate rather than treating them as proof of a product defect.

**Evidence to attach**

Add an actual screenshot of the concept refinement prompt and response.

## 3. Translate the product specification into a clickable prototype

**Prompt summary**

Translate the product specification into a clickable application covering investigation, evidence inspection, guided correction, verification, Resolution Passport, Fix Memory, Resolution Intelligence, and human escalation.

**What changed after the response**

I used Antigravity to build the React, TypeScript, and Vite frontend, then reviewed and refined the interface. The deployed prototype demonstrates the orchestration view and the linked troubleshooting and support knowledge screens. The demo uses simulated data and does not connect to Cheerio's live systems.

**Evidence to attach**

Add a screenshot of the actual Antigravity implementation prompt and a screenshot of the resulting application. The live prototype is available at https://cheerio-resolve.vercel.app/ .

## 4. Weak approach and correction

**Weak prompt approach recorded during the project**

“Make it the best possible, with more animations and a much more impressive interface.”

**Why it was weak**

The instruction was too open-ended. It encouraged more visual effects without first checking whether they made the product's core mechanism easier to understand or whether the end-to-end interactions and required deliverables were complete.

**What I changed**

I constrained the next iteration to the existing application. I focused on making the orchestration reflect the simulated case state, keeping the Resolution Passport consistent with the investigation, making the assistant contextual, supporting light and dark themes, and validating the complete user journey. I stopped adding features once the core concept was sufficiently clear and prioritized correctness and submission readiness.

## 5. Where AI was weak and how I checked it

- **Generic solution patterns:** I checked Cheerio's documented support and AI capabilities and narrowed the concept beyond a documentation chatbot.
- **Unsupported assumptions:** I did not treat missing public documentation as proof that Cheerio lacks a capability. Ticket frequency and internal functionality remain questions for validation.
- **Advice mistaken for resolution:** I defined the outcome around a relevant state change or explicit completion evidence. “Unable to verify” remains a valid result.
- **False precision in estimates:** I kept support volume, handling cost, resolution rates, model use, and price as assumptions in the spreadsheet rather than describing them as Cheerio's actual economics.
- **Overdesign:** I redirected the visual work towards state-driven orchestration and important interactions instead of adding effects without a clear purpose.

## 6. Product decisions and work I am responsible for

I chose Assignment A and the support scaling problem. I narrowed the initial pilot to template and campaign troubleshooting, established the distinction between a recommendation and a verified outcome, made human escalation explicit, and required human review before a troubleshooting procedure can be approved for reuse. I also kept the financial inputs editable, the data simulated, and the product claims bounded by the evidence available.

AI supported research synthesis, concept refinement, drafting, modelling structure, and frontend implementation. I reviewed the outputs and remain responsible for validating the evidence, checking the calculations, testing the prototype, and defending the product trade-offs.
