// All editable content lives in this file. Add, remove, or edit entries below —
// the pages render automatically from these arrays. See README.md for the
// diagram coordinate format (x/y both run 0-100 as % of the court's own
// width/length, hoop at y=0; the free-throw line sits at y=41.4).

// Recurring season template: Mondays and Wednesdays, 18:30, at the
// Fritz-Zugck-Halle in Leimen. To change the schedule, edit the dates/days
// here — SEASON_SCHEDULE (built further down) regenerates from this
// automatically. This is a raw weekly template: it does NOT know about
// school holidays, tournaments, or other cancellations, so remove/adjust
// individual dates yourself as the season firms up.
const SEASON_SCHEDULE_CONFIG = {
  startDate: "2026-08-26", // first generated session
  endDate: "2027-05-31",
  daysOfWeek: [1, 3], // 1 = Monday, 3 = Wednesday
  time: "18:30",
  duration: "90 min",
  location: "Fritz-Zugck-Halle, Leimen",
};

function generateSeasonDates(config) {
  const { startDate, endDate, daysOfWeek } = config;
  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");
  const dates = [];
  // Format from local getters, not toISOString() — that converts to UTC
  // first, which silently shifts the date by a day in timezones ahead of
  // UTC (most of Europe included).
  const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    if (daysOfWeek.includes(d.getDay())) dates.push(fmt(d));
  }
  return dates;
}

// Every session in the template, as plain {date, time, duration, location}.
// Training Plans below with a matching `date` are shown as already planned;
// every other date here renders as "not planned yet" on the schedule page.
const SEASON_SCHEDULE = generateSeasonDates(SEASON_SCHEDULE_CONFIG).map((date) => ({
  date,
  time: SEASON_SCHEDULE_CONFIG.time,
  duration: SEASON_SCHEDULE_CONFIG.duration,
  location: SEASON_SCHEDULE_CONFIG.location,
}));

const TRAINING_PLANS = [
  {
    id: "week1-conditioning-movement",
    title: "Session 1 — Conditioning & Movement",
    date: "2026-08-28",
    time: "18:30",
    location: "Outdoor",
    category: "Conditioning",
    duration: "80 min",
    objective: "Build an aerobic base and reinforce basketball-specific movement patterns (shuffle, closeout, backpedal) at moderate, controlled intensity — no max-effort work today.",
    warmup: "15 min dynamic warm-up: 2–3 min easy jog, then ankle/calf mobilisation, walking lunges, world's greatest stretch, high knees, butt kicks, carioca, lateral shuffle, backpedal, and 3 × 20 m progressive runs at 60 / 70 / 80%.",
    drills: [
      { name: "Running Technique + Acceleration", time: "10 min", desc: "4 × 10 m acceleration, 4 × 20 m acceleration, walk back for recovery between reps. Only 75–80% effort today." },
      { name: "Aerobic Intervals", time: "24 min", desc: "6 rounds of 2 min run at approximately 70–75% + 2 min easy jog/walk. Players should be breathing hard but still able to speak briefly — this is deliberately not a Cooper-test-style sufferfest." },
      { name: "Basketball Movement Circuit", time: "15 min", desc: "Set two cones 10 m apart. 3 rounds of: defensive shuffle 10 m + back, sprint 10 m + backpedal, closeout → retreat, lateral crossover run, 5 squat jumps. 40 sec work / 40 sec rest per station, 2 min rest between rounds." },
      { name: "Core / Bodyweight Strength", time: "10 min", desc: "2 rounds of: 12 split squats each leg, 15 push-ups, 15 glute bridges, 30 sec plank, 20 sec side plank each side, 15 calf raises each leg." },
    ],
    notes: "Cool-down: 5–10 min light stretching/mobility to close the session. Keep the aerobic intervals honest but conversational — the point is base fitness, not a punishment run.",
  },
  {
    id: "week1-transition-conditioning",
    title: "Session 2 — Transition Conditioning & Shooting",
    date: "2026-08-31",
    time: "18:30",
    location: "Sportparkhalle, Leimen",
    category: "Conditioning",
    duration: "90 min",
    objective: "Walk through the offensive system at low intensity, then push full-court transition speed and conditioning while keeping shot quality under fatigue, finishing in a fast-paced, competitive 5-on-5.",
    warmup: "12 min movement with ball: jogging/dribbling, lateral dribble, retreat dribble, change of direction, layups, progressive full-court runs.",
    drills: [
      { name: "Offensive System Walk-Through", time: "10 min", desc: "Low intensity, no conditioning focus. Review basic spacing, player positions, first option/first action, key cuts and screens, and transition into the half-court offense. 2–3 repetitions each side without defense." },
      { name: "Transition Drill (3-Man Weave / Fast-Break Variations)", time: "15 min", desc: "Run full court, emphasizing wide lanes, sprinting, passing ahead, and finishing at speed. Approximately 6 × 2 min, 1 min recovery." },
      { name: "Full-Court Basketball Conditioning", time: "12 min", desc: "Pairs rotate continuously through: 1) sprint baseline → baseline, 2) defensive slide baseline → half court, 3) sprint half court → baseline, 4) receive ball and finish. 4 × 2 min, 90 sec recovery." },
      { name: "Shooting Under Fatigue", time: "15 min", desc: "Pairs. Player A sprints sideline-to-sideline, receives a pass, shoots, rebounds, and repeats on the opposite side — 5 shots, then switch. 4 rounds." },
      { name: "Controlled 5-on-5", time: "20–25 min", desc: "8–10 second shot clock, immediate transition, no walking the ball up — the losing team runs back immediately. Example: 4 × 5 min, 2 min rest." },
    ],
  },
  {
    id: "week2-acceleration-strength",
    title: "Session 3 — Acceleration + Strength",
    date: "2026-09-02",
    time: "18:30",
    location: "Outdoor",
    category: "Conditioning",
    duration: "75 min",
    objective: "Build top-end acceleration mechanics and general strength endurance, closing with a light aerobic tempo finisher.",
    warmup: "15 min: as Friday's warm-up (easy jog, ankle/calf mobilisation, walking lunges, world's greatest stretch, high knees, butt kicks, carioca, lateral shuffle, backpedal, 3 × 20 m progressive runs at 60/70/80%), now also adding skips, lateral bounds, and deceleration mechanics.",
    drills: [
      { name: "Acceleration", time: "15 min", desc: "2 sets of 3 × 10 m, 3 × 20 m, 2 × 30 m at 85–90% speed — not max. Walk back for recovery, 3 min between sets." },
      { name: "Change of Direction", time: "15 min", desc: "Cone setup: B in the middle, A and D 5 m to either side of B in a line, C set 5 m above B (a T/cross shape). Starting at B: B-A-B-D, B-C-B, shuffle variations, sprint + defensive slide." },
      { name: "Strength Endurance", time: "20 min", desc: "3 rounds: 10 reverse lunges/leg, 12 single-leg Romanian deadlift movements/leg, 15 push-ups, 15 squat-to-calf raises, 10 lateral lunges/side, 30 sec plank, 20 sec side plank/side. 45 sec between exercises if needed." },
      { name: "Finisher", time: "10 min", desc: "6 × 60 m tempo runs at approximately 70%. Walk back for recovery." },
    ],
  },
  {
    id: "week2-conditioning-cod",
    title: "Session 4 — Conditioning + COD",
    date: "2026-09-04",
    time: "18:30",
    location: "Outdoor",
    category: "Conditioning",
    duration: "72 min",
    objective: "Increase work capacity with harder tempo running, shuttle-style change-of-direction conditioning, defensive footwork, and a core/hip circuit.",
    warmup: "15 min — standard dynamic warm-up (as previous sessions).",
    drills: [
      { name: "Tempo Intervals", time: "20 min", desc: "10 × (1 min fairly hard running at ~80% + 1 min easy jog)." },
      { name: "Shuttle Conditioning", time: "15 min", desc: "Cones at 5 / 10 / 15 m. One repetition: 0 → 5 → 0 → 10 → 0 → 15 → 0. 2 sets × 5 reps, 40–50 sec recovery between reps, 3 min between sets. Emphasis is controlled deceleration and good turns, not simply survival." },
      { name: "Defensive Footwork", time: "12 min", desc: "Pairs facing one another. Leader moves forward / backward / left / right, follower mirrors. 8 × 30 sec, 30 sec recovery." },
      { name: "Core / Hip Circuit", time: "10 min", desc: "Lateral plank, dead bug, glute bridge, single-leg balance, calf raises." },
    ],
  },
  {
    id: "week3-speed-rsa",
    title: "Session 5 — Speed + Repeated Sprint Ability",
    date: "2026-09-07",
    time: "18:30",
    location: "Outdoor",
    category: "Conditioning",
    duration: "70 min",
    objective: "The first genuinely hard conditioning session of the block — build top speed and repeated sprint ability with basketball-like short recovery.",
    warmup: "15 min — thorough dynamic warm-up.",
    drills: [
      { name: "Speed", time: "15 min", desc: "2 sets of 3 × 10 m, 3 × 20 m, 2 × 30 m at 90–95%. Full recovery of about 60–90 sec — quality matters." },
      { name: "Repeated Sprint Block", time: "18 min", desc: "This becomes basketball-like: 3 sets of 6 × 20 m sprint, one sprint every 20 sec, 3 min between sets. Only 360 m of sprinting total, but the accumulated fatigue should be substantial." },
      { name: "COD Sprints", time: "12 min", desc: "5-10-5 shuttle × 4 repetitions, then T-drill × 4 repetitions. Give enough recovery to maintain quality." },
      { name: "Competitive Finish", time: "10 min", desc: "Divide the team into two groups for relay races incorporating sprint, lateral shuffle, backpedal, sprint." },
    ],
    notes: "This is the first genuinely hard conditioning session of the block — keep an eye on players for excess fatigue or soreness.",
  },
  {
    id: "week3-reload-recovery",
    title: "Session 6 — Reload / Recovery Conditioning",
    date: "2026-09-09",
    time: "18:30",
    location: "Outdoor",
    category: "Conditioning",
    duration: "85 min",
    objective: "A lighter reload day — three hard sessions every week would just accumulate fatigue, so this session prioritizes easy aerobic work, movement quality, and general strength without maximal effort.",
    warmup: "12 min.",
    drills: [
      { name: "Continuous Aerobic Work", time: "25–30 min", desc: "Easy run at conversational pace. Alternative for players with joint issues: 5 × 5 min run + 1 min walk." },
      { name: "Movement Quality", time: "15 min", desc: "Defensive stance, lateral shuffle, hip turns, closeout footwork, acceleration/deceleration, single-leg balance. No maximal effort." },
      { name: "Strength", time: "20 min", desc: "3 rounds: 10 Bulgarian split squats/side, 12 single-leg glute bridges, 12 push-ups, 10 squat jumps, 15 calf raises/leg, 30–40 sec plank." },
      { name: "Mobility", time: "10 min", desc: "General mobility work to close the session." },
    ],
    notes: "This lighter day is important — three hard sessions every week would just accumulate fatigue.",
  },
  {
    id: "week3-conditioning-peak",
    title: "Session 7 — Preseason Conditioning Peak",
    date: "2026-09-11",
    time: "18:30",
    location: "Outdoor",
    category: "Conditioning",
    duration: "70 min",
    objective: "The hardest outdoor session of the block — reactive agility, a basketball-court-simulation shuttle, and a repeated sprint finale, trying to approximate a basketball work-rest pattern.",
    warmup: "15 min.",
    drills: [
      { name: "Reactive Agility", time: "12 min", desc: "Pairs or coach-called direction: sprint, backpedal, shuffle, change direction on a visual/verbal command. 10 × 20–25 sec, 40 sec recovery." },
      { name: "Basketball Court Simulation", time: "20 min", desc: "Even without a court, mark approximately 28 m with cones. One repetition: 1) sprint 28 m, 2) backpedal 10 m, 3) sprint forward, 4) defensive slide 5 m, 5) change direction, 6) sprint 15 m — about 20–25 sec of work. 4 sets × 4 repetitions, 30 sec between reps, 3 min between sets." },
      { name: "Repeated Sprint Finale", time: "10 min", desc: "2 sets of 6 × 15 m, starting every 15 sec, 3 min between sets." },
      { name: "Team Competition", time: "5–10 min", desc: "Relays." },
    ],
    notes: "This is the hardest outdoor session of the preseason conditioning block.",
  },
];

// Full-season league fixture list, sourced from basketball-bund.net (league
// "BBW1 Kreisliga B1 Männer (Senioren Rhein/Neckar; Liganr.: 7140)", liga_id
// 52666: https://www.basketball-bund.net/index.jsp?Action=101&liga_id=52666
// A blank opponent/time/venue means the league still has it as "00:00"/TBD —
// the home club for that fixture hasn't reported the date yet. Re-check the
// source and fill in details as they're published; `home` tells you which
// side KuSG is on even before the rest is confirmed.
const GAME_SCHEDULE = [
  { matchday: 1, date: "2026-09-26", time: "20:00", home: true, opponent: null, venue: "Sportpark Leimen" },
  { matchday: 2, date: "2026-10-03", time: null, home: false, opponent: null, venue: null },
  { matchday: 3, date: "2026-10-10", time: "16:00", home: false, opponent: "SV 98/07 Seckenheim", venue: "Richard-Möll-Halle" },
  { matchday: 4, date: "2026-10-18", time: "19:00", home: true, opponent: null, venue: "Sportpark Leimen" },
  { matchday: 5, date: "2026-11-08", time: "20:00", home: false, opponent: "TSG Wiesloch 3", venue: "Helmut-Will-Halle" },
  { matchday: 6, date: "2026-11-14", time: "18:00", home: true, opponent: "TV Sinsheim 3 / TSV Baden Östringen", venue: "Sportpark Leimen" },
  { matchday: 7, date: "2026-11-21", time: "20:00", home: false, opponent: "SG Heidelberg/Kirchheim 3", venue: "Sportzentrum Süd - Alte Halle" },
  { matchday: 8, date: "2026-11-28", time: "18:00", home: true, opponent: "BAC Hockenheim 2", venue: "Sportpark Leimen" },
  { matchday: 9, date: "2026-12-05", time: null, home: false, opponent: null, venue: null },
  { matchday: 10, date: "2027-01-16", time: null, home: false, opponent: null, venue: null },
  { matchday: 11, date: "2027-01-24", time: "19:30", home: true, opponent: null, venue: "Sportpark Leimen" },
  { matchday: 12, date: "2027-01-30", time: "18:00", home: true, opponent: "SV 98/07 Seckenheim", venue: "Sportpark Leimen" },
  { matchday: 13, date: "2027-02-20", time: null, home: false, opponent: null, venue: null },
  { matchday: 14, date: "2027-02-28", time: "17:00", home: true, opponent: "TSG Wiesloch 3", venue: "Sportpark Leimen" },
  { matchday: 15, date: "2027-03-06", time: "18:30", home: false, opponent: "TV Sinsheim 3 / TSV Baden Östringen", venue: "Kraichgau-Realschule" },
  { matchday: 16, date: "2027-03-13", time: "20:00", home: true, opponent: "SG Heidelberg/Kirchheim 3", venue: "Sportpark Leimen" },
  { matchday: 17, date: "2027-04-11", time: "18:00", home: false, opponent: "BAC Hockenheim 2", venue: "Rudolf-Harbig-Halle" },
  { matchday: 18, date: "2027-04-18", time: "17:00", home: true, opponent: null, venue: "Sportpark Leimen" },
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
    description: "Continuity to attack zone defenses from a two-guard set: the ball-side guard enters to the wing and cuts to the low block while the guards rotate up behind, and if the cutter isn't fed, they clear to the weak wing — the whole shape then mirrors and repeats to the other side, on and on.",
    keyPoints: [
      "1 and 2 start in the slots, slightly above the three-point line; 3 and 4 are on the wings, slightly above free-throw line height and outside the three-point line. 2 has the ball.",
      "2 passes to 4 and cuts to the low block. At the same time, 1 fills 2's vacated slot, and 3 fills 1's vacated slot.",
      "If 2 doesn't get the ball at the block, it clears to the far wing, taking over 3's original spot.",
      "4 reverses the ball to 1, who reverses it to 3, who passes to 2 and cuts to the low block the same way 2 did at the start — 1 fills 3's vacated slot, and 4 fills 1's vacated slot.",
      "The pattern now repeats indefinitely, mirroring to the other side each time the ball reverses.",
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
        { type: "cut", path: [{ x: 68, y: 8 }, { x: 35, y: 15 }, { x: 10, y: 44 }] },
        { type: "pass", from: { x: 90, y: 44 }, to: { x: 65, y: 61 } },
        { type: "pass", from: { x: 65, y: 61 }, to: { x: 35, y: 61 } },
        { type: "pass", from: { x: 35, y: 61 }, to: { x: 10, y: 44 } },
        { type: "cut", path: [{ x: 35, y: 61 }, { x: 30, y: 35 }, { x: 32, y: 8 }] },
        { type: "cut", path: [{ x: 65, y: 61 }, { x: 35, y: 61 }] },
        { type: "cut", path: [{ x: 90, y: 44 }, { x: 65, y: 61 }] },
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
      {
        title: "2 Clears to the Weak Side",
        narrative: "2 doesn't get the ball at the low block, so it clears across to the far wing, taking over the spot 3 started in.",
        players: [
          { id: "1", label: "1", x: 65, y: 61 },
          { id: "2", label: "2", x: 10, y: 44 },
          { id: "3", label: "3", x: 35, y: 61 },
          { id: "4", label: "4", x: 90, y: 44 },
          { id: "5", label: "5", x: 50, y: 38 },
        ],
        actions: [
          { type: "cut", path: [{ x: 68, y: 8 }, { x: 35, y: 15 }, { x: 10, y: 44 }] },
        ],
      },
      {
        title: "Reversal & Mirror Cut",
        narrative: "4 reverses the ball to 1, who reverses it to 3, who passes to 2 and cuts to the low block the same way 2 did at the start. 1 fills 3's vacated slot, and 4 fills 1's vacated slot — the team is now in the same shape as after the first entry, just mirrored. From here the pattern repeats indefinitely, flipping sides with every reversal.",
        players: [
          { id: "1", label: "1", x: 35, y: 61 },
          { id: "2", label: "2", x: 10, y: 44 },
          { id: "3", label: "3", x: 32, y: 8 },
          { id: "4", label: "4", x: 65, y: 61 },
          { id: "5", label: "5", x: 50, y: 38 },
        ],
        actions: [
          { type: "pass", from: { x: 90, y: 44 }, to: { x: 65, y: 61 }, beat: 0 },
          { type: "pass", from: { x: 65, y: 61 }, to: { x: 35, y: 61 }, beat: 1 },
          { type: "pass", from: { x: 35, y: 61 }, to: { x: 10, y: 44 }, beat: 2 },
          { type: "cut", path: [{ x: 35, y: 61 }, { x: 30, y: 35 }, { x: 32, y: 8 }], beat: 2 },
          { type: "cut", path: [{ x: 65, y: 61 }, { x: 35, y: 61 }], beat: 2 },
          { type: "cut", path: [{ x: 90, y: 44 }, { x: 65, y: 61 }], beat: 2 },
        ],
      },
    ],
  },
  {
    id: "split-vs-man",
    name: "Split (vs. Man-to-Man)",
    category: "Man-to-Man Offense",
    description: "Read-heavy continuity built around back-to-back screens from 5 for the split cutters, a guard lift to reset the point, and a staggered screen to spring the shooter — if the first cutter doesn't score, the read just keeps flowing.",
    keyPoints: [
      "1 passes to 3 and cuts in front of 5 to the opposite low block, using 5 as a screen. (Option: 3 can drive if the defense helps off.)",
      "After 1 clears, 2 cuts in front of 5 to the opposite low block the same way, also screened by 5.",
      "After 2 clears, 4 lifts to the top of the key to receive from 3, as 1 lifts to fill 4's original spot.",
      "3 runs to the low block, uses a screen from 2, and continues to the opposite low block. At the same time, 4 reverses the ball back to 1.",
      "5 sets the first screen and 4 sets the one behind him, staggered for 2, who curls up to the top for the catch-and-shoot — or all the way to the rim if the defense chases.",
    ],
    diagram: {
      players: [
        { id: "1", label: "1", x: 66, y: 71 },
        { id: "2", label: "2", x: 34, y: 71 },
        { id: "3", label: "3", x: 90, y: 54 },
        { id: "4", label: "4", x: 10, y: 54 },
        { id: "5", label: "5", x: 50, y: 45 },
      ],
      actions: [
        { type: "pass", from: { x: 66, y: 71 }, to: { x: 90, y: 54 } },
        { type: "cut", path: [{ x: 66, y: 71 }, { x: 50, y: 45 }, { x: 30, y: 8 }] },
        { type: "screen", at: { x: 50, y: 45 }, angle: 0 },
        { type: "cut", path: [{ x: 34, y: 71 }, { x: 50, y: 45 }, { x: 70, y: 8 }] },
        { type: "cut", path: [{ x: 10, y: 54 }, { x: 50, y: 64 }] },
        { type: "pass", from: { x: 90, y: 54 }, to: { x: 50, y: 64 } },
        { type: "cut", path: [{ x: 30, y: 8 }, { x: 15, y: 40 }, { x: 10, y: 54 }] },
        { type: "cut", path: [{ x: 90, y: 54 }, { x: 70, y: 15 }, { x: 30, y: 8 }] },
        { type: "screen", at: { x: 70, y: 8 }, angle: 90 },
        { type: "pass", from: { x: 50, y: 64 }, to: { x: 10, y: 54 } },
        { type: "cut", path: [{ x: 50, y: 64 }, { x: 55, y: 35 }] },
        { type: "cut", path: [{ x: 50, y: 45 }, { x: 60, y: 25 }] },
        { type: "screen", at: { x: 60, y: 25 }, angle: 0 },
        { type: "screen", at: { x: 55, y: 35 }, angle: 0 },
        { type: "cut", path: [{ x: 70, y: 8 }, { x: 68, y: 22 }, { x: 63, y: 38 }, { x: 50, y: 55 }] },
        { type: "pass", from: { x: 10, y: 54 }, to: { x: 50, y: 55 } },
      ],
    },
    steps: [
      {
        title: "Initial Alignment",
        narrative: "1 and 2 start outside the three-point line, at the extension of the sides of the box. 3 and 4 are on the wings, slightly above the extension of the free-throw line and outside the three-point line. 5 holds the high post. 1 has the ball.",
        players: [
          { id: "1", label: "1", x: 66, y: 71 },
          { id: "2", label: "2", x: 34, y: 71 },
          { id: "3", label: "3", x: 90, y: 54 },
          { id: "4", label: "4", x: 10, y: 54 },
          { id: "5", label: "5", x: 50, y: 45 },
        ],
        actions: [],
      },
      {
        title: "1 Cuts Off 5's Screen",
        narrative: "1 passes to 3 and cuts in front of 5 to the opposite low block, using 5 as a screen. This also opens a driving lane for 3 if the defense helps off to cover the cutter.",
        players: [
          { id: "1", label: "1", x: 30, y: 8 },
          { id: "2", label: "2", x: 34, y: 71 },
          { id: "3", label: "3", x: 90, y: 54 },
          { id: "4", label: "4", x: 10, y: 54 },
          { id: "5", label: "5", x: 50, y: 45 },
        ],
        actions: [
          { type: "pass", from: { x: 66, y: 71 }, to: { x: 90, y: 54 } },
          { type: "cut", path: [{ x: 66, y: 71 }, { x: 50, y: 45 }, { x: 30, y: 8 }] },
          { type: "screen", at: { x: 50, y: 45 }, angle: 0 },
        ],
      },
      {
        title: "2 Cuts Off 5's Screen",
        narrative: "After 1 clears the middle, 2 cuts in front of 5 to the opposite low block the same way, also screened by 5.",
        players: [
          { id: "1", label: "1", x: 30, y: 8 },
          { id: "2", label: "2", x: 70, y: 8 },
          { id: "3", label: "3", x: 90, y: 54 },
          { id: "4", label: "4", x: 10, y: 54 },
          { id: "5", label: "5", x: 50, y: 45 },
        ],
        actions: [
          { type: "cut", path: [{ x: 34, y: 71 }, { x: 50, y: 45 }, { x: 70, y: 8 }] },
          { type: "screen", at: { x: 50, y: 45 }, angle: 0 },
        ],
      },
      {
        title: "4 Lifts, 1 Fills",
        narrative: "After 2 clears, 4 lifts to the top of the key and receives the ball from 3. At the same time, 1 lifts from the block to fill 4's original spot.",
        players: [
          { id: "1", label: "1", x: 10, y: 54 },
          { id: "2", label: "2", x: 70, y: 8 },
          { id: "3", label: "3", x: 90, y: 54 },
          { id: "4", label: "4", x: 50, y: 64 },
          { id: "5", label: "5", x: 50, y: 45 },
        ],
        actions: [
          { type: "cut", path: [{ x: 10, y: 54 }, { x: 50, y: 64 }] },
          { type: "pass", from: { x: 90, y: 54 }, to: { x: 50, y: 64 } },
          { type: "cut", path: [{ x: 30, y: 8 }, { x: 15, y: 40 }, { x: 10, y: 54 }] },
        ],
      },
      {
        title: "3 Cuts Off 2's Screen, Ball Reverses",
        narrative: "3 runs to the low block, uses a screen from 2, and continues to the opposite low block. At the same time, 4 reverses the ball back to 1.",
        players: [
          { id: "1", label: "1", x: 10, y: 54 },
          { id: "2", label: "2", x: 70, y: 8 },
          { id: "3", label: "3", x: 30, y: 8 },
          { id: "4", label: "4", x: 50, y: 64 },
          { id: "5", label: "5", x: 50, y: 45 },
        ],
        actions: [
          { type: "cut", path: [{ x: 90, y: 54 }, { x: 70, y: 15 }, { x: 30, y: 8 }] },
          { type: "screen", at: { x: 70, y: 8 }, angle: 90 },
          { type: "pass", from: { x: 50, y: 64 }, to: { x: 10, y: 54 } },
        ],
      },
      {
        title: "Staggered Screen",
        narrative: "5 sets the first screen and 4 sets the one behind him, staggered for 2, who curls up to the top for the catch-and-shoot — or all the way to the rim if the defense chases over the top.",
        players: [
          { id: "1", label: "1", x: 10, y: 54 },
          { id: "2", label: "2", x: 50, y: 55 },
          { id: "3", label: "3", x: 30, y: 8 },
          { id: "4", label: "4", x: 55, y: 35 },
          { id: "5", label: "5", x: 60, y: 25 },
        ],
        actions: [
          { type: "cut", path: [{ x: 50, y: 64 }, { x: 55, y: 35 }] },
          { type: "cut", path: [{ x: 50, y: 45 }, { x: 60, y: 25 }] },
          { type: "screen", at: { x: 60, y: 25 }, angle: 0 },
          { type: "screen", at: { x: 55, y: 35 }, angle: 0 },
          { type: "cut", path: [{ x: 70, y: 8 }, { x: 68, y: 22 }, { x: 63, y: 38 }, { x: 50, y: 55 }] },
          { type: "pass", from: { x: 10, y: 54 }, to: { x: 50, y: 55 } },
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
  {
    id: "2-3-zone",
    name: "2-3 Zone Defense",
    category: "Zone Defense",
    source: "https://www.coachesclipboard.net/23zonedefense.html",
    summary: "The standard, low-risk zone: two guards up top, two forwards on the wings, and a center anchoring the rim — packs the paint and controls tempo at the cost of the perimeter.",
    overview: "The 2-3 zone is the most common zone in the sport for a reason: it's simple to teach, it keeps your tallest players near the basket where they do the most good, and it takes away dribble penetration and the inside post game almost by default. Unlike the 1-3-1, it isn't built to gamble for steals — it's built to make the offense beat you with outside shots rather than easy looks at the rim. The trade-off is exactly that: the wings, the point, and the high post are all soft spots, so it lives or dies on ball pressure up top and disciplined rotations underneath, especially the center's slide to the block whenever the ball goes to the corner.",
    strengths: [
      "Protects the paint and the defensive glass — your post players stay home near the rim instead of chasing shooters.",
      "Shuts down dribble penetration through the middle and takes away the inside post game.",
      "Low foul risk and low fitness demand compared to the 1-3-1 — easy to play for a full game.",
      "Controls tempo and is simple to teach, so it's reliable even with less practice time.",
    ],
    weaknesses: [
      "Vulnerable to outside shooting — the wings, the top of the key, and the high post are all open by design.",
      "A skip pass or a good high-post feed can collapse the shape quickly if the rotations are slow.",
      "Offers no ball pressure by default, which gives good perimeter shooting teams all the time they need.",
      "Rebounding on the wings/corners is a scramble — nobody has a specific man to box out.",
    ],
    rules: [
      "Never let the ball-handler split the two guards and drive straight through the gap between them — that's the one shot the zone can't give up.",
      "On any pass to the corner, the center slides immediately to the vacated low block — a slow center rotation there is the single most common way this zone gets scored on.",
      "Forwards defend with their back roughly to the baseline, low stance, head on a swivel — watching the ball and the cutters behind them at the same time.",
      "Move on the ball's flight, not after the catch — rotations are a step late if they start once the pass has already arrived.",
      "Ball reversals are covered with quick \"on-the-line, up-the-line\" bump movements between neighboring defenders, not a mad scramble.",
    ],
    positions: [
      { label: "TL/TR", name: "Guards", desc: "The top two defenders, lined up roughly elbow to elbow above the key. Whoever is ball-side pressures and contains; the other guard shifts to cover the gap left behind and the high post — the two of them never both chase the ball at once." },
      { label: "WL/WR", name: "Forwards", desc: "The two wing defenders, set up at short-corner/wing height. Ball-side forward closes out on the wing or corner; weak-side forward holds the far side, reading the skip pass and ready to help." },
      { label: "C", name: "Center", desc: "The lone low defender, anchored at the front of the rim between the two forwards. Protects the basket on post touches and slides block-to-block the instant the ball reaches either corner." },
    ],
    baseDiagram: {
      players: [
        { id: "TL", label: "TL", team: "defense", x: 32, y: 62 },
        { id: "TR", label: "TR", team: "defense", x: 68, y: 62 },
        { id: "WL", label: "WL", team: "defense", x: 12, y: 30 },
        { id: "WR", label: "WR", team: "defense", x: 88, y: 30 },
        { id: "C", label: "C", team: "defense", x: 50, y: 14 },
      ],
    },
    reads: [
      {
        title: "Ball at the Top",
        narrative: "Base alignment. The two guards line up roughly elbow to elbow above the key — never so far apart that a ball-handler can drive straight through the gap between them. The forwards hold the wings at short-corner height, and the center sits low at the front of the rim, protecting the basket and ready to step up to either block.",
        diagram: {
          players: [
            { id: "TL", label: "TL", team: "defense", x: 32, y: 62 },
            { id: "TR", label: "TR", team: "defense", x: 68, y: 62 },
            { id: "WL", label: "WL", team: "defense", x: 12, y: 30 },
            { id: "WR", label: "WR", team: "defense", x: 88, y: 30 },
            { id: "C", label: "C", team: "defense", x: 50, y: 14 },
          ],
          ball: { x: 50, y: 75 },
        },
      },
      {
        title: "Ball on the Wing",
        narrative: "When the ball goes to a wing, the ball-side guard closes out hard to contain it and cut off the baseline drive angle. The opposite guard slides across to cover the gap left at the top and the high post — he's on the gap, not chasing air. The ball-side forward stays low, holding the corner and baseline rather than jumping out at the ball. The center shifts a step toward the ball side but stays anchored near the rim, and the weak-side forward shades in toward the paint, reading for a skip pass across.",
        diagram: {
          players: [
            { id: "TL", label: "TL", team: "defense", x: 20, y: 45 },
            { id: "TR", label: "TR", team: "defense", x: 48, y: 55 },
            { id: "WL", label: "WL", team: "defense", x: 10, y: 24 },
            { id: "WR", label: "WR", team: "defense", x: 78, y: 20 },
            { id: "C", label: "C", team: "defense", x: 40, y: 14 },
          ],
          ball: { x: 15, y: 45 },
        },
      },
      {
        title: "Ball in the Corner",
        narrative: "If the ball is thrown into the corner, the ball-side forward closes out to take it away, denying the baseline. The center's job is to slide immediately to the low block that forward just vacated — the most important rotation in the whole zone, since a slow center here means an easy pass and lay-up underneath. The ball-side guard drops down to deny the pass back out to the wing, the weak-side guard shifts toward the middle to cover the high post, and the weak-side forward stays home on the far side, reading the skip pass.",
        diagram: {
          players: [
            { id: "TL", label: "TL", team: "defense", x: 25, y: 35 },
            { id: "TR", label: "TR", team: "defense", x: 55, y: 48 },
            { id: "WL", label: "WL", team: "defense", x: 10, y: 12 },
            { id: "WR", label: "WR", team: "defense", x: 88, y: 28 },
            { id: "C", label: "C", team: "defense", x: 25, y: 13 },
          ],
          ball: { x: 8, y: 15 },
        },
      },
      {
        title: "Ball Reverses to the Weak Side",
        narrative: "On a swing pass back through the top and out to the opposite side, the whole zone mirrors itself. The forward on the new ball side closes out to contain it, the guard on that side steps down to cover the gap and high post, and the center slides back across the front of the rim to anchor the new ball side. The forward who had been containing the ball now drops away to become the new weak-side defender, reading for the next skip pass.",
        diagram: {
          players: [
            { id: "TL", label: "TL", team: "defense", x: 52, y: 55 },
            { id: "TR", label: "TR", team: "defense", x: 80, y: 45 },
            { id: "WL", label: "WL", team: "defense", x: 20, y: 20 },
            { id: "WR", label: "WR", team: "defense", x: 90, y: 25 },
            { id: "C", label: "C", team: "defense", x: 60, y: 14 },
          ],
          ball: { x: 85, y: 45 },
        },
      },
    ],
  },
];

// Drill library. `diagrams` (optional) are static court snapshots — no steps
// or animation needed, just illustrative alignments — shown side by side on
// the drill's detail page.
const DRILLS = [
  {
    id: "shell-drill",
    name: "Shell Drill",
    category: "Defense",
    source: "https://www.basketballforcoaches.com/shell-drill-basketball/",
    summary: "Progressive 4-on-4 half-court drill for teaching team defense: ball-you-man positioning, deny, help side on the split line, and closeouts.",
    objective: "Teach team defense and off-ball positioning — help side, one-pass-away denial, rotations, and closeouts — through controlled, repeatable reps instead of live scrimmage chaos.",
    setup: "4 offensive players spaced around the three-point arc: two guards up top (slots) and two wings, each matched by a defender. No live offense at first — the ball just moves player to player. 3-on-3 and 5-on-5 versions of the same shape work too.",
    steps: [
      "Walk-through: coach places each defender in the correct position for where the ball currently is, so the shape is understood before anyone moves.",
      "Ball movement: offense passes around the perimeter (holding the ball ~3 seconds per catch) while defenders adjust their positioning on every pass — no dribbling, no defense pressuring the pass.",
      "Add closeouts: on each catch, the on-ball defender sprints out and closes out under control (chop steps, high hand, low base) instead of just being placed there.",
      "Live phase: offense rotates the ball around the perimeter twice, then the drill goes live 4-on-4 with a defensive-only point of emphasis — offense can drive and score, but the coaching focus stays on the defense's shape and rotations.",
    ],
    coachingPoints: [
      "Ball-you-man: every defender should be able to see both their matchup and the ball at all times — point with the non-denying hand to reinforce this with younger players.",
      "Call it out loud: standard defensive calls — \"ball\", \"deny\", \"help\" — should be communicated on every pass, not just known silently.",
      "On-ball defender pressures without fouling or over-committing; one-pass-away defender denies with a hand in the passing lane; the two help-side defenders sit on the split line (the imaginary line through the ball and the rim) so they can help a driver and still recover to their own man.",
      "The farther a help defender is from the ball, the deeper into the paint they sit — the farthest player is the last line of help at the rim.",
    ],
    diagrams: [
      {
        title: "Ball on Wing",
        diagram: {
          players: [
            { id: "p1", label: "1", team: "offense", x: 62, y: 70 },
            { id: "p2", label: "2", team: "offense", x: 38, y: 70 },
            { id: "p3", label: "3", team: "offense", x: 88, y: 45 },
            { id: "p4", label: "4", team: "offense", x: 12, y: 45 },
            { id: "x3", label: "x3", team: "defense", x: 80, y: 38 },
            { id: "x1", label: "x1", team: "defense", x: 72, y: 58 },
            { id: "x2", label: "x2", team: "defense", x: 50, y: 45 },
            { id: "x4", label: "x4", team: "defense", x: 50, y: 25 },
          ],
          ball: { x: 88, y: 45 },
        },
      },
      {
        title: "Ball in Slot",
        diagram: {
          players: [
            { id: "p1", label: "1", team: "offense", x: 62, y: 70 },
            { id: "p2", label: "2", team: "offense", x: 38, y: 70 },
            { id: "p3", label: "3", team: "offense", x: 88, y: 45 },
            { id: "p4", label: "4", team: "offense", x: 12, y: 45 },
            { id: "x1", label: "x1", team: "defense", x: 58, y: 62 },
            { id: "x3", label: "x3", team: "defense", x: 78, y: 52 },
            { id: "x4", label: "x4", team: "defense", x: 25, y: 50 },
            { id: "x2", label: "x2", team: "defense", x: 50, y: 55 },
          ],
          ball: { x: 62, y: 70 },
        },
      },
    ],
  },
];

// Last season's top-scorer stats for the team, sourced from basketball-bund.net
// ("Beste Werfer", BBW1 Kreisliga A Männer, Senioren Rhein/Neckar). Two players
// have their names withheld by the league itself (shown as **** / *** in the
// source) — kept as `null` here rather than guessed, and rendered as
// "Name withheld".
const PLAYER_STATS = {
  season: "2025/2026",
  league: "BBW1 Kreisliga A Männer (Senioren Rhein/Neckar)",
  standDate: "2026-04-20",
  source: "http://basketball-bund.net",
  players: [
    { rank: 1, lastName: "Köhler", firstName: "Jannik", points: 169, games: 8, average: 21.1 },
    { rank: 2, lastName: "Blättel", firstName: "Oliver", points: 80, games: 17, average: 4.7 },
    { rank: 3, lastName: "Neureither", firstName: "Lasse", points: 66, games: 8, average: 8.2 },
    { rank: 4, lastName: "Tshiang", firstName: "Luciano", points: 58, games: 7, average: 8.3 },
    { rank: 5, lastName: "Balog", firstName: "Zoltan", points: 53, games: 17, average: 3.1 },
    { rank: 6, lastName: "Kühnau", firstName: "René", points: 51, games: 14, average: 3.6 },
    { rank: 7, lastName: "Baglaroglu", firstName: "Faruk", points: 37, games: 8, average: 4.6 },
    { rank: 8, lastName: "Merten", firstName: "Thomas", points: 16, games: 3, average: 5.3 },
    { rank: 9, lastName: "Velarde", firstName: "James Andrew", points: 16, games: 5, average: 3.2 },
    { rank: 10, lastName: "Rieger", firstName: "Lukas", points: 12, games: 8, average: 1.5 },
    { rank: 11, lastName: "Hauck", firstName: "Axel", points: 4, games: 2, average: 2.0 },
    { rank: 12, lastName: "Balog", firstName: "Adam", points: 3, games: 7, average: 0.4 },
    // New to the team this season — no games played with KuSG Leimen 3 yet,
    // so stats are 0. `newcomer: true` draws the "Newcomers" separator above
    // the first one on the players page.
    { rank: 13, lastName: "Haïne", firstName: "Ishak", points: 0, games: 0, average: 0, newcomer: true },
    { rank: 14, lastName: "Noman", firstName: "Danyel", points: 0, games: 0, average: 0, newcomer: true },
    { rank: 15, lastName: "Efimov", firstName: "Elijas", points: 0, games: 0, average: 0, newcomer: true },
    { rank: 16, lastName: "Großmann", firstName: "Rafael", points: 0, games: 0, average: 0, newcomer: true },
  ],
};
