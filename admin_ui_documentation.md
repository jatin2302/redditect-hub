# RedditBoost Admin Panel — UI Documentation

> Full audit of every admin-facing screen, element purpose, design rationale, bugs, and missing features.

---

## Architecture Overview

| Layer | Tech | Notes |
|---|---|---|
| Framework | React 18 + Vite | SPA, client-side routing |
| Routing | `react-router-dom` v6 | 7 admin routes under `/admin/*` |
| State | Local `useState` only | No global store, no backend |
| Data | `mock-data.ts` | Hardcoded arrays — 20 services, 6 orders, 3 tickets, 6 transactions |
| UI Library | shadcn/ui + Radix | Table, Dialog, Select, Switch, Tabs, Badge, Progress |
| Charts | Recharts | AreaChart (weekly), BarChart (monthly) |
| Animation | Framer Motion | Fade-in on cards & sections |
| Icons | Lucide React | Consistent icon set throughout |

### Route Map

| Route | Component | Purpose |
|---|---|---|
| `/admin/orders` | `AdminOrders` | Order list with filters & bulk actions |
| `/admin/orders/:orderId` | `OrderDetailView` | Single order detail (shared with client) |
| `/admin/services` | `AdminServices` | Service CRUD & toggle |
| `/admin/clients` | `AdminClients` | Client directory |
| `/admin/clients/:clientId` | `ClientDetailView` | Individual client profile |
| `/admin/tickets` | `AdminTickets` | Support ticket management |
| `/admin/settings` | `AdminSettings` | General, Payments, SEO configuration |

> [!WARNING]
> There is **no dedicated `/admin` dashboard route**. The admin Dashboard nav item links to `/` (the client-facing `Index` page). The `AdminDashboard.tsx` component exists but is **never rendered** by any route.

---

## Page-by-Page Breakdown

### 1. Dashboard (Orphaned — `AdminDashboard.tsx`)

![Admin Dashboard](admin_dashboard.png)

> [!CAUTION]
> **BUG**: `AdminDashboard.tsx` is imported in `App.tsx` but never used in any `<Route>`. The sidebar "Dashboard" link goes to `/` which renders the client `Index` page, not the admin dashboard. This is a critical routing error.

#### Elements

| Element | Purpose | Design Rationale |
|---|---|---|
| 4× StatsCard (Revenue, Monthly, Active Orders, Total Clients) | KPI monitoring | At-a-glance business health metrics for the admin |
| Revenue AreaChart (Weekly) | Trend visualization | Spot revenue growth/decline patterns daily |
| Revenue BarChart (Monthly) | Longer-term trends | 6-month retrospective for capacity planning |
| Weekly/Monthly toggle | Chart switching | Reduces page clutter by combining two views |
| Recent Orders list (top 5) | Quick action queue | Surface orders needing attention without navigating away |
| Open Tickets panel | Urgent support items | Prioritize support by showing unresolved tickets |
| Activity Log (8 entries) | Audit trail | Operational transparency — tracks changes by admin/system |
| Export CSV button | Data export | Accounting, reporting, or external tool import |
| Announcement dialog | Broadcast messaging | Communicate maintenance, policy changes to all clients |

---

### 2. Orders (`/admin/orders`)

![Admin Orders ](admin_orders.png)

#### Elements

| Element | Purpose | Design Rationale |
|---|---|---|
| Search input (ID/client) | Quick lookup | Admins often reference specific order IDs from client messages |
| Status filter (Pending/In Progress/Completed/Cancelled) | Workflow segmentation | Process orders in batches by lifecycle stage |
| Service filter | Category isolation | Focus on specific service types during fulfillment |
| Date range filter (Today/7d/30d/90d) | Temporal slicing | Audit recent vs historical orders |
| Checkbox column + Select All | Row selection | Enable multi-order actions |
| Bulk action bar (Start/Complete/Cancel) | Batch operations | Efficiency when processing many orders at once |
| Progress bar per row | Fulfillment tracking | Visual at-a-glance completion indicator |
| Export CSV | Data portability | Share with teams, import to accounting software |
| Clickable Order ID → detail view | Navigation | Drill-down for investigation or manual intervention |

> [!IMPORTANT]
> **BUG**: Bulk actions (`handleBulkAction`) fire a toast but **never update order state**. After clicking "Mark Complete", the orders remain in their original status.

> [!NOTE]
> **Missing**: No pagination or virtual scrolling. With production-scale data (1000+ orders), this table will degrade.

---

### 3. Services (`/admin/services`)

![Admin Services](admin_services.png)

#### Elements

| Element | Purpose | Design Rationale |
|---|---|---|
| Active/Total counter subtitle | Inventory status | Quick sense of how many services are live |
| "Add Service" button → dialog | Service creation | Expand the catalog without page navigation |
| Service table (Active, Name, Category, Price, Min/Max, ETA, Actions) | Full inventory view | All pricing/availability data in one scan |
| Toggle switch per row | Enable/disable | Instantly remove a service from the client storefront without deleting data |
| Star icon for popular services | Highlights bestsellers | Visual differentiation for top sellers |
| Edit button → dialog | Inline editing | Modify pricing/descriptions without recreating |
| ServiceForm component | Reusable form | Shared between create and edit dialogs for consistency |

> [!NOTE]
> **Missing**: No "Delete" action. Once created, a service can only be toggled off but never removed from the list.

> [!NOTE]
> **Missing**: No search/filter on the services table. At 20+ services, finding a specific one requires manual scrolling.

---

### 4. Clients (`/admin/clients`)

![Admin Clients](admin_clients.png)

#### Elements

| Element | Purpose | Design Rationale |
|---|---|---|
| 3× summary cards (Total Clients, Total Balance, Total Revenue) | Portfolio overview | Understand aggregate financial health |
| Client table (Name, Email, Balance, Orders, Total Spent, Joined, Actions) | CRM directory | Central access to all client accounts |
| Clickable client name → detail view | Navigation drill-down | Investigate or adjust individual accounts |
| Eye icon button | View detail | Alternative navigation to detail view |
| Dollar icon button | Quick billing action | **Non-functional** — intended for balance adjustment but has no `onClick` handler |

> [!CAUTION]
> **BUG**: The `$` button in the Actions column renders but does nothing. It has no `onClick` handler and no associated dialog. The actual balance adjustment functionality exists on `ClientDetailView` but is not linked from this button.

> [!NOTE]
> **Missing**: No search input. No ability to filter by balance range, order count, or join date. No export option.

---

### 5. Client Detail (`/admin/clients/:clientId`)

![Admin Client Detail](admin_client_detail.png)

#### Elements

| Element | Purpose | Design Rationale |
|---|---|---|
| Back button | Navigation | Return to client list |
| 4× info cards (Email, Balance, Total Spent, Joined) | Client profile summary | All key metrics in one row |
| "Adjust Balance" dialog (Add/Deduct + amount) | Manual billing | Handle refunds, bonuses, manual wire deposits |
| Client's order table | Order history | See all orders for this specific client |
| Client's ticket table | Support history | View all support interactions for context |

> [!IMPORTANT]
> **BUG**: Balance adjustment only updates local `useState`. It does not propagate back to the `AdminClients` page — if you navigate back, the old balance is shown.

> [!NOTE]
> **Missing**: No email/notification button to contact the client directly. No "Suspend" or "Ban" action. No transaction history log (only exists in mock-data but not rendered here).

---

### 6. Tickets (`/admin/tickets`)

![Admin Tickets](admin_tickets.png)

#### Elements

| Element | Purpose | Design Rationale |
|---|---|---|
| Status filter (All/Open/Replied/Closed) | Triage view | Focus on tickets needing attention |
| Ticket table (ID, Client, Subject, Priority, Status, Date, Actions) | Support queue | Sortable view of all support requests |
| Priority badge (Low/Medium/High) | Urgency indicator | Color-coded triage at a glance |
| Clickable row → dialog | Quick response | Reply without full-page navigation |
| Reply dialog with conversation thread | Chat-style resolution | See full context before replying |
| Reply textarea + Send button | Response input | Direct communication channel |
| Close Ticket button | Resolution | Mark resolved tickets to reduce queue |

> [!TIP]
> This is one of the **better-implemented** pages. It has a working reply flow that updates local state correctly, and the conversation thread renders both client and admin messages visually distinct.

> [!NOTE]
> **Missing**: No search. No ability to assign tickets to specific admins. No SLA timer or response-time tracking. No canned response templates.

---

### 7. Settings (`/admin/settings`)

![Admin Settings](admin_settings.png)

#### Elements — General Tab

| Element | Purpose |
|---|---|
| Panel Name input | Branding customization |
| Support Email input | Contact configuration |
| Currency input | Localization |
| Notification toggles (New orders, New tickets, Auto-assign) | Alert preferences |
| Deposit Limits (Min/Max) | Financial controls |
| Save button | Persist configuration |

#### Elements — Payments Tab

| Element | Purpose |
|---|---|
| Traditional methods (Stripe, PayPal, Wise, Skrill, Perfect Money) | Toggle payment gateways |
| Crypto methods (BTC, ETH, USDT, LTC, SOL) | Toggle crypto acceptance |
| Save Payment Settings button | Persist payment config |

#### Elements — SEO Tab

| Element | Purpose |
|---|---|
| Site Title, Meta Description, Keywords, Canonical URL, OG Image | Search engine optimization |
| Robots/Indexing toggles | Crawling controls |
| Google Analytics ID, Search Console verification | Tracking integration |
| Save SEO Settings button | Persist SEO config |

> [!IMPORTANT]
> **BUG**: All settings use `defaultValue` (uncontrolled inputs). The "Save" button triggers a toast but **does not read the current form values** — it saves nothing. Even within the same session, toggling payment methods with `Switch` updates state, but there's no serialization to any store.

---

## Shared Components

### `DashboardLayout`
- Sidebar + header + main content area
- Sticky header with breadcrumbs, global search (`⌘K`), wallet balance chip, notifications bell, and theme toggle
- **Bug**: The wallet balance is hardcoded to `$1,250.00` regardless of the logged-in user or role. It should not display on admin view.

### `AppSidebar`
- Role-aware navigation: renders different menu groups for `admin` vs `client`
- Footer dropdown with role switcher (`Switch to Client/Admin`) and logout
- **Bug**: Admin sidebar "Dashboard" links to `/` (client Index), not an admin dashboard route

### `StatusBadge`
- Unified badge component mapping status strings to colors
- Handles: `pending`, `in_progress`, `completed`, `cancelled`, `refunded`, `open`, `replied`, `closed`, `low`, `medium`, `high`

### `StatsCard`
- Animated card with icon, value, optional trend indicator, and optional pulse dot
- Supports `default`, `primary`, and `accent` variants

---

## Summary of Bugs

| # | Severity | Page | Bug |
|---|---|---|---|
| 1 | 🔴 Critical | Dashboard | `AdminDashboard.tsx` exists but is **not routed** — never renders |
| 2 | 🔴 Critical | Sidebar | Admin "Dashboard" links to `/` (client page), not admin dashboard |
| 3 | 🟡 Medium | Orders | Bulk actions fire toasts but **do not update order status** |
| 4 | 🟡 Medium | Settings | All form fields use `defaultValue` — Save button **saves nothing** |
| 5 | 🟡 Medium | Clients | `$` action button has **no onClick handler** |
| 6 | 🟡 Medium | Client Detail | Balance changes are **local-only** — don't sync to parent list |
| 7 | 🟠 Low | Layout | Wallet balance chip shows hardcoded `$1,250.00` on admin view |
| 8 | 🟠 Low | Dashboard | Activity log is a static array, not reflecting real events |

---

## Missing Features (Required for Production)

| Priority | Feature | Why It's Needed |
|---|---|---|
| 🔴 P0 | **Admin Dashboard route** | The entire analytics hub is orphaned — admins land on the client page |
| 🔴 P0 | **Backend / API integration** | All data is mock — no persistence across refreshes |
| 🔴 P0 | **Authentication gate** | No `/admin` route protection — any user can navigate to admin pages |
| 🟡 P1 | **Order detail editing** | Admins need to update status, add notes, adjust quantities from the detail view |
| 🟡 P1 | **Pagination** | Tables will break with 100+ rows — need paginated or virtualized lists |
| 🟡 P1 | **Search on all pages** | Clients, Services, and Tickets pages have no search input |
| 🟡 P1 | **Service deletion** | No way to permanently remove discontinued services |
| 🟡 P1 | **Transaction history on client detail** | Data exists in `mock-data.ts` but is never displayed |
| 🟡 P1 | **Controlled settings forms** | Settings need `useState` + proper form logic, not uncontrolled `defaultValue` |
| 🟠 P2 | **Notification system** | Bell icon is decorative — no notification panel or real-time alerts |
| 🟠 P2 | **Global search (`⌘K`)** | Input exists but does nothing — needs command palette / search results |
| 🟠 P2 | **Ticket assignment** | No multi-admin support or ticket ownership |
| 🟠 P2 | **Client suspension/ban** | No user management actions beyond balance adjustment |
| 🟠 P2 | **Order notes / custom instructions** | Client-submitted notes (target subreddit, drip-feed speed) are not visible to admin |
| 🟠 P2 | **Sort columns** | Tables are not sortable — admins can't sort by price, date, or status |
| 🟠 P2 | **API provider config** | No way to connect external SMM/fulfillment APIs from settings |
| 🟢 P3 | **Export on all pages** | Only Dashboard and Orders have CSV export — Clients, Services, Tickets do not |
| 🟢 P3 | **Dark mode persistence** | Theme toggle works per-session but doesn't persist to `localStorage` |
| 🟢 P3 | **Mobile responsiveness audit** | Tables and filter bars may break on small screens |
