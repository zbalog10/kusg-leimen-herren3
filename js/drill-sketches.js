// Court sketches for the drills adapted from "Breakthrough Basketball Drills".
// Loaded after data.js; attaches a `diagrams` list to every drill that has none.
// Coordinates: x 0-100 sideline to sideline, y 0 = baseline (hoop at ~11),
// y 100 = half-court line; with fullCourt: true, y runs 0-200 (far basket at ~189).
(function () {
  if (typeof DRILLS === "undefined") return;

  const o = (l, x, y) => ({ id: `${l}@${x},${y}`, label: String(l), team: "offense", x, y });
  const d = (l, x, y) => ({ id: `${l}@${x},${y}`, label: String(l), team: "defense", x, y });
  const pts = (a) => a.map(([x, y]) => ({ x, y }));
  const cut = (...a) => ({ type: "cut", path: pts(a) });
  const mv = (...a) => ({ type: "move", path: pts(a) });
  const ps = (a, b) => ({ type: "pass", from: { x: a[0], y: a[1] }, to: { x: b[0], y: b[1] } });
  const scr = (x, y, angle = 0) => ({ type: "screen", at: { x, y }, angle });
  const guide = (a, b) => ({ type: "line", from: { x: a[0], y: a[1] }, to: { x: b[0], y: b[1] } });
  const cn = (x, y) => ({ x, y });
  const bl = (x, y) => ({ x: x + 4, y: y - 3 }); // ball drawn beside a player
  const S = (title, players, actions = [], extra = {}) => ({ title, diagram: { players, actions, ...extra } });
  const ring = (cx, cy, r, n, start = 0) =>
    Array.from({ length: n }, (_, i) => [cx + r * Math.cos(start + (2 * Math.PI * i) / n), cy + r * Math.sin(start + (2 * Math.PI * i) / n)]);

  const RIM = [50, 12];
  const FULL = { fullCourt: true };
  const SK = {};

  SK["form-shooting"] = [
    S("Setup — up to three players per basket, about two feet from the rim",
      [o(1, 33, 17), o(2, 67, 17), o(3, 50, 27)],
      [ps([50, 27], [50, 14])],
      { balls: [bl(33, 17), bl(67, 17), bl(50, 27)] }),
  ];

  SK["partner-shooting"] = [
    S("Player 2 passes, Player 1 shoots, Player 2 relocates",
      [o(1, 78, 40), o(2, 58, 18)],
      [ps([58, 18], [78, 40]), ps([78, 40], RIM), cut([58, 18], [40, 28], [24, 36])],
      { ball: bl(58, 18) }),
    S("Roles swap: Player 1 relocates, Player 2 shoots",
      [o(1, 50, 30), o(2, 24, 36)],
      [ps([50, 30], [24, 36]), ps([24, 36], RIM), cut([50, 30], [64, 40], [80, 46])],
      { ball: bl(50, 30) }),
  ];

  SK["knockout"] = [
    S("Single file at the free-throw line; the first two have a ball",
      [o(1, 50, 46), o(2, 50, 54), o(3, 50, 62), o(4, 50, 70)],
      [ps([50, 46], RIM)],
      { balls: [bl(50, 46), bl(50, 54)] }),
  ];

  SK["half-moon"] = [
    S("Two teams around the arc at each end — shoot, follow, pass to the next player and close out",
      [
        o(1, 8, 12), o(2, 14, 40), o(3, 30, 55), o(4, 50, 62), o(5, 70, 55), o(6, 86, 40), o(7, 92, 12),
        d(1, 8, 188), d(2, 14, 160), d(3, 30, 145), d(4, 50, 138), d(5, 70, 145), d(6, 86, 160), d(7, 92, 188),
      ],
      [ps([8, 12], RIM), ps([8, 12], [14, 40]), ps([8, 188], [50, 188]), ps([8, 188], [14, 160])],
      { ...FULL, balls: [bl(8, 12), bl(8, 188)] }),
  ];

  SK["jumpers-and-free-throws"] = [
    S("Three teams: jump shot, then a layup (make) or a sprint to the other end for a free throw (miss)",
      [o("A", 50, 46), o("A", 50, 53), o("A", 50, 60), o("B", 24, 50), o("B", 22, 57), o("C", 76, 50), o("C", 78, 57)],
      [ps([50, 46], RIM), mv([50, 46], [50, 100], [50, 150]), ps([50, 156], [50, 189])],
      { ...FULL, balls: [cn(45, 159), cn(50, 159), cn(55, 159)] }),
  ];

  SK["pass-and-relocate"] = [
    S("Pass into the post, relocate to the corner, take the return pass and shoot",
      [o(1, 80, 45), o(2, 62, 21)],
      [ps([80, 45], [62, 21]), cut([80, 45], [92, 24], [92, 10]), ps([62, 21], [92, 10])],
      { ball: bl(80, 45) }),
    S("Pass in again, run back to the wing, shoot off the return pass",
      [o(1, 92, 10), o(2, 62, 21)],
      [ps([92, 10], [62, 21]), cut([92, 10], [92, 30], [80, 45]), ps([62, 21], [80, 45])],
      { ball: bl(92, 10) }),
  ];

  SK["bang-bang"] = [
    S("Pass fake, overhead pass to the point, chest pass to the other wing, shoot",
      [o(1, 14, 45), o(2, 8, 53), o(3, 50, 62), o(4, 50, 70), o(5, 86, 45), o(6, 92, 53)],
      [ps([14, 45], [50, 62]), ps([50, 62], [86, 45]), ps([86, 45], RIM)],
      { ball: bl(14, 45) }),
  ];

  SK["pull-up-jumpers"] = [
    S("One hard dribble to the elbow, pull up and shoot; the next player goes when the first gathers the rebound",
      [o(1, 50, 66), o(2, 50, 74), o(3, 50, 82), o(4, 50, 90)],
      [mv([50, 66], [38, 46]), ps([38, 46], RIM)],
      { balls: [bl(50, 66), bl(50, 74)] }),
  ];

  SK["cut-curl"] = [
    S("Pass to the coach, cut to the basket, pop out, curl around the cones and shoot off the last pass",
      [o(1, 10, 46), o(2, 10, 54), o(3, 10, 62), d("C", 50, 63)],
      [ps([10, 46], [50, 63]), cut([10, 46], [34, 28], [44, 16], [34, 30], [42, 36], [50, 43]), ps([50, 63], [50, 43]), ps([50, 43], RIM)],
      { cones: [cn(30, 24), cn(58, 28), cn(38, 41)], ball: bl(10, 46) }),
  ];

  SK["fast-break-shooting-bb"] = [
    S("Corner players pass to the elbows; elbows and free-throw-line player shoot",
      [o(5, 8, 12), o(4, 92, 12), o(3, 34, 41), o(2, 66, 41), o(1, 50, 41), o(6, 8, 188), o(7, 92, 188)],
      [ps([8, 12], [34, 41]), ps([92, 12], [66, 41]), ps([34, 41], RIM), ps([66, 41], RIM), ps([50, 41], RIM)],
      { ...FULL, balls: [bl(8, 12), bl(92, 12), bl(50, 41)] }),
    S("Outlet, run three lanes to the other end; waiting corner players pass to the wings for jump shots",
      [o(1, 50, 41), o(5, 8, 12), o(4, 92, 12), o(6, 8, 188), o(7, 92, 188)],
      [ps([50, 41], [8, 12]), mv([8, 12], [50, 100], [50, 160]), cut([50, 41], [24, 100], [28, 160]), cut([92, 12], [84, 100], [76, 160]), ps([8, 188], [28, 160]), ps([92, 188], [76, 160])],
      { ...FULL, ball: bl(50, 41) }),
  ];

  SK["penetrate-and-kick"] = [
    S("Ball reversal: fake, overhead pass to the point, chest pass to the far wing",
      [o(1, 14, 45), o(2, 8, 53), o(3, 50, 62), o(4, 50, 70), o(5, 86, 45), o(6, 92, 53)],
      [ps([14, 45], [50, 62]), ps([50, 62], [86, 45])],
      { ball: bl(14, 45) }),
    S("The wing attacks the middle and kicks out to the opposite wing for the shot",
      [o(1, 14, 45), o(2, 8, 53), o(3, 50, 62), o(4, 50, 70), o(5, 86, 45), o(6, 92, 53)],
      [mv([86, 45], [64, 32]), ps([64, 32], [14, 45]), ps([14, 45], RIM)],
      { ball: bl(86, 45) }),
  ];

  SK["above-ground"] = [
    S("Three lanes run the court passing; jump shot at the other end — the ball must not touch the floor",
      [o(1, 20, 8), o(2, 50, 8), o(3, 80, 8), o(4, 50, 15), o(5, 50, 22)],
      [mv([20, 8], [20, 130]), mv([80, 8], [80, 130]), mv([50, 8], [50, 130]), ps([50, 40], [20, 80]), ps([20, 90], [80, 130]), ps([50, 150], [50, 189])],
      { ...FULL, balls: [bl(50, 8), bl(50, 15), bl(50, 22)] }),
  ];

  SK["rapid-fire-3-ball"] = [
    S("Shooters shoot, move to a new spot behind the arc and call for the ball",
      [o(1, 8, 24), o(2, 50, 66), o(3, 92, 24), d("R", 38, 14), d("R", 62, 14), d("R", 50, 22)],
      [mv([8, 24], [24, 52]), mv([50, 66], [72, 58]), mv([92, 24], [76, 50]), ps([38, 14], [8, 24]), ps([62, 14], [92, 24]), ps([50, 22], [50, 66])],
      { balls: [bl(8, 24), bl(50, 66), bl(92, 24)] }),
  ];

  SK["one-on-one-rebounding"] = [
    S("Player 1 keeps Player 2 off the ball for 3 seconds",
      [o(1, 50, 36), d(2, 50, 44)],
      [cut([50, 44], [50, 24])],
      { ball: cn(50, 20) }),
  ];

  SK["the-rebound-game"] = [
    S("Three defenders box out three offensive players while the elbow players pass and then shoot",
      [d(1, 42, 22), d(2, 58, 22), d(3, 50, 28), o(1, 28, 28), o(2, 72, 28), o(3, 50, 37), o("C", 34, 42), o("C", 66, 42)],
      [ps([34, 42], [66, 42]), ps([66, 42], RIM)],
      { ball: bl(34, 42) }),
  ];

  SK["numbers-game"] = [
    S("Offense has ten seconds to get open; otherwise a miss goes up and defenders find and box out their man",
      [o(1, 36, 22), o(2, 64, 22), d(1, 40, 27), d(2, 60, 27), o("P", 50, 43)],
      [ps([50, 43], RIM)],
      { ball: bl(50, 43) }),
  ];

  SK["rebound-machine"] = [
    S("2 throws up a miss; 1 rebounds with two feet and tips or finishes on the other side of the hoop",
      [o(1, 36, 16), o(2, 50, 24), o(3, 72, 18)],
      [ps([50, 24], RIM), cut([36, 16], [44, 12], [58, 15])],
      { ball: bl(50, 24) }),
    S("Rotate clockwise and go again",
      [o(1, 50, 24), o(2, 72, 18), o(3, 36, 16)],
      [mv([36, 16], [50, 24]), mv([50, 24], [72, 18]), mv([72, 18], [36, 16])],
      { ball: bl(50, 24) }),
  ];

  SK["two-man-boxout"] = [
    S("4 passes to 2, who shoots; 1 boxes out 3 away from the ball",
      [o(1, 50, 31), o(2, 34, 42), o(3, 66, 42), o(4, 50, 62)],
      [ps([50, 62], [34, 42]), ps([34, 42], RIM), cut([50, 31], [58, 38], [64, 40])],
      { ball: bl(50, 62) }),
    S("1 rebounds, passes to 2 and boxes out the shooter",
      [o(1, 50, 24), o(2, 34, 42), o(3, 66, 42), o(4, 50, 62)],
      [ps([50, 24], [34, 42]), ps([34, 42], RIM), cut([50, 24], [40, 36])],
      { ball: bl(50, 24) }),
  ];

  SK["be-aggressive"] = [
    S("Coach throws up a miss from the free-throw line; the rebounder goes straight back up, no dribble",
      [o(1, 50, 24), o(2, 38, 18), o(3, 62, 18), o(4, 14, 60), o(5, 14, 68), d("C", 50, 42)],
      [ps([50, 42], RIM), cut([50, 24], [48, 15])],
      { ball: bl(50, 42) }),
  ];

  SK["jump-stop-drill"] = [
    S("Players 5 feet apart on the baseline, running at 3/4 speed; whistle = jump stop and pivot",
      [o(1, 7, 6), o(2, 21, 6), o(3, 35, 6), o(4, 49, 6), o(5, 63, 6), o(6, 77, 6), o(7, 91, 6)],
      [mv([7, 6], [7, 90]), mv([21, 6], [21, 90]), mv([35, 6], [35, 90]), mv([49, 6], [49, 90]), mv([63, 6], [63, 90]), mv([77, 6], [77, 90]), mv([91, 6], [91, 90])],
      { balls: [bl(7, 6), bl(21, 6), bl(35, 6), bl(49, 6), bl(63, 6), bl(77, 6), bl(91, 6)] }),
  ];

  SK["partner-dribble-pass-pivot-pass"] = [
    S("Dribble past the partner, jump stop, pivot with a ball swing, pass back and close out on him",
      [o(1, 20, 8), d(1, 20, 16), o(2, 50, 8), d(2, 50, 16), o(3, 80, 8), d(3, 80, 16)],
      [mv([20, 8], [20, 38]), ps([20, 38], [20, 18]), mv([50, 8], [50, 38]), ps([50, 38], [50, 18]), mv([80, 8], [80, 38]), ps([80, 38], [80, 18])],
      { balls: [bl(20, 8), bl(50, 8), bl(80, 8)] }),
  ];

  SK["all-around-offensive-footwork"] = [
    S("Cut 1 — slash and seal: pass to the point, run to the block, cut out to the wing",
      [o(3, 86, 45), o(1, 50, 62)],
      [ps([86, 45], [50, 62]), cut([86, 45], [68, 22], [66, 30], [88, 44]), ps([50, 62], [88, 44])],
      { ball: bl(86, 45) }),
    S("Cut 2 — triangle cut: basket, block, elbow, back out to the wing",
      [o(3, 86, 45), o(1, 50, 62)],
      [cut([86, 45], [58, 16], [66, 22], [66, 40], [86, 46]), ps([50, 62], [86, 46])],
      { ball: bl(50, 62) }),
    S("Cut 3 — back cut: drift toward the baseline, sprint to the wing, cut backdoor for the layup",
      [o(3, 92, 20), o(1, 50, 62)],
      [cut([92, 20], [86, 45], [66, 30], [54, 13]), ps([50, 62], [54, 14])],
      { ball: bl(50, 62) }),
  ];

  SK["two-ball-wing-cuts"] = [
    S("Shooter V-cuts, catches a chest pass from the wing and shoots a three; the rebounder feeds the passer the second ball",
      [o("S", 62, 62), o("P", 22, 50), o("R", 50, 20)],
      [cut([62, 62], [52, 50], [62, 62]), ps([22, 50], [62, 60]), ps([62, 60], RIM), ps([50, 20], [22, 50])],
      { balls: [bl(22, 50), bl(50, 20)] }),
  ];

  SK["two-ball-down-screens"] = [
    S("Shooter comes off an imaginary down screen to the wing and shoots off the pass from the top",
      [o("S", 62, 17), o("P", 50, 64), o("R", 38, 14)],
      [scr(68, 28, 0), cut([62, 17], [64, 34], [84, 47]), ps([50, 64], [84, 47]), ps([84, 47], RIM), ps([38, 14], [50, 64])],
      { balls: [bl(50, 64), bl(38, 14)] }),
  ];

  SK["two-ball-back-picks"] = [
    S("Shooter flares off a back pick, V-cuts toward the sideline and shoots a three off the lob pass",
      [o("S", 82, 42), o("P", 50, 62), o("R", 36, 14)],
      [scr(76, 30, 20), cut([82, 40], [72, 36], [94, 46]), ps([50, 62], [94, 46]), ps([94, 46], RIM), ps([36, 14], [50, 62])],
      { balls: [bl(50, 62), bl(36, 14)] }),
  ];

  SK["two-ball-skip-passes"] = [
    S("The point dribbles at the wing; the wing slides to the opposite side; skip pass and three",
      [o("S", 84, 48), o("P", 50, 62), o("R", 40, 14)],
      [mv([50, 62], [70, 58]), cut([84, 48], [58, 66], [16, 48]), ps([70, 58], [16, 48]), ps([16, 48], RIM), ps([40, 14], [50, 62])],
      { balls: [bl(50, 62), bl(40, 14)] }),
  ];

  SK["post-moves"] = [
    S("Two balls beside the hoop: post move and shot at one ball, then the other, then jump rope at the baseline",
      [o(1, 60, 22), o(2, 90, 14), o(3, 90, 22), o(4, 90, 30)],
      [cut([60, 22], [44, 22]), cut([44, 22], [20, 12])],
      { balls: [cn(40, 14), cn(60, 14)], cones: [cn(16, 12)] }),
  ];

  SK["drop-step"] = [
    S("Seal with a wide stance, catch from the wing, drop step and power dribble away from the defender",
      [o("P", 64, 26), d("X", 60, 32), o("W", 86, 44)],
      [ps([86, 44], [64, 26]), mv([64, 26], [56, 15])],
      { ball: bl(86, 44) }),
  ];

  SK["round-the-block"] = [
    S("Turnaround jump shot from one block, rebound, then the other block — pivot toward the middle and toward the baseline",
      [o("P", 64, 20)],
      [ps([64, 20], RIM), cut([64, 20], [50, 30], [36, 20]), ps([36, 20], RIM)],
      { ball: bl(64, 20) }),
  ];

  SK["walton-move"] = [
    S("Head in the defender's chest; the guard dribbles up; sit and spin, then catch and score low",
      [o("P", 36, 28), d("X", 38, 21), o("G", 22, 74)],
      [mv([22, 74], [22, 56]), ps([22, 56], [36, 28]), cut([36, 28], [28, 24], [32, 17])],
      { ball: bl(22, 74) }),
  ];

  SK["post-screen-shoot-and-cut"] = [
    S("Fake a screen from the opposite wing, flash high or low to the ball, shoot and follow",
      [o("P", 14, 46), o(1, 86, 46), o(2, 92, 54), o(3, 92, 62), o("R", 46, 15)],
      [cut([86, 46], [62, 36]), cut([62, 36], [46, 44]), cut([62, 36], [54, 20]), ps([14, 46], [46, 44])],
      { ball: bl(14, 46) }),
  ];

  SK["post-shooting-shape-up"] = [
    S("Set a fake screen with your back to the ball, shape up facing it with a target, catch and shoot",
      [o("P", 14, 46), o(1, 66, 9), o("R", 44, 15)],
      [cut([66, 9], [56, 32]), ps([14, 46], [56, 32]), ps([56, 32], RIM)],
      { ball: bl(14, 46) }),
  ];

  SK["post-shooting-sequence"] = [
    S("Screen the block and shoot off the pass from the top",
      [o(1, 86, 46), o("P", 50, 62), o("R", 44, 16)],
      [cut([86, 46], [64, 22]), ps([50, 62], [64, 24]), ps([64, 24], RIM)],
      { ball: bl(50, 62) }),
    S("Sprint back out to the wing, screen again and shoot; then flash to the free-throw line for the final jumper",
      [o(1, 80, 46), o("P", 14, 46), o("R", 44, 16)],
      [cut([80, 46], [60, 30], [64, 22]), cut([64, 22], [58, 34], [50, 42]), ps([14, 46], [50, 42])],
      { ball: bl(14, 46) }),
  ];

  SK["jump-hook"] = [
    S("Catch above the block, drop step and power dribble, jump hook with the inside shoulder toward the defender",
      [o("P", 64, 26), d("X", 60, 32), o("W", 86, 44)],
      [ps([86, 44], [64, 26]), mv([64, 26], [56, 15]), ps([56, 15], RIM)],
      { ball: bl(86, 44) }),
  ];

  SK["up-and-under"] = [
    S("The defender beats you to the spot: fake the turnaround, take a crossover step under him and finish off the glass",
      [o("P", 36, 24), d("X", 40, 18), o("W", 14, 44)],
      [ps([14, 44], [36, 24]), cut([36, 24], [30, 22], [44, 15], [50, 13])],
      { ball: bl(14, 44) }),
  ];

  SK["reverse-pivot"] = [
    S("Defender directly behind: reverse pivot away to create space for the jumper, or fake and go by",
      [o("P", 64, 27), d("X", 64, 21), o("W", 86, 44)],
      [ps([86, 44], [64, 27]), mv([64, 27], [72, 33]), ps([72, 33], RIM), mv([72, 33], [58, 18])],
      { ball: bl(86, 44) }),
  ];

  SK["king-of-the-court"] = [
    S("Everyone dribbles inside the shrinking area and tries to knock away the others' balls",
      [o(1, 20, 24), o(2, 40, 82), o(3, 62, 30), o(4, 84, 76), o(5, 50, 56), o(6, 22, 62), o(7, 80, 40)],
      [],
      { balls: [bl(20, 24), bl(40, 82), bl(62, 30), bl(84, 76), bl(50, 56), bl(22, 62), bl(80, 40)] }),
  ];

  SK["dribble-relays"] = [
    S("Right hand down, left hand back; the next player goes when the first reaches the line",
      [o(1, 14, 8), o(2, 14, 15), o(3, 86, 8), o(4, 86, 15)],
      [mv([14, 8], [14, 188]), mv([22, 188], [22, 10]), mv([86, 8], [86, 188]), mv([78, 188], [78, 10])],
      { ...FULL, balls: [bl(14, 8), bl(14, 15), bl(86, 8), bl(86, 15)] }),
  ];

  SK["dribble-drive"] = [
    S("A different dribble move at each cone, then sprint to the far end and finish with a layup",
      [o(1, 8, 8), o(2, 8, 15), o(3, 8, 22)],
      [mv([8, 8], [20, 46], [8, 60], [20, 100], [8, 114], [20, 150], [8, 164], [40, 186], [50, 190])],
      { ...FULL, cones: [cn(14, 44), cn(14, 100), cn(14, 152)], ball: bl(8, 8) }),
  ];

  SK["dribble-moves"] = [
    S("Hesitation, hesitation with a hand switch, behind the back — each against a stationary defender",
      [o(1, 12, 6), o(2, 26, 6), o(3, 40, 6), o(4, 54, 6), o(5, 68, 6), o(6, 82, 6)],
      [mv([12, 6], [12, 40], [8, 48], [12, 92]), mv([40, 6], [40, 40], [44, 48], [40, 92]), mv([68, 6], [68, 40], [64, 48], [68, 92])],
      { cones: [cn(12, 46), cn(26, 46), cn(40, 46), cn(54, 46), cn(68, 46), cn(82, 46)], balls: [bl(12, 6), bl(26, 6), bl(40, 6), bl(54, 6), bl(68, 6), bl(82, 6)] }),
  ];

  SK["pass-and-zigzag"] = [
    S("Two players shuffle up the court passing; the third dribbles through the zigzag cones",
      [o(1, 8, 8), o(2, 24, 8), o(3, 92, 8)],
      [mv([8, 8], [8, 100]), mv([24, 8], [24, 100]), ps([8, 30], [24, 30]), ps([24, 56], [8, 56]), ps([8, 80], [24, 80]), mv([92, 8], [84, 24], [94, 44], [84, 64], [94, 82], [86, 100])],
      { ...FULL, cones: [cn(88, 24), cn(94, 44), cn(88, 64), cn(94, 84)], balls: [bl(8, 8), bl(92, 8)] }),
    S("At midcourt: one passer dribbles to the far basket; the dribbler passes to the coach and finishes off the return pass",
      [o(1, 8, 100), o(2, 24, 100), o(3, 86, 100), d("C", 66, 140)],
      [mv([8, 100], [30, 160], [48, 186]), ps([86, 100], [66, 140]), ps([66, 140], [74, 160]), cut([86, 100], [78, 150], [54, 187])],
      { ...FULL, balls: [bl(8, 100), bl(86, 100)] }),
  ];

  SK["bleachers"] = [
    S("Dribble on every row, slowly, up and then back down",
      [o(1, 12, 16), o(2, 12, 34), o(3, 12, 52), o(4, 12, 70)],
      [mv([12, 16], [12, 40]), mv([12, 34], [12, 58]), mv([12, 52], [12, 76]), mv([12, 70], [12, 94])],
      { balls: [bl(12, 16), bl(12, 34), bl(12, 52), bl(12, 70)] }),
  ];

  SK["full-court-layup-minimal-dribble"] = [
    S("Three dribbles only: baseline area to half court, half court to the three-point line, three-point line to the basket",
      [o(1, 90, 42)],
      [mv([90, 42], [90, 100]), mv([90, 100], [76, 140]), mv([76, 140], [54, 186])],
      { ...FULL, ball: bl(90, 42) }),
  ];

  SK["dribbling-mania"] = [
    S("Eight stations along the sideline and the half-court line, one dribble move each, finishing with a layup",
      [o(1, 90, 24)],
      [mv([90, 24], [90, 46], [88, 60], [90, 92], [70, 94], [50, 92], [30, 92], [14, 90], [30, 58], [44, 30], [48, 16])],
      { cones: [cn(92, 46), cn(92, 66), cn(92, 92), cn(72, 94), cn(50, 94), cn(28, 94), cn(10, 92)], ball: bl(90, 24) }),
  ];

  SK["gauntlet"] = [
    S("Dribble past five stationary defenders (a move at each), then sprint to the far end for a layup",
      [o(1, 8, 8), o(2, 8, 15), d(1, 14, 30), d(2, 14, 62), d(3, 14, 94), d(4, 14, 126), d(5, 14, 158)],
      [mv([6, 10], [22, 30], [6, 50], [22, 62], [6, 78], [22, 94], [6, 110], [22, 126], [6, 142], [22, 158], [40, 184])],
      { ...FULL, ball: bl(8, 8) }),
  ];

  SK["three-on-three-fast-break"] = [
    S("The coach passes to one attacker; his defender must touch the baseline, the other two sprint back",
      [o(1, 20, 8), o(2, 50, 8), o(3, 80, 8), d(1, 20, 41), d(2, 50, 41), d(3, 80, 41), d("C", 64, 22)],
      [ps([64, 22], [50, 10]), mv([50, 41], [50, 12]), cut([20, 41], [30, 150]), cut([80, 41], [70, 150]), mv([50, 8], [50, 170]), mv([20, 8], [20, 170]), mv([80, 8], [80, 170])],
      { ...FULL, ball: bl(64, 22) }),
  ];

  SK["partner-pass-with-one-defender"] = [
    S("Pass fakes and pivots get the ball past the defender; a tipped pass sends the passer to defense",
      [o(1, 28, 62), d("X", 50, 62), o(2, 72, 62)],
      [ps([28, 62], [72, 62])],
      { ball: bl(28, 62) }),
  ];

  SK["machine-gun-passing"] = [
    S("Step 1 — 4 passes to 3; then 1 passes to 4",
      [o(1, 38, 70), o(2, 50, 70), o(3, 62, 70), o(4, 50, 44)],
      [ps([50, 44], [62, 70]), ps([38, 70], [50, 44])],
      { balls: [bl(50, 44), bl(38, 70)] }),
    S("Step 2 — 4 passes to 2 while 3 passes back to 4",
      [o(1, 38, 70), o(2, 50, 70), o(3, 62, 70), o(4, 50, 44)],
      [ps([50, 44], [50, 70]), ps([62, 70], [50, 44])],
      { balls: [bl(62, 70), bl(50, 44)] }),
    S("Step 3 — 4 passes to 1 while 2 passes back to 4",
      [o(1, 38, 70), o(2, 50, 70), o(3, 62, 70), o(4, 50, 44)],
      [ps([50, 44], [38, 70]), ps([50, 70], [50, 44])],
      { balls: [bl(50, 70), bl(50, 44)] }),
  ];

  SK["four-corners-passing"] = [
    S("Dribble to the middle, make the called pivot, pass to the next line and follow the pass",
      [o(1, 8, 8), o(2, 92, 8), o(3, 8, 94), o(4, 92, 94)],
      [mv([8, 8], [42, 44]), mv([92, 8], [58, 44]), mv([8, 94], [42, 62]), mv([92, 94], [58, 62]), ps([42, 62], [92, 94]), ps([58, 62], [92, 8]), ps([58, 44], [8, 8]), ps([42, 44], [8, 94])],
      { balls: [bl(8, 8), bl(92, 8), bl(8, 94), bl(92, 94)] }),
  ];

  SK["full-court-passing"] = [
    S("Give-and-go passes with the elbow passers at both ends, finishing with a layup",
      [o(1, 8, 8), o("E", 34, 41), o("E", 66, 41), o("E", 34, 159), o("E", 66, 159)],
      [ps([8, 8], [34, 41]), ps([34, 41], [18, 64]), cut([8, 8], [18, 64], [26, 116], [40, 152], [50, 186]), ps([26, 118], [34, 159]), ps([34, 159], [44, 168])],
      { ...FULL, ball: bl(8, 8) }),
  ];

  SK["lane-pressure-passing"] = [
    S("Each offensive player stays in his third of the court; one dribble per catch, no skip passes",
      [o(1, 17, 10), o(2, 50, 10), o(3, 83, 10), d(1, 17, 18), d(2, 50, 20), d(3, 83, 18)],
      [guide([33, 0], [33, 200]), guide([67, 0], [67, 200]), ps([50, 10], [17, 10]), ps([50, 10], [83, 10]), mv([17, 10], [17, 80])],
      { ...FULL, ball: bl(50, 10) }),
  ];

  SK["musical-slide"] = [
    S("Chairs (cones) in a circle, one fewer than players; slide around them until the music stops",
      ring(50, 50, 26, 9, -1.4).map(([x, y], i) => o(i + 1, Math.round(x), Math.round(y))),
      [mv(...ring(50, 50, 33, 9, -1.4).slice(0, 6).map(([x, y]) => [Math.round(x), Math.round(y)]))],
      { cones: ring(50, 50, 13, 8, 0).map(([x, y]) => cn(Math.round(x), Math.round(y))) }),
  ];

  SK["defensive-slide"] = [
    S("Sprint to the free-throw line, turn 180° and foot fire; on each whistle slide to the sideline, then to half court",
      [o(1, 30, 10), o(2, 30, 18), o(3, 30, 26), o(1, 70, 10), o(2, 70, 18), o(3, 70, 26)],
      [mv([30, 10], [30, 44]), mv([30, 44], [8, 44], [8, 96]), mv([70, 10], [70, 44]), mv([70, 44], [92, 44], [92, 96])]),
  ];

  SK["lane-slides"] = [
    S("Slide across the lane, touch the opposite line with the outside foot and back — 20 to 30 seconds",
      [d(1, 36, 28)],
      [mv([38, 26], [62, 26]), mv([62, 32], [38, 32])]),
  ];

  SK["one-on-one-ball-handler"] = [
    S("Up to three pairs: the ball handler tries to beat the defender off the dribble",
      [o(1, 14, 46), d(1, 22, 38), o(2, 50, 64), d(2, 50, 55), o(3, 86, 46), d(3, 78, 38)],
      [mv([14, 46], [30, 30]), mv([50, 64], [36, 42]), mv([86, 46], [70, 30])],
      { balls: [bl(14, 46), bl(50, 64), bl(86, 46)] }),
  ];

  SK["fresno-drill"] = [
    S("The coach dribbles at a 45° angle; the defenders drop step and slide with him, calling \"Ball\"",
      [o("C", 50, 16), d(1, 22, 36), d(2, 50, 36), d(3, 78, 36), d(4, 22, 52), d(5, 50, 52), d(6, 78, 52), d(7, 22, 68), d(8, 50, 68), d(9, 78, 68)],
      [mv([50, 16], [40, 28]), mv([22, 36], [12, 40]), mv([50, 36], [40, 40]), mv([78, 36], [68, 40]), mv([22, 52], [12, 56]), mv([50, 52], [40, 56]), mv([78, 52], [68, 56])],
      { ball: bl(50, 16) }),
  ];

  SK["recovery-drill"] = [
    S("Sprint to the cone, slide to the sideline, repeat to the far baseline; run backwards to half court and sprint back",
      [o(1, 8, 6), o(2, 92, 6)],
      [cut([8, 6], [33, 41], [10, 64], [33, 100], [10, 130], [33, 159], [10, 186]), cut([50, 188], [50, 100]), cut([50, 100], [92, 8])],
      { ...FULL, cones: [cn(33, 41), cn(67, 41), cn(33, 100), cn(67, 100), cn(33, 159), cn(67, 159)] }),
  ];

  SK["forward-denial"] = [
    S("The defender keeps a hand in the passing lane and sees ball and man; the wing works V-cuts and backdoor cuts",
      [o(1, 50, 62), o(2, 86, 45), d("X", 76, 50)],
      [cut([86, 45], [80, 40], [94, 50]), cut([86, 45], [70, 30], [56, 16]), ps([50, 62], [86, 45])],
      { ball: bl(50, 62) }),
  ];

  SK["complete-man-to-man"] = [
    S("1 — guard the wing in the passing lane and help against penetration",
      [o("P", 30, 56), o("O", 12, 42), d("X", 22, 40)],
      [mv([30, 56], [42, 40]), mv([22, 40], [30, 36])],
      { ball: bl(30, 56) }),
    S("2 — the wing goes to the post as the guard dribbles to the wing: post defense",
      [o("P", 30, 56), o("O", 12, 42), d("X", 22, 40)],
      [mv([30, 56], [14, 48]), cut([12, 42], [38, 22]), mv([22, 40], [38, 26])],
      { ball: bl(30, 56) }),
    S("3 — the offensive player rotates to the other wing; skip pass and close out",
      [o("P", 14, 48), o("O", 86, 44), d("X", 50, 28)],
      [ps([14, 48], [86, 44]), mv([50, 28], [80, 42])],
      { ball: bl(14, 48) }),
    S("4 — the wing passes back to the guard and flash-cuts to the middle: deny the pass",
      [o("P", 50, 62), o("O", 86, 44), d("X", 76, 44)],
      [ps([86, 44], [50, 62]), cut([86, 44], [60, 38]), mv([76, 44], [64, 36])],
      { ball: bl(86, 44) }),
  ];

  SK["close-out"] = [
    S("The defender passes to the wing, sprints halfway and breaks down into a defensive slide",
      [d("X", 62, 22), o("O", 80, 44)],
      [ps([62, 22], [80, 44]), mv([62, 22], [74, 38])],
      { ball: bl(62, 22) }),
    S("The offensive player fakes the shot and dribbles twice; the defender stops him",
      [d("X", 74, 38), o("O", 80, 44)],
      [mv([80, 44], [68, 34]), mv([74, 38], [70, 36])],
      { ball: bl(80, 44) }),
  ];

  SK["transition-d"] = [
    S("On the whistle the ball is set down (a turnover); the offense sprints back while the nearest defender starts the break",
      [o(1, 30, 60), o(2, 82, 46), o(3, 14, 46), o(4, 36, 26), o(5, 62, 24), d(1, 34, 52), d(2, 72, 44), d(3, 22, 40), d(4, 42, 32), d(5, 58, 28)],
      [cut([82, 46], [84, 98]), cut([14, 46], [16, 98]), cut([36, 26], [40, 98]), cut([62, 24], [60, 98]), mv([34, 52], [32, 62], [44, 98])],
      { ball: cn(30, 56) }),
  ];

  SK["twelve-game-defensive-drill"] = [
    S("A normal 5-on-5 half-court game with defense-friendly scoring",
      [o(1, 50, 63), o(2, 86, 45), o(3, 14, 45), o(4, 34, 26), o(5, 66, 26), d(1, 50, 53), d(2, 78, 40), d(3, 22, 40), d(4, 38, 31), d(5, 62, 31)],
      [],
      { ball: bl(50, 63) }),
  ];

  SK["double-trouble"] = [
    S("Three attackers against four defenders — the extra defender traps the ball",
      [o(1, 50, 64), o(2, 86, 45), o(3, 14, 45), d(1, 46, 55), d(2, 56, 55), d(3, 78, 41), d(4, 22, 41)],
      [ps([50, 64], [14, 45])],
      { ball: bl(50, 64) }),
    S("Trap on the wing: move the ball quickly before the double team forms",
      [o(1, 50, 64), o(2, 86, 45), o(3, 14, 45), d(1, 21, 42), d(2, 14, 54), d(3, 46, 50), d(4, 78, 44)],
      [ps([14, 45], [50, 64])],
      { ball: bl(14, 45) }),
  ];

  SK["post-double-down"] = [
    S("The coach passes to the post; the defender at the free-throw line drops down for a quick double team and the far-wing defender rotates",
      [d("C", 14, 46), o("P", 36, 20), d("X", 36, 25), o(2, 50, 41), d(2, 50, 35), o(3, 86, 45), d(3, 80, 41)],
      [ps([14, 46], [36, 20]), mv([50, 35], [40, 26]), mv([80, 41], [56, 37])],
      { ball: bl(14, 46) }),
  ];

  SK["defending-the-pick-and-roll"] = [
    S("Part 1: ball screen toward the corner — switch, slide between, or go around",
      [o(1, 80, 46), d(1, 74, 40), o(2, 92, 12), d(2, 90, 17), o(3, 50, 62), d(3, 50, 55)],
      [mv([80, 46], [90, 30]), cut([92, 12], [86, 36]), scr(84, 38, 30), mv([74, 40], [82, 34])],
      { ball: bl(80, 46) }),
    S("Part 2: ball screen at the top — double team the ball, the screener rolls, the corner defender helps",
      [o(1, 80, 46), o(3, 58, 62), o(2, 92, 12), d(1, 74, 40), d(3, 52, 56), d(2, 90, 17)],
      [mv([80, 46], [64, 56]), scr(60, 60, 0), mv([74, 40], [62, 52]), mv([52, 56], [56, 56]), cut([58, 62], [50, 26]), mv([90, 17], [56, 28])],
      { ball: bl(80, 46) }),
  ];

  SK["flash-pass"] = [
    S("Deny the pass into the post",
      [o(1, 14, 46), o(2, 86, 46), o(3, 62, 22), d("X", 58, 26)],
      [ps([14, 46], [62, 22])],
      { ball: bl(14, 46) }),
    S("The ball goes to the other wing and the post flashes across the lane — deny again",
      [o(1, 14, 46), o(2, 86, 46), o(3, 62, 22), d("X", 58, 26)],
      [ps([14, 46], [86, 46]), cut([62, 22], [44, 34]), mv([58, 26], [48, 30]), ps([86, 46], [44, 34])],
      { ball: bl(14, 46) }),
  ];

  SK["three-on-two-two-on-one"] = [
    S("3-on-2: the dribbler attacks until a defender commits, then passes to an open wing",
      [o(1, 14, 8), o(2, 50, 8), o(3, 86, 8), d(4, 44, 172), d(5, 58, 172)],
      [mv([50, 8], [50, 134]), cut([14, 8], [14, 140]), cut([86, 8], [86, 140]), ps([50, 134], [18, 148])],
      { ...FULL, ball: bl(50, 8) }),
    S("2-on-1: the two original defenders attack the other way against the player who just shot",
      [o(4, 44, 150), o(5, 58, 150), d(1, 50, 70)],
      [mv([44, 150], [46, 96]), cut([58, 150], [60, 60]), ps([46, 96], [60, 62])],
      { ...FULL, ball: bl(44, 150) }),
  ];

  const pressStart = (extra = {}) =>
    S("Screen at the top, then sprint to the ball near the corner",
      [o("IN", 50, -4), o(2, 50, 41), o(3, 50, 62)],
      [scr(50, 50, 0), cut([50, 62], [42, 46], [20, 18]), ps([50, -4], [20, 18])],
      { ball: bl(50, -4), ...extra });

  SK["free-press-spin-dribble-out"] = [
    pressStart(),
    S("Attack one trapper before the trap forms, then spin and dribble away with the ball extended",
      [o("IN", 50, -4), o(2, 50, 41), o(3, 18, 16), d(1, 26, 20), d(2, 14, 26)],
      [mv([18, 16], [10, 22], [26, 32], [30, 62])],
      { ball: bl(18, 16) }),
  ];

  SK["free-press-step-through"] = [
    pressStart(),
    S("Fake a pass over the trap to make the defenders rise, then split them with one long step",
      [o("IN", 50, -4), o(2, 50, 41), o(3, 18, 16), d(1, 26, 20), d(2, 14, 26)],
      [ps([18, 16], [40, 34]), mv([18, 16], [20, 26], [34, 60])],
      { ball: bl(18, 16) }),
  ];

  SK["free-press-wrap-around-pass"] = [
    pressStart(),
    S("Against the trap: wrap-around pass to the inbounder, or an overhead pass to the far sideline",
      [o("IN", 50, -4), o(2, 92, 40), o(3, 18, 16), d(1, 26, 20), d(2, 14, 26)],
      [ps([18, 16], [50, -2]), ps([18, 16], [92, 40])],
      { ball: bl(18, 16) }),
  ];

  SK["fast-break-shooting-three-in-a-row"] = [
    S("The point guard passes to a wing, who hits the other wing sprinting to the three-point line; shooter makes three in a row",
      [o(1, 50, 8), o(2, 14, 8), o(3, 86, 8)],
      [mv([50, 8], [50, 41]), ps([50, 41], [86, 60]), cut([86, 8], [86, 62]), cut([14, 8], [24, 148]), ps([86, 66], [24, 146]), ps([24, 148], [50, 189])],
      { ...FULL, ball: bl(50, 8) }),
  ];

  SK["two-man-break"] = [
    S("Pass to the wing, sprint the floor, take the pass on the run and hit a quick three — both ends run at once",
      [o(1, 44, 6), o(2, 92, 30), o(3, 56, 194), o(4, 8, 170)],
      [ps([44, 6], [92, 30]), cut([44, 6], [30, 100], [22, 160]), mv([92, 30], [60, 100]), ps([60, 100], [24, 158]), ps([56, 194], [8, 170]), cut([56, 194], [70, 100], [78, 40]), mv([8, 170], [40, 100]), ps([40, 100], [76, 42])],
      { ...FULL, balls: [bl(44, 6), bl(56, 194)] }),
  ];

  DRILLS.forEach((drill) => {
    if ((!drill.diagrams || !drill.diagrams.length) && SK[drill.id]) drill.diagrams = SK[drill.id];
  });
})();
