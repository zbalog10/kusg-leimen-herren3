// All editable content lives in this file. Add, remove, or edit entries below —
// the pages render automatically from these arrays. See README.md for the
// diagram coordinate format (x/y both run 0-100, hoop at y=0).

const TRAINING_PLANS = [
  {
    id: "week1-defense",
    title: "Week 1 · Session 1 — Defensive Fundamentals",
    date: "2026-08-25",
    category: "Defense",
    duration: "90 min",
    objective: "Rebuild individual defensive stance, closeouts, and help-side positioning before installing team defense.",
    warmup: "10 min dynamic stretching + defensive slide ladder",
    drills: [
      { name: "Stance & Slide", time: "10 min", desc: "Continuous defensive slides along the baseline, focus on low center of gravity and not crossing feet." },
      { name: "Closeout Drill", time: "15 min", desc: "Partner passes from the top, defender closes out under control, hand up, contest without fouling." },
      { name: "Shell Drill (4-on-4)", time: "20 min", desc: "Half-court shell, ball reversals, focus on help-side rotation and denying the pass to the strong-side wing." },
      { name: "1-on-1 Closeout to Live", time: "15 min", desc: "Closeout drill that transitions into live 1-on-1, offense can drive or shoot." },
    ],
    notes: "Bring both jerseys — expect live scrimmage segments. Keep an eye on transition defense sprint effort.",
  },
  {
    id: "week1-offense",
    title: "Week 1 · Session 2 — Motion Offense Install",
    date: "2026-08-27",
    category: "Offense",
    duration: "90 min",
    objective: "Introduce spacing principles and the first two reads of our motion offense.",
    warmup: "10 min pass-and-cut shooting warmup",
    drills: [
      { name: "5-Man Spacing Walkthrough", time: "15 min", desc: "Walk through floor spacing at 0% speed, correct positioning on ball reversal." },
      { name: "Give-and-Go Reads", time: "20 min", desc: "3-on-0 then 3-on-2, focus on cutting hard to the rim after the pass." },
      { name: "Pin-Down to Catch-and-Shoot", time: "20 min", desc: "Screen-the-screener action ending in a catch-and-shoot 3 or a curl to the rim." },
      { name: "Live 5-on-5 Half Court", time: "20 min", desc: "Run the offense live against a token defense, coach stops for reads." },
    ],
    notes: "Focus on decision-making speed, not perfect execution yet.",
  },
  {
    id: "week2-conditioning",
    title: "Week 2 · Session 1 — Conditioning & Shooting",
    date: "2026-09-01",
    category: "Conditioning",
    duration: "75 min",
    objective: "Build game-speed conditioning while keeping shot mechanics sharp under fatigue.",
    warmup: "5 min jog + dynamic mobility",
    drills: [
      { name: "17s (suicides)", time: "10 min", desc: "Line conditioning, target time per rep posted on the board." },
      { name: "Shooting Circuit", time: "25 min", desc: "5 spots, catch-and-shoot, 2 makes per spot before rotating, track team total." },
      { name: "Full-Court 3-on-2 / 2-on-1", time: "20 min", desc: "Continuous transition drill, sprint back on defense after each rep." },
      { name: "Free Throws Under Fatigue", time: "10 min", desc: "Immediately after sprints, 1-and-1 free throw pressure reps." },
    ],
    notes: "Hydration breaks every 15 minutes — late August heat.",
  },
];

// Player numbering convention for diagrams: 1 = point guard, 2 = shooting guard,
// 3 = small forward, 4 = power forward, 5 = center.
const SET_PLAYS = [
  {
    id: "horns-elbow-get",
    name: "Horns Elbow Get",
    category: "Half-Court Offense",
    description: "Horns alignment used to get our best shooter a catch-and-shoot look off a pin-down, with a rim-run counter if the defense switches.",
    keyPoints: [
      "1 reverses to 4 at the elbow, then cuts off 5's screen.",
      "3 relocates from the corner off a pin-down set by 5.",
      "If X5 switches onto 3, 5 rolls hard to the rim for the lob/dump-off.",
    ],
    diagram: {
      players: [
        { id: "1", label: "1", x: 50, y: 85 },
        { id: "2", label: "2", x: 6, y: 15 },
        { id: "3", label: "3", x: 94, y: 15 },
        { id: "4", label: "4", x: 38, y: 55 },
        { id: "5", label: "5", x: 62, y: 55 },
      ],
      actions: [
        { type: "pass", from: { x: 50, y: 85 }, to: { x: 38, y: 55 } },
        { type: "cut", path: [{ x: 50, y: 85 }, { x: 55, y: 60 }, { x: 66, y: 45 }] },
        { type: "screen", at: { x: 62, y: 55 }, angle: 90 },
        { type: "cut", path: [{ x: 94, y: 15 }, { x: 70, y: 30 }, { x: 55, y: 30 }] },
        { type: "screen", at: { x: 70, y: 30 }, angle: 0 },
      ],
    },
  },
  {
    id: "zipper-flare",
    name: "Zipper Flare",
    category: "Half-Court Offense",
    description: "Quick-hitter to spring 2 for a three off a zipper cut, with a flare screen counter if the defense chases too hard.",
    keyPoints: [
      "2 starts in the dunker spot and sprints off 4's zipper screen to the top.",
      "If X2 fights over the top, 5 flares 2 out to the wing for a three.",
      "1 always looks to hit the open shooter first, drive-and-kick as backup.",
    ],
    diagram: {
      players: [
        { id: "1", label: "1", x: 50, y: 85 },
        { id: "2", label: "2", x: 44, y: 8 },
        { id: "3", label: "3", x: 6, y: 20 },
        { id: "4", label: "4", x: 34, y: 25 },
        { id: "5", label: "5", x: 66, y: 25 },
      ],
      actions: [
        { type: "screen", at: { x: 34, y: 25 }, angle: 90 },
        { type: "cut", path: [{ x: 44, y: 8 }, { x: 40, y: 30 }, { x: 45, y: 60 }] },
        { type: "pass", from: { x: 50, y: 85 }, to: { x: 45, y: 60 } },
      ],
    },
  },
  {
    id: "box-elevator",
    name: "Box Elevator",
    category: "Out of Bounds (BLOB)",
    description: "Baseline out-of-bounds set from a box alignment, springing our shooter through an elevator screen for a clean catch-and-shoot three.",
    keyPoints: [
      "4 and 5 stand as the elevator doors, tight together at the free-throw line.",
      "2 curls hard through the elevator, doors close behind them.",
      "1 inbounds and reads the rim-runner (3) as the second option.",
    ],
    diagram: {
      players: [
        { id: "1", label: "1", x: 50, y: 2 },
        { id: "2", label: "2", x: 20, y: 20 },
        { id: "3", label: "3", x: 80, y: 20 },
        { id: "4", label: "4", x: 44, y: 40 },
        { id: "5", label: "5", x: 56, y: 40 },
      ],
      actions: [
        { type: "cut", path: [{ x: 20, y: 20 }, { x: 50, y: 40 }, { x: 50, y: 55 }] },
        { type: "screen", at: { x: 44, y: 40 }, angle: 90 },
        { type: "screen", at: { x: 56, y: 40 }, angle: 90 },
        { type: "pass", from: { x: 50, y: 2 }, to: { x: 50, y: 55 } },
      ],
    },
  },
];
