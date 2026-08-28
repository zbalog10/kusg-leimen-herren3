// Most editable content lives in this file — add, remove, or edit entries
// below and the pages render automatically from these arrays. See README.md
// for the diagram coordinate format (x/y both run 0-100 as % of the court's
// own width/length, hoop at y=0; the free-throw line sits at y=41.4).
// Exception: SET_PLAYS lives in js/plays-data.js, not here — it's only
// loaded after the Set Plays password gate unlocks (see main.js).

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
    walkthrough: { name: "Offensive System Walk-Through", time: "10 min", desc: "Low intensity, no conditioning focus. Review basic spacing, player positions, first option/first action, key cuts and screens, and transition into the half-court offense. 2–3 repetitions each side without defense." },
    warmup: "10 min movement with ball: jogging/dribbling, lateral dribble, retreat dribble, change of direction, layups, progressive full-court runs, then 5 min individual stretching.",
    drills: [
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
  {
    id: "week4-basketball-tuneup",
    title: "Session 8 — Basketball Tune-Up",
    date: "2026-09-14",
    time: "18:30",
    location: "Fritz-Zugck-Halle, Leimen",
    category: "Team",
    duration: "95 min",
    objective: "Walk through the offensive system, then blend transition offense, advantage situations, high-intensity defense, and live 5-on-5 as the final tune-up before the season starts.",
    walkthrough: { name: "Offensive System Walk-Through", time: "10 min", desc: "Low intensity, no conditioning focus. Review basic spacing, player positions, first option/first action, key cuts and screens, and transition into the half-court offense. 2–3 repetitions each side without defense." },
    warmup: "10 min dynamic warm-up + ballhandling, then 5 min individual stretching.",
    drills: [
      { name: "Fast Break / Transition", time: "15 min", desc: "Continuous fast-break and transition work." },
      { name: "Advantage Situations", time: "15 min", desc: "2v1, 3v2, 4v3." },
      { name: "High-Intensity Defensive Work", time: "15 min", desc: "Closeouts, help and recover, shell drill, transition defence." },
      { name: "5-on-5", time: "20–25 min", desc: "4 × 5 min at high intensity." },
    ],
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

// Defensive schemes. Same coordinate system as SET_PLAYS (now in
// js/plays-data.js). Diagram players use
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
