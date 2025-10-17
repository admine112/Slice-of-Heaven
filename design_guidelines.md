# Design Guidelines: Slice of Heaven Pizza Website

## Design Approach
**Reference-Based Premium Street Food Aesthetic**
Drawing inspiration from modern food delivery platforms (DoorDash, Uber Eats) combined with premium street food culture and neon-lit urban dining experiences. The design merges sophisticated minimalism with bold, energetic street food vibes.

**Core Principles:**
- Cinematic food photography with dramatic lighting
- Bold typography that commands attention
- Neon glow effects for urban nightlife energy
- High contrast for premium feel
- Smooth, appetizing animations

## Color Palette

**Primary Colors:**
- **Deep Black:** 0 0% 8% (main backgrounds, headers)
- **Charcoal:** 0 0% 15% (secondary backgrounds, cards)
- **Vibrant Orange:** 25 95% 55% (primary CTA, accents, fire elements)
- **Neon Orange:** 25 100% 65% (glow effects, hover states)

**Supporting Colors:**
- **Pure White:** 0 0% 100% (text, light backgrounds)
- **Soft White:** 0 0% 95% (subtle contrast)
- **Dark Orange:** 20 85% 45% (active states)
- **Orange Glow:** 25 100% 60% with blur (neon effects)

**Semantic Colors:**
- Success (orders): 142 76% 45%
- Alert (spicy items): 0 85% 60%
- Info: 200 90% 55%

## Typography

**Font Families:**
- **Headings:** 'Bebas Neue' or 'Oswald' (bold, street food energy) - via Google Fonts
- **Body:** 'Inter' or 'Poppins' (clean, readable) - via Google Fonts
- **Accent/Slogan:** 'Playfair Display' or 'Cormorant Garamond' (premium touch)

**Type Scale:**
- Hero Headline: text-6xl md:text-7xl lg:text-8xl font-bold
- Section Titles: text-4xl md:text-5xl font-bold
- Subsections: text-2xl md:text-3xl font-semibold
- Body: text-base md:text-lg
- Small/Meta: text-sm

## Layout System

**Spacing Primitives:** Tailwind units 2, 4, 6, 8, 12, 16, 20, 24
- Tight spacing: p-2, m-4, gap-2
- Standard spacing: p-6, p-8, m-8
- Section spacing: py-16, py-20, py-24

**Container Strategy:**
- Full-width sections: w-full
- Content containers: max-w-7xl mx-auto px-4 md:px-6
- Reading content: max-w-4xl
- Forms: max-w-2xl

**Grid Systems:**
- Menu cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
- Features: grid-cols-1 md:grid-cols-3 gap-8
- Mobile: Always single column

## Component Library

**Navigation:**
- Sticky header with glass-morphism background blur
- Logo with orange glow on hover
- Desktop: horizontal nav with underline hover effects
- Mobile: slide-in menu from right with dark overlay
- Language switcher: pill-style toggle (EN/UA) with orange active state

**Buttons:**
- Primary: bg-orange text-white with neon orange glow shadow on hover
- Secondary: border-2 border-orange text-orange with orange/20 bg on hover
- Ghost: text-orange hover:bg-orange/10
- All buttons: rounded-lg px-6 py-3 font-semibold transition-all duration-300

**Cards (Pizza Menu):**
- Dark background (bg-charcoal) with subtle border
- Hover: lift effect (transform scale-105) + orange glow shadow
- Image: rounded-t-lg with overlay gradient on hover
- Price badge: absolute top-4 right-4 with orange bg
- Category tag: top-4 left-4 with semi-transparent bg

**Forms:**
- Input fields: dark bg with orange focus ring
- Labels: text-white/80 mb-2
- Validation: inline with orange/green indicators
- Rounded corners: rounded-lg

**Admin Panel:**
- Dark dashboard with orange accents
- Table rows with hover effects
- Action buttons: icon-only with tooltips
- Login form: centered card with neon glow

## Page-Specific Guidelines

**Hero Section:**
- Full viewport height (min-h-screen) with stunning pizza imagery
- Dark overlay (bg-black/50) for text legibility
- Centered content: logo, slogan, dual CTA buttons
- Subtle fire/smoke animation effects in background
- Parallax scroll effect on background image

**Menu Page:**
- Category tabs with orange underline for active state
- 4-column grid (desktop) with hover zoom animations
- Each pizza card: image, name, description, price, "Add to Calculator" button
- Filter/sort options at top

**Order Calculator:**
- Split layout: left sidebar (selections), right panel (preview + total)
- Step-by-step ingredient selection with checkboxes
- Live price updates with smooth number transitions
- Size selector: visual pizza size indicators
- Prominent "Place Order" button at bottom

**Checkout Page:**
- Pre-filled order summary from calculator
- Customer info form + delivery details
- Order total with breakdown
- Orange progress indicator at top

**About Section:**
- Pizza-cloud illustration as hero visual
- Story text with premium typography
- Team/values in card grid
- Ambient orange glow effects

**Contact Section:**
- Two-column: form left, map/info right
- Embedded Google Maps with dark theme
- Contact cards: phone, email, address with icons
- Form with orange submit button

## Images

**Required Images:**
1. **Hero Background:** Cinematic pizza shot with melted cheese, dramatic lighting, shallow depth of field. Position: cover, center. Overlay: dark gradient.

2. **Menu Category Images:** Professional food photography for each pizza showing toppings, texture. High contrast, warm lighting.

3. **About Section:** Custom illustration of pizza slice on cloud/sky background, whimsical yet premium style.

4. **Background Elements:** Subtle fire/flame graphics, neon sign textures for accents (use sparingly).

All images should have dark/moody lighting to match the black background aesthetic.

## Animations & Effects

**Hover Animations:**
- Menu cards: scale-105 + shadow glow (duration-300)
- Buttons: lift + glow shadow (duration-200)
- Links: orange underline slide-in effect

**Scroll Animations:**
- Fade-in-up for sections (stagger children)
- Parallax on hero image (slower scroll)
- Number counter animation for stats/prices

**Glow Effects:**
- Orange box-shadow blur on primary CTAs
- Neon outline on active elements
- Pulsing glow on "Order Now" button

**Loading States:**
- Skeleton loaders with orange shimmer
- Smooth transitions between states

## Responsive Behavior

**Breakpoints:**
- Mobile: < 768px - single column, stacked sections
- Tablet: 768px-1024px - 2 columns, simplified nav
- Desktop: > 1024px - full grid layouts, multi-column

**Mobile Menu:**
- Hamburger icon with orange bars
- Full-screen overlay menu (slide from right)
- Large touch targets (min 44px)
- Vertical stack of nav items

**Touch Interactions:**
- Larger buttons on mobile (py-4)
- Swipeable image galleries
- Bottom-fixed order calculator CTA on mobile

## Accessibility

- Dark mode optimized (primary interface)
- High contrast text (white on dark)
- Focus indicators with orange outline
- ARIA labels on interactive elements
- Keyboard navigation support
- Form validation with clear error messages