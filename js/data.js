// All editable content lives in this file. Add, remove, or edit entries below —
// the pages render automatically from these arrays. See README.md for the
// diagram coordinate format (x/y both run 0-100 as % of the court's own
// width/length, hoop at y=0; the free-throw line sits at y=41.4).

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
    id: "box-elbow-curl",
    name: "Box Elbow Curl",
    category: "Out of Bounds (SLOB)",
    description: "Sideline out-of-bounds set from a box alignment: 3 clears baseline off a screen from 4 as a decoy, while 2 fakes toward the ball outside the three-point line before curling off a back screen from 5 and cutting across the lane to finish on the weak side, away from the traffic on the strong side.",
    keyPoints: [
      "1 inbounds from the sideline.",
      "4 sets a baseline screen for 3, who cuts from the block to the far corner as the decoy/second option.",
      "2 leaves the elbow and cuts toward the ball, staying outside the three-point line, faking like he wants the catch.",
      "5 follows and sets a back screen; 2 curls around it and cuts across the lane to the weak side.",
      "1 hits 2 cutting to the weak-side rim for the score.",
    ],
    diagram: {
      players: [
        { id: "1", label: "1", x: -4, y: 55 },
        { id: "2", label: "2", x: 34, y: 40 },
        { id: "3", label: "3", x: 68, y: 8 },
        { id: "4", label: "4", x: 29, y: 10 },
        { id: "5", label: "5", x: 66, y: 41 },
      ],
      actions: [
        { type: "screen", at: { x: 29, y: 10 }, angle: 90 },
        { type: "cut", path: [{ x: 68, y: 8 }, { x: 38, y: 3 }, { x: 3, y: 3 }] },
        { type: "cut", path: [{ x: 66, y: 41 }, { x: 45, y: 50 }, { x: 20, y: 58 }] },
        { type: "screen", at: { x: 20, y: 58 }, angle: 90 },
        { type: "cut", path: [{ x: 34, y: 40 }, { x: 22, y: 46 }, { x: 14, y: 50 }, { x: 22, y: 68 }, { x: 42, y: 42 }, { x: 62, y: 10 }] },
        { type: "pass", from: { x: -4, y: 55 }, to: { x: 62, y: 10 } },
      ],
    },
    // Step-by-step breakdown for the play detail page. Each step's `players`
    // are positions as of the END of that step (so earlier steps' movement
    // is already reflected), and `actions` are only the arrows that happen
    // during that step, keeping each diagram focused on one beat of the play.
    steps: [
      {
        title: "Initial Alignment",
        narrative: "Box set: 4 and 3 on the blocks, 2 and 5 at the elbows. 1 takes the ball out of bounds on the sideline.",
        players: [
          { id: "1", label: "1", x: -4, y: 55 },
          { id: "2", label: "2", x: 34, y: 40 },
          { id: "3", label: "3", x: 68, y: 8 },
          { id: "4", label: "4", x: 29, y: 10 },
          { id: "5", label: "5", x: 66, y: 41 },
        ],
        actions: [],
      },
      {
        title: "Baseline Screen & Decoy Relocate",
        narrative: "4 sets a baseline screen; 3 cuts off it from the block to the far corner as the decoy. At the same time, 2 leaves the elbow and cuts toward the ball, staying outside the three-point line, faking like he wants the catch.",
        players: [
          { id: "1", label: "1", x: -4, y: 55 },
          { id: "2", label: "2", x: 14, y: 50 },
          { id: "3", label: "3", x: 3, y: 3 },
          { id: "4", label: "4", x: 29, y: 10 },
          { id: "5", label: "5", x: 66, y: 41 },
        ],
        actions: [
          { type: "screen", at: { x: 29, y: 10 }, angle: 90 },
          { type: "cut", path: [{ x: 68, y: 8 }, { x: 38, y: 3 }, { x: 3, y: 3 }] },
          { type: "cut", path: [{ x: 34, y: 40 }, { x: 22, y: 46 }, { x: 14, y: 50 }] },
        ],
      },
      {
        title: "Back Screen",
        narrative: "5 follows behind 2 and sets a back screen just above him, freeing him from the defender chasing the fake catch.",
        players: [
          { id: "1", label: "1", x: -4, y: 55 },
          { id: "2", label: "2", x: 14, y: 50 },
          { id: "3", label: "3", x: 3, y: 3 },
          { id: "4", label: "4", x: 29, y: 10 },
          { id: "5", label: "5", x: 20, y: 58 },
        ],
        actions: [
          { type: "cut", path: [{ x: 66, y: 41 }, { x: 45, y: 50 }, { x: 20, y: 58 }] },
          { type: "screen", at: { x: 20, y: 58 }, angle: 90 },
        ],
      },
      {
        title: "Curl to the Rim",
        narrative: "2 curls off the back screen and cuts hard across the lane to finish on the weak side, away from the crowd the screen and baseline cut left on the strong side.",
        players: [
          { id: "1", label: "1", x: -4, y: 55 },
          { id: "2", label: "2", x: 62, y: 10 },
          { id: "3", label: "3", x: 3, y: 3 },
          { id: "4", label: "4", x: 29, y: 10 },
          { id: "5", label: "5", x: 20, y: 58 },
        ],
        actions: [
          { type: "cut", path: [{ x: 14, y: 50 }, { x: 22, y: 68 }, { x: 42, y: 42 }, { x: 62, y: 10 }] },
        ],
      },
      {
        title: "Inbound Pass & Score",
        narrative: "1 delivers the pass to 2 cutting to the weak-side rim for the finish.",
        players: [
          { id: "1", label: "1", x: -4, y: 55 },
          { id: "2", label: "2", x: 62, y: 10 },
          { id: "3", label: "3", x: 3, y: 3 },
          { id: "4", label: "4", x: 29, y: 10 },
          { id: "5", label: "5", x: 20, y: 58 },
        ],
        actions: [
          { type: "pass", from: { x: -4, y: 55 }, to: { x: 62, y: 10 } },
        ],
      },
    ],
  },
  {
    id: "baseline-post-cross",
    name: "Baseline Post Cross",
    category: "Out of Bounds (BLOB)",
    description: "Baseline out-of-bounds set: 4 comes up to screen for 2 at the free-throw line, then 5 screens the screener — 4 curls off it to arrive slightly on the weak side for the catch and score, while 2 clears to the corner off the first screen.",
    keyPoints: [
      "1 inbounds from under the basket.",
      "4 cuts up from the block to the free-throw line and screens for 2.",
      "2 cuts off the screen toward the baseline, then redirects out to the corner. 3 clears from the right elbow to the top.",
      "5 comes across to screen the screener — 4 curls off it and arrives slightly on the weak side.",
      "1 hits 4 on the weak side for the score. Backup option: instead of screening, 5 can slip straight to the basket from the free-throw line for a quick score.",
    ],
    diagram: {
      players: [
        { id: "1", label: "1", x: 9, y: -3 },
        { id: "2", label: "2", x: 29, y: 41 },
        { id: "3", label: "3", x: 67, y: 41 },
        { id: "4", label: "4", x: 29, y: 6 },
        { id: "5", label: "5", x: 72, y: 7 },
      ],
      actions: [
        { type: "cut", path: [{ x: 67, y: 41 }, { x: 61, y: 65 }] },
        { type: "cut", path: [{ x: 29, y: 6 }, { x: 29, y: 36 }] },
        { type: "screen", at: { x: 29, y: 36 }, angle: 0 },
        { type: "cut", path: [{ x: 29, y: 41 }, { x: 27, y: 14 }, { x: -5, y: 24 }] },
        { type: "cut", path: [{ x: 72, y: 7 }, { x: 40, y: 30 }] },
        { type: "screen", at: { x: 40, y: 30 }, angle: 135 },
        { type: "cut", path: [{ x: 29, y: 36 }, { x: 38, y: 32 }, { x: 56, y: 24 }] },
        { type: "pass", from: { x: 9, y: -3 }, to: { x: 56, y: 24 } },
        { type: "cut", path: [{ x: 56, y: 24 }, { x: 52, y: 10 }] },
      ],
    },
    steps: [
      {
        title: "Initial Alignment",
        narrative: "Box set on the baseline: 2 and 3 at the elbows, 4 and 5 on the blocks. 1 takes the ball out of bounds under the basket.",
        players: [
          { id: "1", label: "1", x: 9, y: -3 },
          { id: "2", label: "2", x: 29, y: 41 },
          { id: "3", label: "3", x: 67, y: 41 },
          { id: "4", label: "4", x: 29, y: 6 },
          { id: "5", label: "5", x: 72, y: 7 },
        ],
        actions: [],
      },
      {
        title: "Screen at the Elbow",
        narrative: "4 cuts up from the block to the free-throw line and sets a screen for 2. 3 begins clearing from the right elbow up to the top.",
        players: [
          { id: "1", label: "1", x: 9, y: -3 },
          { id: "2", label: "2", x: 29, y: 41 },
          { id: "3", label: "3", x: 61, y: 65 },
          { id: "4", label: "4", x: 29, y: 36 },
          { id: "5", label: "5", x: 72, y: 7 },
        ],
        actions: [
          { type: "cut", path: [{ x: 29, y: 6 }, { x: 29, y: 36 }] },
          { type: "screen", at: { x: 29, y: 36 }, angle: 0 },
          { type: "cut", path: [{ x: 67, y: 41 }, { x: 61, y: 65 }] },
        ],
      },
      {
        title: "2 Cuts, 5 Screens the Screener",
        narrative: "2 cuts off 4's screen toward the baseline, then redirects out to the corner. At the same time, 5 comes across to set a screen for 4 — the screener.",
        players: [
          { id: "1", label: "1", x: 9, y: -3 },
          { id: "2", label: "2", x: -5, y: 24 },
          { id: "3", label: "3", x: 61, y: 65 },
          { id: "4", label: "4", x: 29, y: 36 },
          { id: "5", label: "5", x: 40, y: 30 },
        ],
        actions: [
          { type: "cut", path: [{ x: 29, y: 41 }, { x: 27, y: 14 }, { x: -5, y: 24 }] },
          { type: "cut", path: [{ x: 72, y: 7 }, { x: 40, y: 30 }] },
          { type: "screen", at: { x: 40, y: 30 }, angle: 135 },
        ],
      },
      {
        title: "4 Curls to the Weak Side",
        narrative: "4 curls off 5's screen and pops out slightly on the weak side, looking for the catch.",
        players: [
          { id: "1", label: "1", x: 9, y: -3 },
          { id: "2", label: "2", x: -5, y: 24 },
          { id: "3", label: "3", x: 61, y: 65 },
          { id: "4", label: "4", x: 56, y: 24 },
          { id: "5", label: "5", x: 40, y: 30 },
        ],
        actions: [
          { type: "cut", path: [{ x: 29, y: 36 }, { x: 38, y: 32 }, { x: 56, y: 24 }] },
        ],
      },
      {
        title: "Inbound Pass",
        narrative: "1 hits 4, now open slightly on the weak side.",
        players: [
          { id: "1", label: "1", x: 9, y: -3 },
          { id: "2", label: "2", x: -5, y: 24 },
          { id: "3", label: "3", x: 61, y: 65 },
          { id: "4", label: "4", x: 56, y: 24 },
          { id: "5", label: "5", x: 40, y: 30 },
        ],
        actions: [
          { type: "pass", from: { x: 9, y: -3 }, to: { x: 56, y: 24 } },
        ],
      },
      {
        title: "Attack & Score",
        narrative: "4 catches in rhythm and attacks the rim for the finish.",
        players: [
          { id: "1", label: "1", x: 9, y: -3 },
          { id: "2", label: "2", x: -5, y: 24 },
          { id: "3", label: "3", x: 61, y: 65 },
          { id: "4", label: "4", x: 52, y: 10 },
          { id: "5", label: "5", x: 40, y: 30 },
        ],
        actions: [
          { type: "cut", path: [{ x: 56, y: 24 }, { x: 52, y: 10 }] },
        ],
      },
    ],
  },
  {
    id: "zone-attack-reversal",
    name: "Zone Attack Reversal",
    category: "Half-Court Offense",
    description: "Half-court entry against a 2-3 zone: a skip pass and ball reversal shift the defense before a baseline cut opens a short-corner score.",
    keyPoints: [
      "1 skip-passes to 3 on the wing, then fills behind it.",
      "3 reverses the ball back to 1 as 4 flashes to the high post.",
      "1 swings it back left as 2 clears to the corner, 3 drifts to the short corner, and 5 seals to the weak-side block.",
      "1 hits 3 in the short corner for the score.",
    ],
    diagram: {
      players: [
        { id: "1", label: "1", x: 49, y: 66 },
        { id: "2", label: "2", x: 6, y: 54 },
        { id: "3", label: "3", x: 92, y: 52 },
        { id: "4", label: "4", x: 29, y: 9 },
        { id: "5", label: "5", x: 75, y: 7 },
      ],
      actions: [
        { type: "pass", from: { x: 49, y: 66 }, to: { x: 92, y: 62 } },
        { type: "cut", path: [{ x: 49, y: 66 }, { x: 78, y: 61 }] },
        { type: "pass", from: { x: 92, y: 62 }, to: { x: 78, y: 61 } },
        { type: "cut", path: [{ x: 29, y: 9 }, { x: 63, y: 52 }] },
        { type: "cut", path: [{ x: 78, y: 61 }, { x: 30, y: 49 }] },
        { type: "cut", path: [{ x: 6, y: 54 }, { x: 3, y: 4 }] },
        { type: "cut", path: [{ x: 92, y: 62 }, { x: 66, y: 12 }] },
        { type: "cut", path: [{ x: 75, y: 7 }, { x: 24, y: 4 }] },
        { type: "pass", from: { x: 30, y: 49 }, to: { x: 66, y: 12 } },
        { type: "cut", path: [{ x: 66, y: 12 }, { x: 49, y: 7 }] },
      ],
    },
    steps: [
      {
        title: "Initial Alignment",
        narrative: "1-2-2 set against the 2-3 zone: 1 up top with the ball, 2 and 3 on the wings, 4 and 5 on the blocks.",
        players: [
          { id: "1", label: "1", x: 49, y: 66 },
          { id: "2", label: "2", x: 6, y: 54 },
          { id: "3", label: "3", x: 92, y: 52 },
          { id: "4", label: "4", x: 29, y: 9 },
          { id: "5", label: "5", x: 75, y: 7 },
        ],
        actions: [],
      },
      {
        title: "Skip Pass",
        narrative: "1 passes to 3, who lifts along the sideline to meet it above the zone's top defender. 1 fills in behind the pass.",
        players: [
          { id: "1", label: "1", x: 78, y: 61 },
          { id: "2", label: "2", x: 6, y: 54 },
          { id: "3", label: "3", x: 92, y: 62 },
          { id: "4", label: "4", x: 29, y: 9 },
          { id: "5", label: "5", x: 75, y: 7 },
        ],
        actions: [
          { type: "pass", from: { x: 49, y: 66 }, to: { x: 92, y: 62 } },
          { type: "cut", path: [{ x: 49, y: 66 }, { x: 78, y: 61 }] },
        ],
      },
      {
        title: "Reversal & Flash",
        narrative: "3 reverses the ball straight back to 1 as 4 flashes from the block to the high post, drawing the zone's attention to the middle.",
        players: [
          { id: "1", label: "1", x: 78, y: 61 },
          { id: "2", label: "2", x: 6, y: 54 },
          { id: "3", label: "3", x: 92, y: 62 },
          { id: "4", label: "4", x: 63, y: 52 },
          { id: "5", label: "5", x: 75, y: 7 },
        ],
        actions: [
          { type: "pass", from: { x: 92, y: 62 }, to: { x: 78, y: 61 } },
          { type: "cut", path: [{ x: 29, y: 9 }, { x: 63, y: 52 }] },
        ],
      },
      {
        title: "Reversal & Baseline Cuts",
        narrative: "1 dribbles the ball back to the left wing. 2 clears down to the weak-side corner, 3 drifts down into the short corner, and 5 seals across the baseline to the weak-side block.",
        players: [
          { id: "1", label: "1", x: 30, y: 49 },
          { id: "2", label: "2", x: 3, y: 4 },
          { id: "3", label: "3", x: 66, y: 12 },
          { id: "4", label: "4", x: 63, y: 52 },
          { id: "5", label: "5", x: 24, y: 4 },
        ],
        actions: [
          { type: "cut", path: [{ x: 78, y: 61 }, { x: 30, y: 49 }] },
          { type: "cut", path: [{ x: 6, y: 54 }, { x: 3, y: 4 }] },
          { type: "cut", path: [{ x: 92, y: 62 }, { x: 66, y: 12 }] },
          { type: "cut", path: [{ x: 75, y: 7 }, { x: 24, y: 4 }] },
        ],
      },
      {
        title: "Short Corner Score",
        narrative: "1 hits 3 in the short corner; 3 attacks the middle and finishes at the rim.",
        players: [
          { id: "1", label: "1", x: 30, y: 49 },
          { id: "2", label: "2", x: 3, y: 4 },
          { id: "3", label: "3", x: 49, y: 7 },
          { id: "4", label: "4", x: 63, y: 52 },
          { id: "5", label: "5", x: 24, y: 4 },
        ],
        actions: [
          { type: "pass", from: { x: 30, y: 49 }, to: { x: 66, y: 12 } },
          { type: "cut", path: [{ x: 66, y: 12 }, { x: 49, y: 7 }] },
        ],
      },
    ],
  },
  {
    id: "zoom-entry",
    name: "Zoom Entry",
    category: "Half-Court Offense",
    description: "Wing entry and ball reversal: a long cut across the baseline and up the opposite sideline springs a cutter for a catch in stride and a downhill drive.",
    keyPoints: [
      "1 dribbles toward the strong-side corner as 3 lifts up to the wing.",
      "1 enters the ball to 3; 2 drops down to fill the weak-side corner.",
      "4 makes a long cut from the corner, up the sideline and across the top, as 5 lifts to space the middle.",
      "3 hits 4 in stride at the top of the key; 4 attacks downhill and finishes at the rim.",
    ],
    diagram: {
      players: [
        { id: "1", label: "1", x: 78, y: 59 },
        { id: "2", label: "2", x: 22, y: 62 },
        { id: "3", label: "3", x: 96, y: 4 },
        { id: "4", label: "4", x: 4, y: 5 },
        { id: "5", label: "5", x: 27, y: 10 },
      ],
      actions: [
        { type: "cut", path: [{ x: 78, y: 59 }, { x: 97, y: 28 }] },
        { type: "cut", path: [{ x: 96, y: 4 }, { x: 92, y: 30 }] },
        { type: "pass", from: { x: 97, y: 28 }, to: { x: 92, y: 30 } },
        { type: "cut", path: [{ x: 22, y: 62 }, { x: 3, y: 9 }] },
        { type: "cut", path: [{ x: 4, y: 5 }, { x: 10, y: 45 }, { x: 37, y: 57 }] },
        { type: "cut", path: [{ x: 27, y: 10 }, { x: 39, y: 47 }] },
        { type: "pass", from: { x: 92, y: 30 }, to: { x: 37, y: 57 } },
        { type: "cut", path: [{ x: 37, y: 57 }, { x: 51, y: 9 }] },
      ],
    },
    steps: [
      {
        title: "Initial Alignment",
        narrative: "1 on the right wing with the ball, 2 on the opposite wing, 3 and 4 deep in the corners, 5 at the left block.",
        players: [
          { id: "1", label: "1", x: 78, y: 59 },
          { id: "2", label: "2", x: 22, y: 62 },
          { id: "3", label: "3", x: 96, y: 4 },
          { id: "4", label: "4", x: 4, y: 5 },
          { id: "5", label: "5", x: 27, y: 10 },
        ],
        actions: [],
      },
      {
        title: "Dribble & Lift",
        narrative: "1 dribbles toward the strong-side corner as 3 lifts up the sideline to meet the ball on the wing.",
        players: [
          { id: "1", label: "1", x: 97, y: 28 },
          { id: "2", label: "2", x: 22, y: 62 },
          { id: "3", label: "3", x: 92, y: 30 },
          { id: "4", label: "4", x: 4, y: 5 },
          { id: "5", label: "5", x: 27, y: 10 },
        ],
        actions: [
          { type: "cut", path: [{ x: 78, y: 59 }, { x: 97, y: 28 }] },
          { type: "cut", path: [{ x: 96, y: 4 }, { x: 92, y: 30 }] },
        ],
      },
      {
        title: "Entry Pass",
        narrative: "1 enters the ball to 3 on the wing. 2 drops down to fill the weak-side corner.",
        players: [
          { id: "1", label: "1", x: 97, y: 28 },
          { id: "2", label: "2", x: 3, y: 9 },
          { id: "3", label: "3", x: 92, y: 30 },
          { id: "4", label: "4", x: 4, y: 5 },
          { id: "5", label: "5", x: 27, y: 10 },
        ],
        actions: [
          { type: "pass", from: { x: 97, y: 28 }, to: { x: 92, y: 30 } },
          { type: "cut", path: [{ x: 22, y: 62 }, { x: 3, y: 9 }] },
        ],
      },
      {
        title: "Long Cut",
        narrative: "4 makes a long cut from the corner, up the sideline and across the top of the key, as 5 lifts from the block to space the middle.",
        players: [
          { id: "1", label: "1", x: 97, y: 28 },
          { id: "2", label: "2", x: 3, y: 9 },
          { id: "3", label: "3", x: 92, y: 30 },
          { id: "4", label: "4", x: 37, y: 57 },
          { id: "5", label: "5", x: 39, y: 47 },
        ],
        actions: [
          { type: "cut", path: [{ x: 4, y: 5 }, { x: 10, y: 45 }, { x: 37, y: 57 }] },
          { type: "cut", path: [{ x: 27, y: 10 }, { x: 39, y: 47 }] },
        ],
      },
      {
        title: "Reversal",
        narrative: "3 hits 4 in stride at the top of the key as the cut finishes.",
        players: [
          { id: "1", label: "1", x: 97, y: 28 },
          { id: "2", label: "2", x: 3, y: 9 },
          { id: "3", label: "3", x: 92, y: 30 },
          { id: "4", label: "4", x: 37, y: 57 },
          { id: "5", label: "5", x: 39, y: 47 },
        ],
        actions: [
          { type: "pass", from: { x: 92, y: 30 }, to: { x: 37, y: 57 } },
        ],
      },
      {
        title: "Drive & Score",
        narrative: "4 catches in rhythm and attacks downhill for the finish at the rim.",
        players: [
          { id: "1", label: "1", x: 97, y: 28 },
          { id: "2", label: "2", x: 3, y: 9 },
          { id: "3", label: "3", x: 92, y: 30 },
          { id: "4", label: "4", x: 51, y: 9 },
          { id: "5", label: "5", x: 39, y: 47 },
        ],
        actions: [
          { type: "cut", path: [{ x: 37, y: 57 }, { x: 51, y: 9 }] },
        ],
      },
    ],
  },
  {
    id: "4high-motion",
    name: "4-High Motion Continuity",
    category: "Half-Court Offense",
    description: "A repeating read-and-react motion pattern rather than a scripted set play — shown here as one full sequence through the continuity, ending in a rim finish. Use it to teach the spacing and cutting principles, not as a fixed script.",
    keyPoints: [
      "1 passes to 2, then clears through the middle to the opposite side.",
      "3 and 4 loop through the lane, exchanging wing and corner spots as the defense adjusts.",
      "1 continues cutting all the way down to the corner looking for the return pass.",
      "2 finds 1 in the corner; 1 quickly hits 5 sliding into the middle for the downhill score.",
    ],
    diagram: {
      players: [
        { id: "1", label: "1", x: 32, y: 59 },
        { id: "2", label: "2", x: 2, y: 43 },
        { id: "3", label: "3", x: 69, y: 60 },
        { id: "4", label: "4", x: 99, y: 45 },
        { id: "5", label: "5", x: 50, y: 47 },
      ],
      actions: [
        { type: "pass", from: { x: 32, y: 59 }, to: { x: 2, y: 43 } },
        { type: "cut", path: [{ x: 32, y: 59 }, { x: 65, y: 46 }, { x: 26, y: 7 }] },
        { type: "cut", path: [{ x: 69, y: 60 }, { x: 77, y: 32 }, { x: 76, y: 59 }] },
        { type: "cut", path: [{ x: 99, y: 45 }, { x: 96, y: 16 }, { x: 62, y: 59 }, { x: 97, y: 32 }] },
        { type: "cut", path: [{ x: 50, y: 47 }, { x: 49, y: 27 }] },
        { type: "pass", from: { x: 2, y: 43 }, to: { x: 26, y: 7 } },
        { type: "pass", from: { x: 26, y: 7 }, to: { x: 49, y: 27 } },
        { type: "cut", path: [{ x: 49, y: 27 }, { x: 49, y: 9 }] },
      ],
    },
    steps: [
      {
        title: "Initial Alignment",
        narrative: "Four players spread high above the three-point line with 5 in the middle. 1 has the ball at the top.",
        players: [
          { id: "1", label: "1", x: 32, y: 59 },
          { id: "2", label: "2", x: 2, y: 43 },
          { id: "3", label: "3", x: 69, y: 60 },
          { id: "4", label: "4", x: 99, y: 45 },
          { id: "5", label: "5", x: 50, y: 47 },
        ],
        actions: [],
      },
      {
        title: "Entry Pass & Clear",
        narrative: "1 passes to 2, then cuts through the middle and clears to the right side.",
        players: [
          { id: "1", label: "1", x: 65, y: 46 },
          { id: "2", label: "2", x: 2, y: 43 },
          { id: "3", label: "3", x: 69, y: 60 },
          { id: "4", label: "4", x: 99, y: 45 },
          { id: "5", label: "5", x: 50, y: 47 },
        ],
        actions: [
          { type: "pass", from: { x: 32, y: 59 }, to: { x: 2, y: 43 } },
          { type: "cut", path: [{ x: 32, y: 59 }, { x: 65, y: 46 }] },
        ],
      },
      {
        title: "Perimeter Exchange",
        narrative: "3 and 4 loop through the lane, exchanging wing and corner spots as the defense works to track the cutters.",
        players: [
          { id: "1", label: "1", x: 65, y: 46 },
          { id: "2", label: "2", x: 2, y: 43 },
          { id: "3", label: "3", x: 76, y: 59 },
          { id: "4", label: "4", x: 97, y: 32 },
          { id: "5", label: "5", x: 50, y: 47 },
        ],
        actions: [
          { type: "cut", path: [{ x: 69, y: 60 }, { x: 77, y: 32 }, { x: 76, y: 59 }] },
          { type: "cut", path: [{ x: 99, y: 45 }, { x: 96, y: 16 }, { x: 62, y: 59 }, { x: 97, y: 32 }] },
        ],
      },
      {
        title: "Cut to the Corner",
        narrative: "1 continues cutting all the way down to the left corner, looking for the ball as the defense gets caught in the traffic.",
        players: [
          { id: "1", label: "1", x: 26, y: 7 },
          { id: "2", label: "2", x: 2, y: 43 },
          { id: "3", label: "3", x: 76, y: 59 },
          { id: "4", label: "4", x: 97, y: 32 },
          { id: "5", label: "5", x: 50, y: 47 },
        ],
        actions: [
          { type: "cut", path: [{ x: 65, y: 46 }, { x: 26, y: 7 }] },
        ],
      },
      {
        title: "Slide to the Middle",
        narrative: "5 slides into the middle, ready for a quick catch and go.",
        players: [
          { id: "1", label: "1", x: 26, y: 7 },
          { id: "2", label: "2", x: 2, y: 43 },
          { id: "3", label: "3", x: 76, y: 59 },
          { id: "4", label: "4", x: 97, y: 32 },
          { id: "5", label: "5", x: 49, y: 27 },
        ],
        actions: [
          { type: "cut", path: [{ x: 50, y: 47 }, { x: 49, y: 27 }] },
        ],
      },
      {
        title: "Corner Pass",
        narrative: "2 finds 1 open in the left corner.",
        players: [
          { id: "1", label: "1", x: 26, y: 7 },
          { id: "2", label: "2", x: 2, y: 43 },
          { id: "3", label: "3", x: 76, y: 59 },
          { id: "4", label: "4", x: 97, y: 32 },
          { id: "5", label: "5", x: 49, y: 27 },
        ],
        actions: [
          { type: "pass", from: { x: 2, y: 43 }, to: { x: 26, y: 7 } },
        ],
      },
      {
        title: "Quick Hit & Score",
        narrative: "1 immediately swings it to 5 in the middle, who attacks downhill and finishes at the rim.",
        players: [
          { id: "1", label: "1", x: 26, y: 7 },
          { id: "2", label: "2", x: 2, y: 43 },
          { id: "3", label: "3", x: 76, y: 59 },
          { id: "4", label: "4", x: 97, y: 32 },
          { id: "5", label: "5", x: 49, y: 9 },
        ],
        actions: [
          { type: "pass", from: { x: 26, y: 7 }, to: { x: 49, y: 27 } },
          { type: "cut", path: [{ x: 49, y: 27 }, { x: 49, y: 9 }] },
        ],
      },
    ],
  },
  {
    id: "rot-vs-zone",
    name: "Rot (vs. Zone)",
    category: "Zone Offense",
    description: "Continuity to attack zone defenses from a two-guard set: 2 enters to 4 and cuts to the low block as the guards rotate up to fill behind the pass.",
    keyPoints: [
      "1 and 2 start in the slots, slightly above the three-point line; 3 and 4 are on the wings, slightly above free-throw line height and outside the three-point line. 2 has the ball.",
      "2 passes to 4 and cuts to the low block. At the same time, 1 fills 2's vacated slot, and 3 fills 1's vacated slot.",
    ],
    diagram: {
      players: [
        { id: "1", label: "1", x: 35, y: 61 },
        { id: "2", label: "2", x: 65, y: 61 },
        { id: "3", label: "3", x: 10, y: 44 },
        { id: "4", label: "4", x: 90, y: 44 },
        { id: "5", label: "5", x: 50, y: 38 },
      ],
      actions: [
        { type: "pass", from: { x: 65, y: 61 }, to: { x: 90, y: 44 } },
        { type: "cut", path: [{ x: 65, y: 61 }, { x: 60, y: 35 }, { x: 68, y: 8 }] },
        { type: "cut", path: [{ x: 35, y: 61 }, { x: 65, y: 61 }] },
        { type: "cut", path: [{ x: 10, y: 44 }, { x: 35, y: 61 }] },
      ],
    },
    steps: [
      {
        title: "Initial Alignment",
        narrative: "1 and 2 start in the slots, slightly above the three-point line. 3 and 4 are on the wings, slightly above free-throw line height and outside the three-point line. 2 has the ball. 5 holds the high post.",
        players: [
          { id: "1", label: "1", x: 35, y: 61 },
          { id: "2", label: "2", x: 65, y: 61 },
          { id: "3", label: "3", x: 10, y: 44 },
          { id: "4", label: "4", x: 90, y: 44 },
          { id: "5", label: "5", x: 50, y: 38 },
        ],
        actions: [],
      },
      {
        title: "Entry Pass & Cut",
        narrative: "2 passes to 4 and cuts through the lane to the low block. At the same time, 1 fills 2's vacated slot, and 3 fills 1's vacated slot.",
        players: [
          { id: "1", label: "1", x: 65, y: 61 },
          { id: "2", label: "2", x: 68, y: 8 },
          { id: "3", label: "3", x: 35, y: 61 },
          { id: "4", label: "4", x: 90, y: 44 },
          { id: "5", label: "5", x: 50, y: 38 },
        ],
        actions: [
          { type: "pass", from: { x: 65, y: 61 }, to: { x: 90, y: 44 } },
          { type: "cut", path: [{ x: 65, y: 61 }, { x: 60, y: 35 }, { x: 68, y: 8 }] },
          { type: "cut", path: [{ x: 35, y: 61 }, { x: 65, y: 61 }] },
          { type: "cut", path: [{ x: 10, y: 44 }, { x: 35, y: 61 }] },
        ],
      },
    ],
  },
  {
    id: "split-vs-man",
    name: "Split (vs. Man-to-Man)",
    category: "Man-to-Man Offense",
    description: "A read-heavy continuity built around split cuts and staggered screens to attack man-to-man defense — if the first option isn't there, the team reads through a back screen, a staggered screen, and a full reset without ever breaking the offense.",
    keyPoints: [
      "2-3 alignment with 5 on the high post. 1 enters to 3, then 1 and 2 split-cut to the opposite low post off screens from 5.",
      "Options off the split: 3 can cut baseline to the rim, or 2 can catch and drive straight to the basket.",
      "3 reverses the ball to 4 in the middle; 1 relocates to the open wing and gets it back.",
      "3 uses a back screen from 2 to seal the ball-side low post for an entry pass.",
      "4 and 5 set a staggered screen for 2 — catch-and-shoot, or curl to the rim if the defense chases.",
      "If nothing's there, 5 holds the middle, 4 spaces to the wing, and — with time left — 5 and 2 set cross screens for 3 and 1 to reset the whole team.",
    ],
    diagram: {
      players: [
        { id: "1", label: "1", x: 55, y: 62 },
        { id: "2", label: "2", x: 30, y: 62 },
        { id: "3", label: "3", x: 85, y: 62 },
        { id: "4", label: "4", x: 10, y: 68 },
        { id: "5", label: "5", x: 50, y: 45 },
      ],
      actions: [
        { type: "pass", from: { x: 55, y: 62 }, to: { x: 85, y: 62 } },
        { type: "cut", path: [{ x: 55, y: 62 }, { x: 50, y: 45 }, { x: 30, y: 15 }] },
        { type: "cut", path: [{ x: 30, y: 55 }, { x: 50, y: 45 }, { x: 70, y: 15 }] },
        { type: "screen", at: { x: 50, y: 45 }, angle: 0 },
        { type: "pass", from: { x: 85, y: 62 }, to: { x: 50, y: 60 } },
        { type: "pass", from: { x: 50, y: 60 }, to: { x: 12, y: 50 } },
        { type: "cut", path: [{ x: 85, y: 62 }, { x: 75, y: 40 }, { x: 65, y: 12 }] },
        { type: "screen", at: { x: 65, y: 35 }, angle: 90 },
        { type: "pass", from: { x: 12, y: 50 }, to: { x: 65, y: 12 } },
        { type: "screen", at: { x: 40, y: 30 }, angle: 90 },
        { type: "screen", at: { x: 40, y: 42 }, angle: 90 },
        { type: "cut", path: [{ x: 65, y: 35 }, { x: 50, y: 38 }, { x: 35, y: 45 }] },
        { type: "pass", from: { x: 65, y: 12 }, to: { x: 35, y: 45 } },
      ],
    },
    steps: [
      {
        title: "Initial Alignment",
        narrative: "2-3 set with 5 on the high post. 1 has the ball up top, 2 on the left, 4 wide on the left wing, 3 wide on the right wing.",
        players: [
          { id: "1", label: "1", x: 67, y: 68 },
          { id: "2", label: "2", x: 32, y: 68 },
          { id: "3", label: "3", x: 89, y: 47 },
          { id: "4", label: "4", x: 10, y: 47 },
          { id: "5", label: "5", x: 50, y: 45 },
        ],
        actions: [],
      },
      {
        title: "Split Cut",
        narrative: "1 passes to 3, then 1 and 2 both cut to the low post on the opposite side, splitting off a screen from 5 in the middle. (Options here: 3 can cut baseline to the rim, or 2 can catch coming off the split and drive straight to the basket.)",
        players: [
          { id: "1", label: "1", x: 30, y: 15 },
          { id: "2", label: "2", x: 70, y: 15 },
          { id: "3", label: "3", x: 85, y: 62 },
          { id: "4", label: "4", x: 10, y: 68 },
          { id: "5", label: "5", x: 50, y: 45 },
        ],
        actions: [
          { type: "pass", from: { x: 55, y: 62 }, to: { x: 85, y: 62 } },
          { type: "cut", path: [{ x: 55, y: 62 }, { x: 50, y: 45 }, { x: 30, y: 15 }] },
          { type: "cut", path: [{ x: 30, y: 55 }, { x: 50, y: 45 }, { x: 70, y: 15 }] },
          { type: "screen", at: { x: 50, y: 45 }, angle: 0 },
        ],
      },
      {
        title: "Ball Reversal",
        narrative: "3 swings it to 4, who has flashed to the middle. 1 relocates out to the open wing and gets it back from 4.",
        players: [
          { id: "1", label: "1", x: 12, y: 50 },
          { id: "2", label: "2", x: 70, y: 15 },
          { id: "3", label: "3", x: 85, y: 62 },
          { id: "4", label: "4", x: 50, y: 60 },
          { id: "5", label: "5", x: 50, y: 45 },
        ],
        actions: [
          { type: "cut", path: [{ x: 10, y: 68 }, { x: 50, y: 60 }] },
          { type: "pass", from: { x: 85, y: 62 }, to: { x: 50, y: 60 } },
          { type: "cut", path: [{ x: 30, y: 15 }, { x: 12, y: 50 }] },
          { type: "pass", from: { x: 50, y: 60 }, to: { x: 12, y: 50 } },
        ],
      },
      {
        title: "Back Screen",
        narrative: "3 uses a back screen from 2 and cuts to the open low post on the ball side. 4 drifts down into the post as 1 feeds 3 in the low post.",
        players: [
          { id: "1", label: "1", x: 12, y: 50 },
          { id: "2", label: "2", x: 65, y: 35 },
          { id: "3", label: "3", x: 65, y: 12 },
          { id: "4", label: "4", x: 50, y: 25 },
          { id: "5", label: "5", x: 50, y: 45 },
        ],
        actions: [
          { type: "cut", path: [{ x: 70, y: 15 }, { x: 65, y: 35 }] },
          { type: "screen", at: { x: 65, y: 35 }, angle: 90 },
          { type: "cut", path: [{ x: 85, y: 62 }, { x: 75, y: 40 }, { x: 65, y: 12 }] },
          { type: "cut", path: [{ x: 50, y: 60 }, { x: 50, y: 25 }] },
          { type: "pass", from: { x: 12, y: 50 }, to: { x: 65, y: 12 } },
        ],
      },
      {
        title: "Staggered Screen",
        narrative: "4 and 5 set a staggered screen for 2. Catch-and-shoot if the defense fights under, or curl to the rim if it chases over the top.",
        players: [
          { id: "1", label: "1", x: 12, y: 50 },
          { id: "2", label: "2", x: 35, y: 45 },
          { id: "3", label: "3", x: 65, y: 12 },
          { id: "4", label: "4", x: 40, y: 30 },
          { id: "5", label: "5", x: 40, y: 42 },
        ],
        actions: [
          { type: "cut", path: [{ x: 50, y: 25 }, { x: 40, y: 30 }] },
          { type: "cut", path: [{ x: 50, y: 45 }, { x: 40, y: 42 }] },
          { type: "screen", at: { x: 40, y: 30 }, angle: 90 },
          { type: "screen", at: { x: 40, y: 42 }, angle: 90 },
          { type: "cut", path: [{ x: 65, y: 35 }, { x: 50, y: 38 }, { x: 35, y: 45 }] },
          { type: "pass", from: { x: 65, y: 12 }, to: { x: 35, y: 45 } },
        ],
      },
      {
        title: "Reset",
        narrative: "If nothing's open, 5 holds position in the middle and 4 spaces back out to the open wing.",
        players: [
          { id: "1", label: "1", x: 12, y: 50 },
          { id: "2", label: "2", x: 35, y: 45 },
          { id: "3", label: "3", x: 65, y: 12 },
          { id: "4", label: "4", x: 15, y: 55 },
          { id: "5", label: "5", x: 50, y: 20 },
        ],
        actions: [
          { type: "cut", path: [{ x: 40, y: 42 }, { x: 50, y: 20 }] },
          { type: "cut", path: [{ x: 40, y: 30 }, { x: 15, y: 55 }] },
        ],
      },
      {
        title: "Cross Screens",
        narrative: "With time still on the clock, the ball swings to 4, and 5 sets a cross screen for 3 while 2 sets one for 1 — resetting the whole team into a fresh read.",
        players: [
          { id: "1", label: "1", x: 45, y: 55 },
          { id: "2", label: "2", x: 35, y: 45 },
          { id: "3", label: "3", x: 30, y: 12 },
          { id: "4", label: "4", x: 15, y: 55 },
          { id: "5", label: "5", x: 50, y: 20 },
        ],
        actions: [
          { type: "pass", from: { x: 35, y: 45 }, to: { x: 15, y: 55 } },
          { type: "cut", path: [{ x: 65, y: 12 }, { x: 50, y: 20 }, { x: 30, y: 12 }] },
          { type: "screen", at: { x: 50, y: 20 }, angle: 0 },
          { type: "cut", path: [{ x: 12, y: 50 }, { x: 30, y: 45 }, { x: 45, y: 55 }] },
          { type: "screen", at: { x: 35, y: 45 }, angle: 0 },
        ],
      },
    ],
  },
];

// Defensive schemes. Same coordinate system as SET_PLAYS. Diagram players use
// team: "defense" for the orange outlined/labelled markers, and an optional
// `ball` field on a diagram/read draws the ball marker at that spot.
const DEFENSIVE_SETS = [
  {
    id: "1-3-1-zone",
    name: "1-3-1 Zone Defense",
    category: "Zone Defense",
    summary: "An aggressive, passing-lane-denying zone built around one chaser, two wings, a center, and a baseline warrior — trades size and rebounding risk for deflections, steals, and transition offense.",
    overview: "The 1-3-1 zone defense sets up exactly like the name says: one defender up top, three across the middle, and one at the bottom. Instead of guarding a specific player, each defender owns a zone of the floor and reads the ball. Rather than sitting between the ball and the basket the way a standard man defense does, the 1-3-1 crowds passing lanes — it dares the offense to throw lob or bounce passes over and around the defense, which is exactly when deflections and steals happen. Because of that, it's a high-effort, high-reward defense: it can turn into easy baskets in transition, but it also gives up more offensive rebounds and open shots than a standard zone if players aren't disciplined about their stance and rotations.",
    strengths: [
      "Disrupts the offense's normal sets — most teams have no rehearsed answer for it.",
      "Generates deflections, steals, and transition scoring chances.",
      "Great tempo-change weapon mid-game, or to close out a half.",
      "Only really vulnerable to one or two counters (usually a 2-1-2 or 1-3-1 alignment on offense), so it's quick to scout for.",
    ],
    weaknesses: [
      "The high post and short corners are its soft spots — a team that finds the gap there can score easily.",
      "Gives up offensive rebounds since nobody is boxing out a matched-up opponent.",
      "Wears players out fast; needs a deep rotation to sustain it for a full game.",
      "Takes real practice time to teach the rotations well.",
    ],
    rules: [
      "No straight-line passes allowed — always stay in a passing lane, not between the ball and the man.",
      "Move on the pass's air time, not after the catch — anticipate where it's going.",
      "Everyone crashes the boards on a shot; nobody has a check to box out, so it has to be a team effort.",
      "Stay in a low defensive stance with hands active — a standing defender is always a step late.",
      "Watch the passer's eyes, not the ball — that's what lets you jump the passing lane.",
    ],
    positions: [
      { label: "CH", name: "Chaser", desc: "Top of the zone, set up outside the three-point line. Pressures the ball to one side and denies it coming back the other way — feet always pointed toward the sideline they're pushing the ball to." },
      { label: "W", name: "Wings", desc: "The two outside players in the middle line. Whoever is on the ball side contains the wing/corner; the weak-side wing drops all the way to the weak-side block, the zone's only defender over there." },
      { label: "C", name: "Center", desc: "The lone middle defender, starting up at the free-throw line to defend the high post. Job is simple to say, hard to do: stay between the ball and the rim, and never let the ball into the post." },
      { label: "WR", name: "Warrior", desc: "Bottom of the zone. Fronts the ball-side low block and sprints corner to corner to help trap, closing out under control so the corner can't be driven baseline." },
    ],
    baseDiagram: {
      players: [
        { id: "CH", label: "CH", team: "defense", x: 50, y: 65 },
        { id: "WL", label: "W", team: "defense", x: 15, y: 32 },
        { id: "WRight", label: "W", team: "defense", x: 85, y: 32 },
        { id: "C", label: "C", team: "defense", x: 50, y: 41 },
        { id: "WR", label: "WR", team: "defense", x: 50, y: 8 },
      ],
    },
    reads: [
      {
        title: "Ball at the Top",
        narrative: "Base alignment. The chaser sets up outside the three-point line and pressures the ball-handler as soon as they cross half-court, angling their body to push the dribble toward one sideline — the ball must never come straight down the middle. The center comes up to the free-throw line to take away the high post.",
        diagram: {
          players: [
            { id: "CH", label: "CH", team: "defense", x: 50, y: 65 },
            { id: "WL", label: "W", team: "defense", x: 15, y: 32 },
            { id: "WRight", label: "W", team: "defense", x: 85, y: 32 },
            { id: "C", label: "C", team: "defense", x: 50, y: 41 },
            { id: "WR", label: "WR", team: "defense", x: 50, y: 8 },
          ],
          ball: { x: 50, y: 75 },
        },
      },
      {
        title: "Ball on the Wing",
        narrative: "Once the ball is pushed to a side, the ball-side wing closes out to contain it. The chaser slides over to take away the pass back to the top. The center shifts toward the ball, staying at free-throw line height to hold the high post, the warrior shifts ball-side to front the low block, and the weak-side wing drops all the way to the weak-side block — the zone's only defender on that whole side of the floor.",
        diagram: {
          players: [
            { id: "CH", label: "CH", team: "defense", x: 62, y: 58 },
            { id: "WL", label: "W", team: "defense", x: 20, y: 12 },
            { id: "WRight", label: "W", team: "defense", x: 78, y: 38 },
            { id: "C", label: "C", team: "defense", x: 58, y: 38 },
            { id: "WR", label: "WR", team: "defense", x: 62, y: 10 },
          ],
          ball: { x: 82, y: 35 },
        },
      },
      {
        title: "Ball in the Corner (Trap)",
        narrative: "If the ball goes further down to the corner, the ball-side wing and the warrior close down together for a soft trap — angled so there's no sideline release, forcing a lob back out that the defense can jump. The chaser shifts further over to deny the skip pass to the top, the center drops from the free-throw line down to the ball-side block, and the weak-side wing stays home on the weak-side block reading the skip pass.",
        diagram: {
          players: [
            { id: "CH", label: "CH", team: "defense", x: 68, y: 50 },
            { id: "WL", label: "W", team: "defense", x: 20, y: 10 },
            { id: "WRight", label: "W", team: "defense", x: 90, y: 14 },
            { id: "C", label: "C", team: "defense", x: 58, y: 15 },
            { id: "WR", label: "WR", team: "defense", x: 78, y: 8 },
          ],
          ball: { x: 95, y: 8 },
        },
      },
      {
        title: "Ball Reverses to the Weak Side",
        narrative: "When the offense swings the ball back through the top and out to the opposite wing, the whole zone mirrors itself. The wing that had dropped to the weak-side block sprints out to close on the new ball side. The chaser slides back across, staying in the passing lane between the top and the new ball side. The center slides across to stay in front of the ball, the warrior crosses the lane to front the new ball-side block, and the wing that just contained the ball drops down to become the new weak-side defender on the block.",
        diagram: {
          players: [
            { id: "CH", label: "CH", team: "defense", x: 38, y: 58 },
            { id: "WL", label: "W", team: "defense", x: 22, y: 38 },
            { id: "WRight", label: "W", team: "defense", x: 80, y: 12 },
            { id: "C", label: "C", team: "defense", x: 42, y: 38 },
            { id: "WR", label: "WR", team: "defense", x: 38, y: 10 },
          ],
          ball: { x: 18, y: 35 },
        },
      },
    ],
  },
];
