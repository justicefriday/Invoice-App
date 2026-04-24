# Invoice App

A fully responsive, full-featured Invoice Management Application built with React. Create, edit, delete, and track invoices with draft/pending/paid status flows, light/dark theme support, and localStorage persistence.

**Live Demo:** [https://invoice-app-pi-two.vercel.app](https://invoice-app-pi-two.vercel.app)  
**GitHub:** [https://github.com/justicefriday/Invoice-App](https://github.com/justicefriday/Invoice-App)


## Features

- **Create invoices** — full form with Bill From, Bill To, items list, payment terms
- **Read invoices** — list view with ID, client, due date, amount and status
- **Update invoices** — edit any draft or pending invoice via slide-in drawer
- **Delete invoices** — confirmation modal before permanent deletion
- **Save as Draft** — save incomplete invoices without full validation
- **Mark as Paid** — transition pending invoices to paid status
- **Filter by status** — checkbox dropdown to filter by Draft, Pending, or Paid
- **Light / Dark mode** — toggle persisted to localStorage across sessions
- **Fully responsive** — works on mobile (320px), tablet (768px), and desktop (1024px+)
- **Data persistence** — all invoices saved to localStorage, survive page refresh
- **Accessible** — semantic HTML, keyboard navigation, focus trap in modal, ARIA labels

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Context API | Global state (invoices + theme) |
| localStorage | Data persistence |
| Vite | Build tool and dev server |
| CSS Variables | Theming (light/dark) |
| League Spartan | Typography (Google Fonts) |

---

## Project Structure

```
src/
├── main.jsx                  # React entry point
├── App.jsx                   # Router + provider setup
├── index.css                 # Global styles + CSS variables (both themes)
│
├── context/
│   ├── InvoiceContext.jsx    # All invoice state + CRUD operations
│   └── ThemeContext.jsx      # Light/dark theme state + toggle
│
├── components/
│   ├── SideBar.jsx           # Sidebar (desktop) / top bar (mobile)
│   ├── StatusBadge.jsx       # Reusable paid/pending/draft pill badge
│   ├── Modal.jsx             # Delete confirmation modal
│   └── InvoiceForm.jsx       # Slide-in drawer for create + edit
│
└── pages/
    ├── InvoiceList.jsx       # Home page — invoice list + filter
    └── InvoiceDetails.jsx    # Detail page — full invoice + actions
```

---

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/justicefriday/Invoice-App.git

# 2. Navigate into the project folder
cd Invoice-App

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder, ready to deploy to Vercel, Netlify, or any static host.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

---

## Architecture Explanation

### State Management — Context API

The app uses two React contexts instead of a library like Redux, keeping things simple and learnable:

**`InvoiceContext`** is the single source of truth for all invoice data. It exposes `invoices`, `addInvoice`, `updateInvoice`, `deleteInvoice`, and `markAsPaid`. Every component reads from this context rather than receiving invoices through props. Any mutation automatically persists to localStorage via a `useEffect` that watches the `invoices` array.

**`ThemeContext`** manages the light/dark preference. Toggling calls `document.documentElement.setAttribute("data-theme", theme)` which switches the CSS variable set at the `:root` level, causing the entire UI to re-theme without any component re-renders beyond the toggle button itself.

### Routing

React Router v6 handles two routes:
- `/` — `InvoiceList` page
- `/invoice/:id` — `InvoiceDetails` page

The `InvoiceForm` is not a route — it is a slide-in drawer component that renders on top of whichever page opens it.

### Data Flow

```
User action
    ↓
Component calls context function (e.g. addInvoice)
    ↓
Context updates React state
    ↓
useEffect saves to localStorage
    ↓
React re-renders affected components
```

### CSS Architecture

All design tokens (colours, spacing, typography) are defined as CSS custom properties in `:root`. The dark theme overrides only the values that change by scoping them under `[data-theme="dark"]`. This means every component automatically inherits the correct theme without any JavaScript colour logic in components.

---

## Invoice Status Flow

```
Draft  ──(edit & send)──▶  Pending  ──(mark paid)──▶  Paid
  ▲                                                      │
  │                                                      │
  └──────── cannot revert from Paid ────────────────────┘
```

- **Draft** — saved without full validation, can be edited freely
- **Pending** — fully validated and sent, can be marked as Paid or deleted
- **Paid** — final state, edit button is hidden, cannot revert

---

## Form Validation

Validation runs only on "Save & Send" (not on "Save as Draft"):

| Field | Rule |
|---|---|
| Client Name | Required, cannot be empty |
| Client Email | Must contain @ symbol |
| Description | Required, cannot be empty |
| Invoice Date | Required |
| Items | At least one item required |
| Item Name | Required per item |
| Item Quantity | Must be 1 or more |
| Item Price | Cannot be negative |

Error messages appear inline below each invalid field. The form cannot be submitted until all errors are resolved.

---

## Accessibility Notes

- All interactive elements are real `<button>` elements — no `<div>` buttons
- Form fields use `<label htmlFor>` paired with input `id` attributes
- The delete modal uses `role="dialog"` and `aria-modal="true"`
- Focus is trapped inside the modal when open — Tab key cycles only through modal buttons
- The modal closes on ESC key press
- Invoice cards are keyboard navigable via Tab and activatable via Enter
- The theme toggle has an `aria-label` that announces the current action
- Status badges have implicit readable text (not icon-only)
- Color contrast meets WCAG AA in both light and dark themes

---

## Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| 320px — 767px | Sidebar becomes sticky top bar, single column content, stacked card layout |
| 768px — 1023px | Sidebar top bar, wider content area, 2-column form grids |
| 1024px+ | Fixed left sidebar (80px), full layout, 3-column form grids |

---

## Trade-offs & Known Limitations

- **No backend** — data lives in localStorage only. Clearing browser storage will erase all invoices. A real app would use a database.
- **No authentication** — any user on the same browser shares the same invoices.
- **No image upload for avatars** — avatar is a placeholder from pravatar.cc.
- **Invoice ID generation** — IDs are randomly generated (2 letters + 4 digits). In production, a server would generate sequential or UUID-based IDs to guarantee uniqueness.
- **Date format** — dates are stored and displayed as `YYYY-MM-DD`. A future improvement would format them as "1 Jan 2026" for better readability.
- **No pagination** — if a user creates hundreds of invoices, the list renders them all at once. Pagination or virtual scrolling would be needed at scale.

---

## What Changed From Stage 0 → Stage 1 → Stage 2

### Stage 0
- Basic HTML/CSS/JS todo card with `data-testid` attributes

### Stage 1
- React profile card with epoch clock, social links, hobbies/dislikes
- `useState` and `useEffect` introduced

### Stage 2 (this project)
- Full React application with routing, context, and localStorage
- Complete CRUD for invoices
- Form validation
- Status flow (Draft → Pending → Paid)
- Light/dark theme toggle
- Fully responsive layout from 320px to 1440px+
- Accessible modal with focus trap

---

## Author

**Friday Justice**  
GitHub: [@justicefriday](https://github.com/justicefriday)

---

