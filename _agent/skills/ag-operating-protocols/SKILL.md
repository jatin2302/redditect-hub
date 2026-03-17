---
name: ag-operating-protocols
description: Master protocol for session lifecycle management. Enforces reading memory at start, running safety/pre-flight gates before major actions, and structuring handoffs at session end.
license: MIT
---

# AG Operating Protocols (Lifecycle Management)

**AG Global Rules Compliance Skill**

This skill enforces the baseline memory, safety, and handoff protocols every AG instance must follow during its lifecycle (Boot -> Execution -> Termination). 

## 1. Session Initialization (Persistent Memory)
Your context window is wiped clean when a new session starts. You must **rehydrate** your context from persistent files.

**Session Boot Sequence (Deterministic — follow this order):**
1. Read `projects_overview.md` at workspace root → identify which project is active
2. Read project `_agent/gemini.md` → load project identity, rules, success metrics
3. Read `_agent/progress.md` → identify next action and blockers
4. Read `_agent/task_plan.md` → identify current sprint and task statuses
5. Query NotebookLM AG Brain for this project (if notebook ID exists in gemini.md)
6. Load only the skills required for this session's task

**AG Brain Query Triggers (NotebookLM):**
- On boot (step 5 above)
- When choosing between 2+ technical or strategic approaches
- Context is stale (>3 sessions since last query)
- Before generating any new project structure — always check existing patterns first

**Protocol on Boot:**
1. Verify the boot sequence files exist. Create from templates if missing.
2. Read files in sequence above.
3. Acknowledge the state, phase, and immediate next action before proceeding.

## 2. Execution Gates (Safety & Pre-Flight)
Before executing significant architectural changes, new code generation, or destructive actions, enforce these gates:

### The Pre-Flight Gate (For New Builds)
Whenever the user requests a new build, feature, or automation routine from scratch, you must **HALT** before writing any code. Output a **Pre-Flight Block** for the user to review. DO NOT proceed past it without the user saying "APPROVE".

**Format:**
```markdown
# 🛑 PRE-FLIGHT GATE: AWAITING APPROVAL

## 1. Critique
[Critique flaws, missing edge cases, and evaluate ROI]

## 2. Clarifying Questions
- [1-3 critical questions. Ask to confirm data schemas here.]

## 3. Optimized Plan
[Dense, bulleted execution plan]

---
**STATUS:** ⏸️ HALTED.
**ACTION REQUIRED:** Please reply with "APPROVE" to proceed, or answer questions to refine.
```
*(Bypass if user prefix is `EXECUTE:` or `DO:`)*

### The Non-Destructive Gate (For Dangerous Operations)
AWAIT explicit "APPROVE" before executing:
- `rm -rf`
- `DROP TABLE` / `TRUNCATE TABLE`
- `git reset --hard`
- Overwriting core config files ENTIRELY without a backup.

## 3. Session Termination (Context Handoff)
When ending a session (completing an Epic, hitting a blocker, or pausing), you MUST:

**Step A — Run `/sync-brain`:** If the project has `_agent/Business Brain.md`, run the `sync-brain` workflow to surgically update it with any strategy-level changes from this session (new decisions, phase advances, stack changes). Skip if the session was trivial (e.g., just answered a question).

**Step B — Append Context Handoff** to `_agent/progress.md`:

```markdown
## [Date & Time] Context Handoff

**Current State:**
- [Concise summary of running code/config]
- [Current phase of task_plan.md]

**Recently Completed:**
- [2-3 most recent file changes/tests]

**Next Immediate Action(s):**
- [The literal command or exact file edit the NEXT agent should do the moment it boots up]

**Blockers / Review Gates:**
- [Open questions or things the user must do]
```

## Anti-Patterns
- **Don't** assume what the project is doing; always read `_agent/gemini.md` & `_agent/task_plan.md`.
- **Don't** write 300 lines of setup code without the Pre-Flight Gate.
- **Don't** yield with "I'm done" without logging the Context Handoff to `_agent/progress.md`.
- **Don't** create meta-files (`gemini.md`, `progress.md`, `findings.md`, `task_plan.md`, `bugs.md`) in the root directory. They MUST go in `_agent/`.
- **Don't** fix bugs outside your assigned scope in multi-agent mode — log them to `_agent/bugs.md`.
