/* ═══════════════════════════════════════════════════════════════════════════
   UI TUNING — psychophysics of every interactive element, in one place.

   JS-side "feel" numbers live here. Their CSS-side twins (scroll-snap
   resistance, backdrop texture, nav height) live in src/index.css under the
   ":root — UI TUNING" block. Tweak, save, hot-reload.
   ═══════════════════════════════════════════════════════════════════════════ */

export const UI_CONFIG = {
  /* ───────────────────────────────────────────────────────────────────────
     DRAGGABLE BUSINESS CARDS  (components/CardStack.jsx)

     The visible card is spring-chased off an invisible layer that tracks the
     cursor 1:1, so these numbers decide how heavily it lags and settles.
     ─────────────────────────────────────────────────────────────────────── */
  cardDrag: {
    mass: 1.3, //  inertia. Higher = heavier, floatier, more overshoot.
    stiffness: 300, //  pull toward the cursor. Higher = snappier, less trailing.
    damping: 30, //  friction on the spring. Higher = less wobble on release.

    tiltMaxDeg: 11, //  max lean the card takes in its direction of travel.
    tiltAtVelocity: 1600, //  drag speed (px/s) at which that max tilt is reached.

    hoverScale: 1.04, //  card scale while it is being held.

    releaseGlide: {
      //  Inertial throw after you let go (Framer Motion dragTransition).
      power: 0.3, //  0 = stops dead where dropped. ~0.8 = skates a long way.
      timeConstant: 360, //  ms. Decay time of that glide — higher = longer skid.
    },

    trashFlyMs: 320, //  shrink-into-bin animation length before the card is removed.
    trashHitPadPx: 40, //  how far outside the bin still counts as "over the bin".
  },

  /* ───────────────────────────────────────────────────────────────────────
     PAGE TRANSITION — PHASE 1: THE WIPE  (components/PageTransition.jsx)

     One ink-black sheet is "dragged" in from the right with visible effort:
     it eases up to stop1%, drifts through a short pause, is hauled to stop2%,
     drifts again, then flows home to full cover. It nudges a hair PAST each
     stop and eases back on — just enough to read as weight, not a spring.
     All durations in milliseconds.
     ─────────────────────────────────────────────────────────────────────── */
  wipe: {
    stop1Pct: 32, //     screen coverage the burst is aiming for.
    stop2Pct: 67, //     screen coverage the haul is aiming for.
    overshootPct: 1.8, // how far the leading edge slips PAST each stop before easing back (keep small).
    settleDriftPct: 1.5, // gentle relaxation back during each pause (tension release, not a freeze).

    burstMs: 250, //     0%  → past stop1   (quick launch, eased)
    bounceMs: 440, //    ease back onto the stop   (used at BOTH stops)
    pause1Ms: 60, //     short settle at stop1
    dragMs: 350, //      stop1 → past stop2   (laboured haul)
    pause2Ms: 80, //     short settle at stop2
    finalMs: 350, //     stop2 → 100%   (smooth committed flow home)

    // Per-segment easing (cubic-bezier control points; y just over 1 = a slight overshoot).
    easeBurst: [0.22, 0.75, 0.32, 1], //  ease in, decelerate onto the overshoot.
    easeBounce: [0.4, 1.06, 0.4, 1], //   settle back onto the stop with a barely-there overshoot.
    easeRelax: [0.4, 0.0, 0.35, 1], //    soft drift during the pause.
    easeDrag: [0.5, 0.0, 0.32, 1], //     effortful but flowing (not a grind).
    easeFinal: [0.36, 0.0, 0.22, 1], //   accelerate, then ease home into full cover.
  },

  /* ───────────────────────────────────────────────────────────────────────
     PAGE TRANSITION — PHASE 2: THE CURTAIN  (components/PageTransition.jsx)

     Once covered, the sheet splits down the exact middle and opens out.
     ─────────────────────────────────────────────────────────────────────── */
  curtain: {
    holdMs: 180, //     fully-black pause while the new page mounts underneath.
    durationMs: 520, //  split + slide the two halves off both edges.
    ease: [0.62, 0, 0.2, 1],
  },
}
