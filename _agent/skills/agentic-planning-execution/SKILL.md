---
name: agentic-planning-execution
description: Comprehensive framework for Manus-style file-based planning, writing TDD-based implementation specs, and batch-executing complex tasks across sessions.
license: MIT
---

# Agentic Planning & Execution Framework

**AG Global Meta-Skill**

This skill unifies how AG plans, tracks, and executes multi-step tasks extending beyond a single context window or requiring 5+ tool calls.

## Core Principle (Working Memory on Disk)
Context Window = RAM (volatile, limited)
Filesystem = Disk (persistent, unlimited)

Never start a complex task without creating the planning files. Everything important gets written to disk.

## 1. The Planning Phase
The core files (`_agent/gemini.md`, `_agent/task_plan.md`, `_agent/findings.md`, `_agent/progress.md`) are governed by `ag-operating-protocols`.

### Writing the Implementation Spec (`_agent/task_plan.md`)
Write plans assuming the executing agent has zero context for the codebase. Give them the whole plan as bite-sized, TDD-driven tasks (2-5 mins each).

**Format for a Task Step:**
```markdown
### Task N: [Component Name]
**Files:**
- Create: `exact/path/to/file.py`

**Step 1: Write failing test**
[Code block for test]

**Step 2: Run test to verify it fails**
Run: `pytest tests/path/test.py` -> Expected: FAIL

**Step 3: Write minimal implementation**
[Code block for feature]

**Step 4: Verify it passes & Commit**
```

## 2. The Execution Phase
When executing a written plan, you operate in batches to allow for human (or self) review.

**Protocol:**
1. Read `_agent/task_plan.md` critically. Identify gaps.
2. Execute tasks in batches (default: 3 tasks at a time).
3. Mark each task as `[x]` (completed) or `[/]` (in progress) in the plan.
4. Stop executing immediately when hitting a blocker, missing dependency, or failing test. Output the specific error and ask for guidance.

### The 3-Strike Error Protocol (During Execution)
1. **ATTEMPT 1:** Diagnose & Fix the exact error.
2. **ATTEMPT 2:** Try a different method/tool. NEVER repeat the exact same failing action.
3. **ATTEMPT 3:** Broader rethink. Update the plan.
4. **AFTER 3 FAILURES:** Escalate to User.

## 3. Multi-Agent Planning Mode

When a task involves 2+ domains (e.g., content + UI + SEO), declare `Mode: MULTI-AGENT` in `_agent/task_plan.md` and include these additional sections:

**Execution Mode Declaration:**
```markdown
## Execution Mode
**Mode:** MULTI-AGENT
```

**Agent Assignments Table:**
```markdown
## Agent Assignments
| Agent Scope   | Tasks                  | Files Owned           | Files Forbidden       |
|---------------|------------------------|-----------------------|-----------------------|
| content work  | Draft landing copy     | `docs/content/*.md`   | `src/`, `tests/`      |
| ui work       | Build responsive page  | `src/ui/*`            | `src/core/`, `tests/` |
```

**Contract Chain:**
```markdown
## Contract Chain
### Wave 1 — No dependencies
- **[agent]** → Produces: `[artifact]` at `[path]`

### Wave 2 — Depends on Wave 1
- **[agent]** → Consumes: `[artifact]` → Produces: `[artifact]`
```

**Decision Rule:** If task touches ≤2 files in a single domain → `SINGLE-AGENT`. Otherwise → `MULTI-AGENT`.

When `MULTI-AGENT` is declared, load the `multi-agent-coordination` skill for execution.

## Anti-Patterns
- **Don't** start executing code on complex features without making `_agent/task_plan.md` first.
- **Don't** repeat failed actions silently. Use the 3-Strike Protocol.
- **Don't** stuff discoveries into context RAM forever. Save to `_agent/findings.md`.
- **Don't** keep running code if the TDD spec fails. Stop and fix/ask.
- **Don't** use SINGLE-AGENT mode for tasks spanning 3+ distinct file domains.
