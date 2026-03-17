---
name: Antigravity Efficient Workflow
description: Best practices for collaborating with Antigravity AI, including specialized prompts for Python, React, and WordPress.
---
# Antigravity User Guide & Prompt Collection

This guide captures best practices for collaborating with Antigravity (AG) and provides a set of high-utility prompts tailored to your specific stack (Python/Automation, React/Tailwind, and WordPress).

## 🚀 Part 1: Working Efficiently with Antigravity

To get the best results, treat AG as a senior pair programmer who needs context but has infinite energy.

### 1. Context is King
*   **Open Relevant Files**: AG can see your open tabs and cursor. If you want a specific file edited, open it.
*   **Explain the "Why"**: Instead of "Fix this," say "I'm getting a 403 error on the Reddit API; check the auth headers."
*   **Share the Terminal**: Let AG run commands (`npm run dev`, `python script.py`) to see raw error output directly, rather than pasting truncated logs.

### 2. The "Planner" Pattern (For Complex Tasks)
For large features (like your Reddit Marketplace or a new Site Section), avoid jumping straight to code.
1.  **Ask for a Plan**: "Review the requirements for [Feature]. Create an implementation plan."
2.  **Refine**: Discuss the plan. (e.g., "Let's use Supabase for this part.")
3.  **Execute**: "Looks good. Implement step 1."

### 3. Artifacts
AG creates "Artifacts" (Markdown files) in `antigravity/brain/` to store long-term context.
*   `task.md`: The active checklist.
*   `implementation_plan.md`: The architectural blueprint.
*   `walkthrough.md`: Proof of work (screenshots, verification steps).

---

## 🧩 Part 2: Workflow-Specific Prompts

### 🛠 Python & Automation (Reddit/Scripting)

**The "Robust Scraper" Prompt**
> "Write a Python script to [action, e.g., monitor subreddit threads]. It must:
> 1. Handle rate limits gracefully (exponential backoff).
> 2. Use `logging` instead of print statements.
> 3. Save state to a local JSON file to resume if interrupted.
> 4. Use `pydantic` for data validation if applicable."

**The "Debug & Fix" Prompt**
> "I'm running this script and getting `[ErrorType]`. Run the script, analyze the stack trace, and fix the root cause. If it's an environment variable issue, verify `.env` loading."

### 💻 Web Development (React / Next.js / Tailwind)

**The "Premium UI Component" Prompt**
> "Create a `[Component Name]` in React using Tailwind CSS.
> *   **Style**: Dark mode, glassmorphism (backdrop-blur), sleek borders.
> *   **Interactivity**: Subtle hover scaling and specific click animations.
> *   **Props**: It should accept `[prop1]`, `[prop2]`."

**The "Refactor Hook" Prompt**
> "Extract the logic for [Feature, e.g., User Authentication] from this component into a custom hook named `useAuth`. It should expose `user`, `loading`, `error`, and `login/logout` methods."

### 🌐 WordPress (Localhost Development)

**The "Content Update" Prompt (Browser Tool)**
> "My local site is at `http://localhost:[port]`. Log in to `wp-admin` (I will provide creds if needed).
> 1. Edit the 'About' page.
> 2. Replace the second paragraph with: '[New Text]'.
> 3. Update the SEO title to '[Title]' using the Yoast/RankMath settings box."

**The "Theme Customization" Prompt (Code Edit)**
> "I want to change the header styling.
> 1. Locate the active theme in `wp-content/themes`.
> 2. Modify `style.css` (or the relevant CSS file) to change the navigation background to `[Color]`.
> 3. Ensure the change is responsive for mobile devices."

**The "Plugin Configuration" Prompt**
> "Log in to my local site. Install/Activate the plugin `[Plugin Name]`. Configure it to [Specific Setting, e.g., 'Enable caching for mobile']. Take a screenshot of the settings page when done."

---

## 📢 Part 3: Marketing & Copy

**The "Landing Page Optimizer" Prompt**
> "Review `index.html`. Rewrite the H1 and Meta Description to target [Audience, e.g., Parents of Class 12 Students]. The tone should be [Tone, e.g., Authoritative, Reassuring]. Focus on [Benefit, e.g., Discipline and Results]."

**The "Cold Outreach" Prompt**
> "Draft 3 variations of a Reddit DM to potential leads.
> *   **Variant A**: Casual, community-focused.
> *   **Variant B**: Direct value proposition.
> *   **Variant C**: Question-based approach."
