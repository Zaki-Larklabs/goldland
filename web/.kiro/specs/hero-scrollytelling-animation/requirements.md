# Requirements Document

## Introduction

This feature replaces the existing looping background video in the landing page hero section with a scroll-linked canvas animation ("scrollytelling"). A 120-frame WebP image sequence (`shard_frame_0.webp` through `shard_frame_119.webp`) simulates a cinematic camera flight up The Shard building. Scroll position drives frame selection, overlaid editorial text panels fade in and out at defined scroll thresholds, and a minimalist loading state is shown until all frames are ready. The visual theme is a fog/editorial light aesthetic: light-gray/white mist background, black typography, no noisy gradients.

The implementation targets the `/web` Next.js 14 (App Router) project. Three files are created or modified: `web/src/components/BuildingScroll.tsx` (new), `web/src/app/page.tsx` (hero section replaced), and `web/src/app/globals.css` (fog background, scroll-body styles).

---

## Glossary

- **BuildingScroll**: The new React client component that owns the sticky canvas, image-sequence preloader, scroll-to-frame logic, and text overlay panels.
- **Canvas**: An HTML5 `<canvas>` element used to draw individual image frames for GPU-accelerated, flicker-free rendering.
- **Frame**: A single WebP image from the 120-image sequence (`shard_frame_0.webp` … `shard_frame_119.webp`).
- **ScrollProgress**: A normalised float in the range [0, 1] derived from Framer Motion's `useScroll` hook, representing how far the user has scrolled through the `BuildingScroll` outer container.
- **StoryOverlay**: A single text panel consisting of a headline and sub-copy that fades and translates into view at a specified `ScrollProgress` threshold and fades out before the next threshold.
- **LoadingState**: The pre-animation interstitial — a minimalist spinner paired with the label "Rendering ascent…" — visible until all 120 Frames are decoded.
- **CLS**: Cumulative Layout Shift — a Core Web Vitals metric. The implementation must achieve CLS = 0.
- **DPR**: Device Pixel Ratio, used to scale the Canvas for sharp rendering on high-density displays.
- **Cover-fit**: A drawing mode that scales the source image uniformly so it fully covers the Canvas dimensions, centred, with no letterboxing (equivalent to CSS `object-fit: cover`).

---

## Requirements

### Requirement 1: Sticky Canvas Scrollytelling Container

**User Story:** As a site visitor, I want the hero section to be visually immersive and scroll-linked, so that I experience a cinematic camera flight as I scroll down the page.

#### Acceptance Criteria

1. THE `BuildingScroll` SHALL render an outer container element with a minimum height of `400vh` to provide sufficient scroll distance for the full 120-frame sequence.
2. THE `BuildingScroll` SHALL render a `<canvas>` element with `position: sticky` and `top: 0`, occupying the full viewport width and height (`100vw × 100vh`), so the building image remains centred in view while the user scrolls through the outer container.
3. WHEN the component mounts in a browser environment, THE `BuildingScroll` SHALL read `window.devicePixelRatio` and set the Canvas internal resolution to `(viewport width × DPR) × (viewport height × DPR)`, while keeping the CSS display size at `100vw × 100vh`, to prevent blurry rendering on high-density displays.
4. WHEN the browser window is resized, THE `BuildingScroll` SHALL recalculate the Canvas dimensions within 200 ms of the resize event ending (debounced) and re-draw the current Frame at the new size.
5. THE `BuildingScroll` SHALL be a `"use client"` component so that it does not execute on the server, preventing hydration mismatches from browser-only APIs (`window`, `requestAnimationFrame`, Canvas).

---

### Requirement 2: Image Sequence Loading

**User Story:** As a site visitor, I want the animation to begin only after all images are ready, so that I never see a blank canvas or frame flicker during the ascent.

#### Acceptance Criteria

1. THE `BuildingScroll` SHALL preload exactly 120 image assets, constructing each path as `/shard/shard_frame_{N}.webp` where N is an integer from 0 to 119 inclusive.
2. WHILE any Frame has not yet completed decoding, THE `BuildingScroll` SHALL display the `LoadingState` overlay — a centred spinner and the text "Rendering ascent…" — positioned above the Canvas using `position: absolute` with `z-index` higher than the Canvas.
3. WHEN all 120 Frames have loaded successfully, THE `BuildingScroll` SHALL remove the `LoadingState` overlay and draw Frame 0 on the Canvas immediately, with no visible flash.
4. IF any individual Frame fails to load, THE `BuildingScroll` SHALL log a warning to the browser console identifying the failed Frame path, and SHALL continue loading the remaining Frames rather than halting the sequence.
5. THE `BuildingScroll` SHALL use the `Image.decode()` API (or equivalent `onload` callbacks) to ensure each Frame is fully decoded before marking it as ready, preventing partial-image draws.

---

### Requirement 3: Scroll-to-Frame Mapping

**User Story:** As a site visitor, I want the image sequence to advance smoothly and precisely in response to my scroll position, so that the animation feels physically coupled to my input.

#### Acceptance Criteria

1. THE `BuildingScroll` SHALL use Framer Motion's `useScroll` hook, targeting the outer container element as the scroll target, to obtain a `ScrollProgress` value that transitions from 0 to 1 as the user scrolls through the full `400vh` height.
2. WHEN `ScrollProgress` changes, THE `BuildingScroll` SHALL compute the target Frame index as `Math.round(ScrollProgress × 119)`, clamped to the integer range [0, 119].
3. WHEN `ScrollProgress` changes and the computed Frame index differs from the previously drawn Frame index, THE `BuildingScroll` SHALL schedule a Canvas redraw via `requestAnimationFrame`, drawing the new Frame using Cover-fit scaling.
4. WHEN `ScrollProgress` changes and the computed Frame index equals the previously drawn Frame index, THE `BuildingScroll` SHALL skip the Canvas redraw to avoid redundant GPU operations.
5. THE `BuildingScroll` SHALL implement Cover-fit drawing by computing scale and offset values from the image's intrinsic dimensions and the Canvas's current pixel dimensions, then calling `ctx.drawImage` with the derived parameters so the building spire remains horizontally centred at all viewport sizes.

---

### Requirement 4: Story Text Overlays

**User Story:** As a site visitor, I want editorial text to appear and disappear at meaningful points in the ascent, so that the animation tells a coherent visual story about the building.

#### Acceptance Criteria

1. THE `BuildingScroll` SHALL render four `StoryOverlay` panels with the following copy and `ScrollProgress` entry thresholds:

   | Panel | Headline | Sub-copy | Entry threshold | Exit threshold | Alignment |
   |-------|----------|----------|-----------------|----------------|-----------|
   | 1 | "The Monolith." | "Rising above the clouds." | 0.00 | 0.20 | Centred |
   | 2 | "Faceted Glass." | "Catching the golden hour light." | 0.30 | 0.55 | Left-aligned |
   | 3 | "Precision Geometry." | "Engineering at absolute scale." | 0.65 | 0.85 | Right-aligned |
   | 4 | "The Pinnacle." | "Scroll back to descend." | 0.95 | 1.00 | Centred |

2. WHEN `ScrollProgress` enters a `StoryOverlay`'s active range (≥ entry threshold AND < exit threshold), THE `BuildingScroll` SHALL animate that overlay's opacity from 0 to 1 and its vertical offset from `+15px` to `0px` over 400 ms using a smooth easing function.
3. WHEN `ScrollProgress` leaves a `StoryOverlay`'s active range, THE `BuildingScroll` SHALL animate that overlay's opacity from 1 to 0 and its vertical offset from `0px` to `-15px` over 300 ms.
4. THE `BuildingScroll` SHALL position all `StoryOverlay` panels using `position: absolute` with `pointer-events: none` and a `z-index` value above the Canvas, so the building's central spire region is never occluded by text.
5. WHEN the device viewport width is less than 768 px, THE `BuildingScroll` SHALL reposition left-aligned overlays to bottom-left and right-aligned overlays to bottom-right, ensuring text does not overlap the spire on narrow screens.

---

### Requirement 5: Visual Theme — Fog / Editorial Light

**User Story:** As a product owner, I want the scrollytelling section to match the premium architectural fog aesthetic of the image sequence, so that the UI framing feels cohesive with the photography.

#### Acceptance Criteria

1. THE `BuildingScroll` outer container SHALL have a background colour of `#F3F4F6` (Tailwind `gray-100`) applied before any Frame loads, so that the mist colour is visible immediately with zero CLS.
2. THE `BuildingScroll` headline text SHALL use `font-family: Inter, ui-sans-serif` (falling back to system sans-serif), `font-weight: 700`, `letter-spacing: -0.03em`, and colour `rgba(0, 0, 0, 0.90)` to achieve the minimal geometric editorial look.
3. THE `BuildingScroll` sub-copy text SHALL use the same typeface, `font-weight: 400`, and colour `rgba(0, 0, 0, 0.60)`.
4. THE `BuildingScroll` SHALL apply no gradient overlays on the Canvas layer, preserving the raw photographic tones of each Frame.
5. WHERE the system or user has configured a reduced-motion preference (`prefers-reduced-motion: reduce`), THE `BuildingScroll` SHALL display only the first Frame statically and hide all `StoryOverlay` animations, ensuring accessibility without removing content.

---

### Requirement 6: Performance and Layout Stability

**User Story:** As a site owner, I want the scrollytelling section to load without layout shift and animate without jank, so that the page scores well on Core Web Vitals and provides a premium experience.

#### Acceptance Criteria

1. THE `BuildingScroll` outer container SHALL declare an explicit `height: 400vh` in its inline style or CSS class at initial render, before any JavaScript executes, so the document flow is established immediately and CLS equals 0.
2. THE Canvas element SHALL use `will-change: transform` to promote it to its own compositor layer, enabling GPU-backed repaints without triggering main-thread layout.
3. WHEN the browser tab is hidden (`document.visibilityState === "hidden"`), THE `BuildingScroll` SHALL cancel any pending `requestAnimationFrame` calls and resume them only when the tab becomes visible again.
4. THE `BuildingScroll` SHALL clean up all event listeners, `requestAnimationFrame` handles, and Framer Motion subscriptions when the component unmounts, preventing memory leaks.
5. WHEN rendered on a mobile viewport (width < 768 px), THE `BuildingScroll` Canvas SHALL maintain Cover-fit so that the building spire is fully visible and centred, with no horizontal scroll introduced.

---

### Requirement 7: Hero Section Replacement

**User Story:** As a developer, I want the existing video-based hero section in `app/page.tsx` replaced with the `BuildingScroll` component, so that the new scrollytelling animation serves as the primary landing experience.

#### Acceptance Criteria

1. THE `HomePage` component SHALL import and render `BuildingScroll` in place of the existing `<section>` element that contains the `<video>` background, the gradient overlays, and the `<Hero3D>` wrapper.
2. THE `BuildingScroll` SHALL be imported using `next/dynamic` with `ssr: false` to ensure the Canvas and scroll APIs are only initialised client-side, preserving server-render performance.
3. WHEN `BuildingScroll` is loading (dynamic import in progress), THE `HomePage` SHALL render a placeholder `<div>` with `height: 100vh` and `background-color: #F3F4F6` to prevent CLS.
4. THE existing `ScrollStoryVideo` section and all other sections below the hero SHALL remain unmodified in `page.tsx`.
5. THE `globals.css` file SHALL be updated to include a `.scrollytelling-hero` class with `background: #F3F4F6` and `overflow: hidden`, and any font imports required by the fog theme (Inter via Google Fonts or `next/font`).
