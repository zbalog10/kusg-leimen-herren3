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
    description: "Sideline out-of-bounds set from a box alignment: 3 clears baseline off a screen from 4 as a decoy, while 2 fakes toward the ball outside the three-point line before curling backdoor off a back screen from 5 for a score at the rim.",
    keyPoints: [
      "1 inbounds from the sideline.",
      "4 sets a baseline screen for 3, who cuts from the block to the far corner as the decoy/second option.",
      "2 leaves the elbow and cuts toward the ball, staying outside the three-point line, faking like he wants the catch.",
      "5 follows and sets a back screen; 2 curls backdoor to the rim.",
      "1 hits 2 cutting to the basket for the score.",
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
        { type: "screen", at: { x: 29, y: 10 }, angle: 0 },
        { type: "cut", path: [{ x: 68, y: 8 }, { x: 38, y: 3 }, { x: 3, y: 3 }] },
        { type: "cut", path: [{ x: 66, y: 41 }, { x: 45, y: 50 }, { x: 20, y: 58 }] },
        { type: "screen", at: { x: 20, y: 58 }, angle: 0 },
        { type: "cut", path: [{ x: 34, y: 40 }, { x: 22, y: 46 }, { x: 14, y: 50 }, { x: 25, y: 33 }, { x: 46, y: 12 }] },
        { type: "pass", from: { x: -4, y: 55 }, to: { x: 46, y: 12 } },
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
          { type: "screen", at: { x: 29, y: 10 }, angle: 0 },
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
          { type: "screen", at: { x: 20, y: 58 }, angle: 0 },
        ],
      },
      {
        title: "Curl to the Rim",
        narrative: "2 curls off the back screen and cuts hard backdoor to the basket.",
        players: [
          { id: "1", label: "1", x: -4, y: 55 },
          { id: "2", label: "2", x: 46, y: 12 },
          { id: "3", label: "3", x: 3, y: 3 },
          { id: "4", label: "4", x: 29, y: 10 },
          { id: "5", label: "5", x: 20, y: 58 },
        ],
        actions: [
          { type: "cut", path: [{ x: 14, y: 50 }, { x: 25, y: 33 }, { x: 46, y: 12 }] },
        ],
      },
      {
        title: "Inbound Pass & Score",
        narrative: "1 delivers the pass to 2 cutting to the basket for the finish.",
        players: [
          { id: "1", label: "1", x: -4, y: 55 },
          { id: "2", label: "2", x: 46, y: 12 },
          { id: "3", label: "3", x: 3, y: 3 },
          { id: "4", label: "4", x: 29, y: 10 },
          { id: "5", label: "5", x: 20, y: 58 },
        ],
        actions: [
          { type: "pass", from: { x: -4, y: 55 }, to: { x: 46, y: 12 } },
        ],
      },
    ],
  },
  {
    id: "baseline-post-cross",
    name: "Baseline Post Cross",
    category: "Out of Bounds (BLOB)",
    description: "Baseline out-of-bounds set: the post players cross while the perimeter clears out, freeing a big for a catch and drive from the short post.",
    keyPoints: [
      "1 inbounds from under the basket.",
      "3 clears from the right elbow to the top; 2 clears from the left elbow down to the corner.",
      "5 cuts across the lane as 4 lifts from the block to the short post.",
      "1 hits 4 at the short post; 4 attacks the rim.",
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
        { type: "cut", path: [{ x: 29, y: 41 }, { x: 15, y: 31 }, { x: -5, y: 24 }] },
        { type: "cut", path: [{ x: 72, y: 7 }, { x: 40, y: 24 }, { x: 26, y: 30 }] },
        { type: "cut", path: [{ x: 29, y: 6 }, { x: 35, y: 32 }, { x: 49, y: 33 }, { x: 50, y: 21 }] },
        { type: "pass", from: { x: 9, y: -3 }, to: { x: 50, y: 21 } },
        { type: "cut", path: [{ x: 50, y: 21 }, { x: 50, y: 10 }] },
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
        title: "Clears & Post Cross",
        narrative: "3 clears from the right elbow up to the top. 2 clears from the left elbow down to the corner. At the same time, 5 cuts across the lane to the weak side as 4 lifts from the block through the nail to the short post.",
        players: [
          { id: "1", label: "1", x: 9, y: -3 },
          { id: "2", label: "2", x: -5, y: 24 },
          { id: "3", label: "3", x: 61, y: 65 },
          { id: "4", label: "4", x: 50, y: 21 },
          { id: "5", label: "5", x: 26, y: 30 },
        ],
        actions: [
          { type: "cut", path: [{ x: 67, y: 41 }, { x: 61, y: 65 }] },
          { type: "cut", path: [{ x: 29, y: 41 }, { x: 15, y: 31 }, { x: -5, y: 24 }] },
          { type: "cut", path: [{ x: 72, y: 7 }, { x: 40, y: 24 }, { x: 26, y: 30 }] },
          { type: "cut", path: [{ x: 29, y: 6 }, { x: 35, y: 32 }, { x: 49, y: 33 }, { x: 50, y: 21 }] },
        ],
      },
      {
        title: "Inbound Pass",
        narrative: "1 hits 4, now open at the short post.",
        players: [
          { id: "1", label: "1", x: 9, y: -3 },
          { id: "2", label: "2", x: -5, y: 24 },
          { id: "3", label: "3", x: 61, y: 65 },
          { id: "4", label: "4", x: 50, y: 21 },
          { id: "5", label: "5", x: 26, y: 30 },
        ],
        actions: [
          { type: "pass", from: { x: 9, y: -3 }, to: { x: 50, y: 21 } },
        ],
      },
      {
        title: "Drive & Score",
        narrative: "4 catches in rhythm and drives straight down the middle for the finish.",
        players: [
          { id: "1", label: "1", x: 9, y: -3 },
          { id: "2", label: "2", x: -5, y: 24 },
          { id: "3", label: "3", x: 61, y: 65 },
          { id: "4", label: "4", x: 50, y: 10 },
          { id: "5", label: "5", x: 26, y: 30 },
        ],
        actions: [
          { type: "cut", path: [{ x: 50, y: 21 }, { x: 50, y: 10 }] },
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
      { label: "CH", name: "Chaser", desc: "Top of the zone, on the free-throw line. Pressures the ball to one side and denies it coming back the other way — feet always pointed toward the sideline they're pushing the ball to." },
      { label: "W", name: "Wings", desc: "The two outside players in the middle line. Whoever is on the ball side contains the wing/corner; the weak-side wing drops all the way to the weak-side block, the zone's only defender over there." },
      { label: "C", name: "Center", desc: "The lone middle defender. Job is simple to say, hard to do: stay between the ball and the rim, and never let the ball into the post." },
      { label: "WR", name: "Warrior", desc: "Bottom of the zone. Fronts the ball-side low block and sprints corner to corner to help trap, closing out under control so the corner can't be driven baseline." },
    ],
    baseDiagram: {
      players: [
        { id: "CH", label: "CH", team: "defense", x: 50, y: 47 },
        { id: "WL", label: "W", team: "defense", x: 15, y: 32 },
        { id: "WRight", label: "W", team: "defense", x: 85, y: 32 },
        { id: "C", label: "C", team: "defense", x: 50, y: 22 },
        { id: "WR", label: "WR", team: "defense", x: 50, y: 8 },
      ],
    },
    reads: [
      {
        title: "Ball at the Top",
        narrative: "Base alignment. The chaser pressures the ball-handler up around the free-throw line, angling their body to push the dribble toward one sideline — the ball must never come straight down the middle.",
        diagram: {
          players: [
            { id: "CH", label: "CH", team: "defense", x: 50, y: 47 },
            { id: "WL", label: "W", team: "defense", x: 15, y: 32 },
            { id: "WRight", label: "W", team: "defense", x: 85, y: 32 },
            { id: "C", label: "C", team: "defense", x: 50, y: 22 },
            { id: "WR", label: "WR", team: "defense", x: 50, y: 8 },
          ],
          ball: { x: 50, y: 62 },
        },
      },
      {
        title: "Ball on the Wing",
        narrative: "Once the ball is pushed to a side, the ball-side wing closes out to contain it. The chaser slides over to take away the pass back to the top. The center shifts toward the ball to stay in front of the post, the warrior shifts ball-side to front the low block, and the weak-side wing drops all the way to the weak-side block — the zone's only defender on that whole side of the floor.",
        diagram: {
          players: [
            { id: "CH", label: "CH", team: "defense", x: 62, y: 52 },
            { id: "WL", label: "W", team: "defense", x: 20, y: 12 },
            { id: "WRight", label: "W", team: "defense", x: 78, y: 38 },
            { id: "C", label: "C", team: "defense", x: 58, y: 24 },
            { id: "WR", label: "WR", team: "defense", x: 62, y: 10 },
          ],
          ball: { x: 82, y: 35 },
        },
      },
      {
        title: "Ball in the Corner (Trap)",
        narrative: "If the ball goes further down to the corner, the ball-side wing and the warrior close down together for a soft trap — angled so there's no sideline release, forcing a lob back out that the defense can jump. The chaser shifts further over to deny the skip pass to the top, the center holds the ball-side block, and the weak-side wing stays home on the weak-side block reading the skip pass.",
        diagram: {
          players: [
            { id: "CH", label: "CH", team: "defense", x: 70, y: 45 },
            { id: "WL", label: "W", team: "defense", x: 20, y: 10 },
            { id: "WRight", label: "W", team: "defense", x: 90, y: 14 },
            { id: "C", label: "C", team: "defense", x: 58, y: 15 },
            { id: "WR", label: "WR", team: "defense", x: 78, y: 8 },
          ],
          ball: { x: 95, y: 8 },
        },
      },
    ],
  },
];
