# Design System Specification: High-End Medical Editorial

## 1. Overview & Creative North Star

### The Creative North Star: "The Clinical Curator"
This design system rejects the "utilitarian-only" aesthetic common in medical software. Instead, it adopts the persona of a **Clinical Curator**: an interface that treats patient data and medical reports with the same clarity and prestige as a high-end editorial magazine. 

We move beyond standard templates by leveraging **intentional asymmetry**, **layered depth**, and **tonal authority**. The goal is to provide doctors and administrators with a workspace that feels calm, premium, and profoundly organized. By using high-contrast typography scales and breathing room (whitespace as a functional tool), we reduce cognitive load while maintaining a sophisticated visual identity.

---

## 2. Colors & Surface Architecture

The palette is anchored in professional blues and sterile, yet warm, neutrals. 

### The "No-Line" Rule
To achieve a modern, premium feel, **1px solid borders for sectioning are strictly prohibited.** Structural boundaries must be created through:
- **Background Color Shifts:** Placing a `surface-container-low` section against a `background` fill.
- **Tonal Transitions:** Using subtle variations in surface tokens to indicate change in context.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of premium materials.
- **Level 0 (Background):** `#faf8fe` — The canvas.
- **Level 1 (Sections):** `surface-container-low` (#f4f3fa) — Large layout areas.
- **Level 2 (Cards):** `surface-container-lowest` (#ffffff) — Actionable data units.
- **Level 3 (Floating/Popovers):** Semi-transparent `surface` with a 20px backdrop-blur (Glassmorphism).

### Signature Textures
Main CTAs and high-level headers should use a subtle linear gradient from `primary` (#0053dc) to `primary-container` (#3e76fe) at a 135° angle. This adds "visual soul" and prevents the interface from feeling flat or "bootstrap-generic."

---

## 3. Typography

The system uses a pairing of **Manrope** for authoritative displays and **Inter** for high-precision utility.

| Role | Token | Font | Size | Weight | Intent |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Manrope | 3.5rem | 700 | Large impact numbers/stats. |
| **Headline** | `headline-md` | Manrope | 1.75rem | 600 | Page titles and primary section headers. |
| **Title** | `title-md` | Inter | 1.125rem | 600 | Card titles and modal headers. |
| **Body** | `body-md` | Inter | 0.875rem | 400 | Standard data, reports, and inputs. |
| **Label** | `label-sm` | Inter | 0.6875rem | 600 | Metadata, table headers, and badges. |

**Editorial Contrast:** Use `on-surface-variant` (#5d5f68) for labels and `on-surface` (#30323b) for data to create a clear hierarchy of "Description vs. Value."

---

## 4. Elevation & Depth

Hierarchy is achieved through **Tonal Layering** rather than structural lines.

- **The Layering Principle:** A card (`surface-container-lowest`) sitting on a panel (`surface-container-low`) creates natural lift. 
- **Ambient Shadows:** For floating elements like modals or active cards, use a shadow with a 40px blur, 0% spread, and 6% opacity using a tinted shadow color: `rgba(0, 83, 220, 0.06)`. This mimics natural light passing through medical-grade glass.
- **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., in a high-density table), use `outline-variant` (#b0b1bc) at **15% opacity**. Never use 100% opaque borders.
- **Glassmorphism:** Use for the top navigation bar and floating tooltips to allow the content colors to bleed through, making the UI feel integrated.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-container`), `xl` (1.5rem) roundedness. 
- **Secondary:** `secondary-container` (#dde1f9) background with `on-secondary-container` (#4c5164) text.
- **Tertiary:** No background; `primary` text. Use for low-priority actions like "Cancel."

### Input Fields & Forms
- **Container:** `surface-container-highest` (#e1e2ed) with a `sm` (0.25rem) corner radius.
- **States:** On focus, the background shifts to `surface-container-lowest` with a 2px `primary` ghost-border (20% opacity).
- **Typography:** Labels use `label-md` placed strictly above the field, never inside.

### Tables & Data Lists
- **The "No-Divider" Rule:** Forbid the use of horizontal divider lines. Use `spacing-4` (1.4rem) of vertical whitespace or alternating row tints using `surface-container-low` to separate items.
- **Status Badges:** Use `tertiary-container` (#e6cafa) for neutral states and `error-container` (#fa746f) for alerts. Shape must be `full` (9999px).

### Navigation (Sidebar)
- **Active State:** A "pill" shape using `primary-container` (#3e76fe) with `on-primary-fixed` (#ffffff) text.
- **Inactive State:** `on-surface-variant` text with no background.

---

## 6. Do's and Don'ts

### Do
- **Use White Space as a Border:** If two elements feel too close, increase the spacing token rather than adding a line.
- **Layer Surfaces:** Always place lighter surfaces on top of darker surfaces to indicate "closeness" to the user.
- **Align to the Manrope Baseline:** Ensure large headlines have enough "leading" (line height) to feel like an editorial layout.

### Don't
- **Don't use pure black:** Use `on-surface` (#30323b) for text to maintain a softer, premium look.
- **Don't use default shadows:** Standard "drop shadows" look cheap. Always use the low-opacity, tinted Ambient Shadows described in Section 4.
- **Don't use hard corners:** Every interactive element must have at least a `DEFAULT` (0.5rem) radius to feel approachable and modern.
- **Don't overcrowd:** If a table has more than 8 columns, move secondary data into a "Details" expansion rather than shrinking the text.