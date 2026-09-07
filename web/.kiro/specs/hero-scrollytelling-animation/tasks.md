# Implementation Plan: Hero Scrollytelling Animation

## Overview

Implement the scroll-linked canvas animation that replaces the existing video hero. Work proceeds in three
logical phases: (1) pure utility functions and types that can be tested in isolation, (2) the
`BuildingScroll` client component with all canvas / scroll / overlay logic, and (3) wiring the component
into `page.tsx` and `globals.css`.

## Tasks

- [x] 1. Create utility functions for frame-index computation and cover-fit drawing
  - Create `web/src/components/BuildingScroll.tsx` (skeleton — `"use client"` directive, named exports only, no JSX yet)
  - Export a pure `frameIndex(scrollProgress: number): number` function that computes `clamp(Math.round(scrollProgress * 119), 0, 119)`
  - Export a pure `coverFit(canvasW: number, canvasH: number, imgW: number, imgH: number)` function that returns `{ scale, drawW, drawH, offsetX, offsetY }` using the design's cover-fit formula
  - Export a pure `isOverlayActive(scrollProgress: number, entry: number, exit: number): boolean` predicate
  - _Requirements: 3.2, 3.5, 4.2_

  - [ ]* 1.1 Write property test for `frameIndex` (Property 1 & 4)
    - Install `fast-check` as a dev dependency (`npm install --save-dev fast-check`)
    - Create `web/src/components/__tests__/buildingScroll.properties.test.ts`
    - **Property 1: Frame index stays in bounds for any scroll progress**
    - **Validates: Requirements 3.2**
    - **Property 4: Frame index is monotonically consistent with scroll direction**
    - **Validates: Requirements 3.2, 3.3**

  - [ ]* 1.2 Write property test for `coverFit` (Property 2)
    - Add to `web/src/components/__tests__/buildingScroll.properties.test.ts`
    - **Property 2: Cover-fit preserves full canvas coverage**
    - **Validates: Requirements 3.5, 6.5**

  - [ ]* 1.3 Write property test for `isOverlayActive` (Property 3)
    - Add to `web/src/components/__tests__/buildingScroll.properties.test.ts`
    - **Property 3: Overlay active range is disjoint from inactive range**
    - **Validates: Requirements 4.2, 4.3**

  - [ ]* 1.4 Write unit tests for utility functions
    - Create `web/src/components/__tests__/buildingScroll.unit.test.ts`
    - Test `frameIndex(0)` → 0, `frameIndex(1)` → 119, `frameIndex(0.5)` → 60
    - Test `coverFit(800, 600, 1920, 1080)` covers full canvas and `coverFit(1920, 1080, 800, 600)` covers full canvas
    - _Requirements: 3.2, 3.5_

- [x] 2. Implement `useImageSequence` hook and `LoadingState` UI
  - Add the `useImageSequence` internal hook inside `BuildingScroll.tsx`; preloads `/shard/shard_frame_{N}.webp` for N 0–119 using `Image.decode()`
  - Track `loaded: boolean` and `error: string | null` state; individual frame load failures write `console.warn` and continue — do not halt
  - Implement the `LoadingState` overlay JSX: centred spinner + "Rendering ascent…" label, `position: absolute`, `z-index` above canvas
  - Export `StoryPanel` interface and `STORY_PANELS` constant array matching the four panels in the design
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]* 2.1 Write unit tests for `useImageSequence` loading behaviour
    - Test LoadingState renders before frames are ready
    - Test `onError` for one frame logs a warning and continues loading
    - Mock browser `Image` / `decode` APIs as needed
    - _Requirements: 2.2, 2.4_

- [x] 3. Checkpoint — Ensure all utility and hook tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement the `BuildingScroll` component — canvas rendering and scroll subscription
  - Build the full JSX skeleton: outer `400vh` container, sticky `<canvas>`, absolute overlay container
  - Wire `useScroll` (Framer Motion) to the outer container ref to get `scrollYProgress`
  - Wire `useTransform` to map `scrollYProgress` → `frameIndex` (0–119)
  - Subscribe to `frameIndex` changes and schedule `requestAnimationFrame` draws using the `coverFit` helper; skip redraw when frame index is unchanged
  - Implement DPR-aware canvas sizing on mount (`window.devicePixelRatio`) and a debounced (200 ms) resize handler that recalculates dimensions and redraws the current frame
  - Handle tab visibility: cancel rAF on `hidden`, resume on `visible`
  - Clean up all listeners, subscriptions, and rAF handles on unmount (use `isCancelled` flag for async decode callbacks)
  - Apply `will-change: transform` to the canvas element
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 3.1, 3.2, 3.3, 3.4, 3.5, 6.1, 6.2, 6.3, 6.4_

  - [ ]* 4.1 Write property test for DPR canvas sizing (Property 5)
    - Add to `web/src/components/__tests__/buildingScroll.properties.test.ts`
    - **Property 5: Canvas pixel dimensions scale linearly with DPR**
    - **Validates: Requirements 1.3**

- [x] 5. Implement `StoryOverlay` panels with Framer Motion animations
  - Render all four `STORY_PANELS` as `motion.div` elements inside the overlay container
  - Drive `opacity` (0 → 1, entry 400 ms / exit 300 ms) and `y` (+15 px → 0 px entry, 0 px → −15 px exit) via Framer Motion `animate` prop based on `isOverlayActive`
  - Apply alignment styles: centred (panels 1 & 4), left (panel 2), right (panel 3)
  - On viewports < 768 px, reposition left-aligned to bottom-left and right-aligned to bottom-right
  - Apply headline typography: `font-family: Inter, ui-sans-serif`, `font-weight: 700`, `letter-spacing: -0.03em`, `color: rgba(0,0,0,0.90)`
  - Apply sub-copy typography: same typeface, `font-weight: 400`, `color: rgba(0,0,0,0.60)`
  - Set `pointer-events: none` and `z-index` above canvas on overlay container
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.2, 5.3_

  - [ ]* 5.1 Write unit tests for overlay visibility logic
    - Test that overlays are hidden when `prefers-reduced-motion` is active (only Panel 1 static, opacity 1)
    - Test that individual panels animate in and out at their configured thresholds
    - _Requirements: 4.2, 4.3, 5.5_

- [x] 6. Implement reduced-motion accessibility behaviour
  - Use `useReducedMotion()` from Framer Motion inside `BuildingScroll`
  - When `true`: lock frame index to 0 (skip all `drawImage` updates driven by scroll), render Panel 1 statically at opacity 1, suppress all overlay motion animations
  - _Requirements: 5.5_

- [x] 7. Checkpoint — Ensure all component tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Wire `BuildingScroll` into `page.tsx` and `globals.css`
  - In `web/src/app/page.tsx`: add `import dynamic from "next/dynamic"` and a dynamic import of `BuildingScroll` with `ssr: false` and a loading placeholder `<div style={{ height: "100vh", backgroundColor: "#F3F4F6" }} />`
  - Remove the existing `<section>` block containing the `<video>` background, gradient overlays, and `<Hero3D>` component
  - Insert `<BuildingScroll />` in its place; leave `ScrollStoryVideo` and all sections below untouched
  - In `web/src/app/globals.css`: add `.scrollytelling-hero { background: #F3F4F6; overflow: hidden; }`
  - Apply `className="scrollytelling-hero"` to the `BuildingScroll` outer container (or its wrapper in `page.tsx`)
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 5.1, 6.1_

  - [ ]* 8.1 Write integration smoke test for the wired page
    - Verify `BuildingScroll` is rendered in place of the old video hero
    - Verify the loading placeholder is rendered while the dynamic import resolves
    - Verify `ScrollStoryVideo` and sections below remain present in the DOM
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 9. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests require `fast-check` (dev dependency) — install it as part of task 1.1
- Unit tests use Vitest + React Testing Library, which are already available in the project
- Checkpoints at tasks 3, 7, and 9 provide natural review breakpoints before moving to the next phase
