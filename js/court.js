// Renders a half-court diagram from a play's `diagram` data.
// Coordinate system: x 0-100 (sideline to sideline), y 0-100 (baseline/hoop at y=0, half-court line at y=100).

const COURT_NS = "http://www.w3.org/2000/svg";

function svgEl(tag, attrs) {
  const el = document.createElementNS(COURT_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

// Real FIBA half-court dimensions (meters), used to keep every line's
// proportions correct instead of eyeballed. Court is 15m wide; a half
// court is 14m long (baseline to half-court line).
const COURT_WIDTH_M = 15;
const COURT_HALF_LENGTH_M = 14;
const PX_PER_M = 20;
const COURT_W_PX = COURT_WIDTH_M * PX_PER_M; // 300
const COURT_H_PX = COURT_HALF_LENGTH_M * PX_PER_M; // 280

function m(meters) { return meters * PX_PER_M; } // meters -> px, for radii

// x: 0-100 = sideline to sideline (15m). y: 0-100 = baseline(0) to half-court line(100), over 14m.
function mapX(x) { return (x / 100) * COURT_W_PX; }
function mapY(y) { return COURT_H_PX - (y / 100) * COURT_H_PX; }

// FIBA landmarks expressed as % of the half-court's own axis, so they can
// be dropped straight into mapX/mapY and into play diagrams.
const FT_LINE_Y = (5.8 / COURT_HALF_LENGTH_M) * 100; // ~41.4
const KEY_LEFT_X = ((COURT_WIDTH_M - 4.9) / 2 / COURT_WIDTH_M) * 100; // ~33.7
const KEY_RIGHT_X = 100 - KEY_LEFT_X; // ~66.3
const RIM_Y = (1.575 / COURT_HALF_LENGTH_M) * 100; // ~11.25
const BACKBOARD_Y = (1.2 / COURT_HALF_LENGTH_M) * 100; // ~8.6
const THREE_PT_CORNER_X = (0.9 / COURT_WIDTH_M) * 100; // ~6
const THREE_PT_TRANSITION_Y = 21.4; // where the straight 3pt line meets the arc

function drawCourtLines(svg) {
  const line = (x1, y1, x2, y2, extra = {}) =>
    svg.appendChild(svgEl("line", { x1: mapX(x1), y1: mapY(y1), x2: mapX(x2), y2: mapY(y2), stroke: "#48603f", "stroke-width": 1.5, ...extra }));
  const arcPath = (d, extra = {}) => svg.appendChild(svgEl("path", { d, fill: "none", stroke: "#48603f", "stroke-width": 1.5, ...extra }));

  // Half-court line. (No full sideline boundary: the sidelines sit only
  // 0.9m outside the three-point line, so drawing both this close together
  // reads as visual clutter rather than a court edge.)
  line(0, 100, 100, 100);

  // Key / paint (4.9m wide, free-throw line 5.8m from the baseline)
  line(KEY_LEFT_X, 0, KEY_LEFT_X, FT_LINE_Y);
  line(KEY_RIGHT_X, 0, KEY_RIGHT_X, FT_LINE_Y);
  line(KEY_LEFT_X, FT_LINE_Y, KEY_RIGHT_X, FT_LINE_Y);

  // Free-throw circle (1.8m radius)
  svg.appendChild(svgEl("circle", { cx: mapX(50), cy: mapY(FT_LINE_Y), r: m(1.8), fill: "none", stroke: "#48603f", "stroke-width": 1.5, "stroke-dasharray": "4 3" }));

  // Restricted (no-charge) arc under the hoop, 1.25m radius
  const raR = m(1.25);
  const raXOffset = (raR / COURT_W_PX) * 100;
  arcPath(`M ${mapX(50 - raXOffset)} ${mapY(0)} A ${raR} ${raR} 0 0 0 ${mapX(50 + raXOffset)} ${mapY(0)}`);

  // Backboard (1.2m from baseline) + rim (center 1.575m from baseline)
  line(47, BACKBOARD_Y, 53, BACKBOARD_Y, { "stroke-width": 2.2 });
  svg.appendChild(svgEl("circle", { cx: mapX(50), cy: mapY(RIM_Y), r: m(0.225), fill: "none", stroke: "#e0663f", "stroke-width": 1.6 }));

  // Three-point line: straight sections (0.9m from the sideline) then a 6.75m-radius arc
  line(THREE_PT_CORNER_X, 0, THREE_PT_CORNER_X, THREE_PT_TRANSITION_Y);
  line(100 - THREE_PT_CORNER_X, 0, 100 - THREE_PT_CORNER_X, THREE_PT_TRANSITION_Y);
  const tpR = m(6.75);
  arcPath(`M ${mapX(THREE_PT_CORNER_X)} ${mapY(THREE_PT_TRANSITION_Y)} A ${tpR} ${tpR} 0 0 0 ${mapX(100 - THREE_PT_CORNER_X)} ${mapY(THREE_PT_TRANSITION_Y)}`);
}

function drawArrow(svg, points, { dashed = false, color = "#4ade80" } = {}) {
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${mapX(p.x)} ${mapY(p.y)}`).join(" ");
  const markerId = dashed ? "arrowhead-gray" : "arrowhead-green";
  const path = svgEl("path", {
    d, fill: "none", stroke: color, "stroke-width": 2,
    "marker-end": `url(#${markerId})`,
  });
  if (dashed) path.setAttribute("stroke-dasharray", "5 4");
  svg.appendChild(path);
}

function drawScreen(svg, at, angle = 0) {
  const cx = mapX(at.x), cy = mapY(at.y);
  const len = 9;
  const rad = (angle * Math.PI) / 180;
  const dx = Math.cos(rad) * len, dy = Math.sin(rad) * len;
  svg.appendChild(svgEl("line", {
    x1: cx - dx, y1: cy - dy, x2: cx + dx, y2: cy + dy,
    stroke: "#ef4444", "stroke-width": 3, "stroke-linecap": "round",
  }));
}

function drawPlayer(svg, p) {
  const cx = mapX(p.x), cy = mapY(p.y);
  const isDefense = p.team === "defense";
  svg.appendChild(svgEl("circle", {
    cx, cy, r: 11,
    fill: isDefense ? "none" : "#22c55e",
    stroke: isDefense ? "#96a391" : "#0a0d0a",
    "stroke-width": isDefense ? 1.5 : 2,
    "stroke-dasharray": isDefense ? "3 2" : "none",
  }));
  if (!isDefense) {
    const text = svgEl("text", {
      x: cx, y: cy + 4, "text-anchor": "middle",
      fill: "#04120a", "font-size": 11, "font-weight": 700, "font-family": "inherit",
    });
    text.textContent = p.label;
    svg.appendChild(text);
  }
}

function ensureArrowMarker(svg) {
  const defs = svgEl("defs", {});
  [
    { id: "arrowhead-green", color: "#4ade80" },
    { id: "arrowhead-gray", color: "#96a391" },
  ].forEach(({ id, color }) => {
    const marker = svgEl("marker", {
      id, markerWidth: 8, markerHeight: 8,
      refX: 6, refY: 3, orient: "auto", markerUnits: "strokeWidth",
    });
    marker.appendChild(svgEl("path", { d: "M0,0 L0,6 L6,3 z", fill: color }));
    defs.appendChild(marker);
  });
  svg.appendChild(defs);
}

// Figures out which part of the half-court a play actually uses, so the
// diagram can crop in on that area instead of always showing the full
// half-court (which leaves plays confined to one end looking tiny).
function getDiagramExtent(diagram) {
  const xs = [], ys = [];
  const add = (p) => { if (p) { xs.push(p.x); ys.push(p.y); } };
  (diagram.players || []).forEach(add);
  (diagram.actions || []).forEach((a) => {
    if (a.type === "cut" || a.type === "move") (a.path || []).forEach(add);
    else if (a.type === "pass") { add(a.from); add(a.to); }
    else if (a.type === "screen") add(a.at);
  });
  if (!xs.length) return { minX: 0, maxX: 100, maxY: 100 };
  return { minX: Math.min(...xs), maxX: Math.max(...xs), maxY: Math.max(...ys) };
}

function clampRange(min, max, lo, hi, minSize) {
  let a = min, b = max;
  if (b - a < minSize) {
    const mid = (a + b) / 2;
    a = mid - minSize / 2;
    b = mid + minSize / 2;
  }
  if (a < lo) { b += lo - a; a = lo; }
  if (b > hi) { a -= b - hi; b = hi; }
  return [Math.max(lo, a), Math.min(hi, b)];
}

function renderCourt(container, diagram) {
  const svg = svgEl("svg", { width: "100%" });
  svg.style.display = "block";

  const ext = getDiagramExtent(diagram);
  const [minX, maxX] = clampRange(ext.minX - 10, ext.maxX + 10, 0, 100, 55);
  const maxY = Math.min(100, Math.max(ext.maxY + 12, 40));
  const pxLeft = mapX(minX), pxRight = mapX(maxX);
  const pxTop = mapY(maxY), pxBottom = mapY(0);
  svg.setAttribute("viewBox", `${pxLeft} ${pxTop} ${pxRight - pxLeft} ${pxBottom - pxTop}`);

  ensureArrowMarker(svg);
  drawCourtLines(svg);

  const actions = diagram.actions || [];
  for (const action of actions) {
    if (action.type === "cut" || action.type === "move") {
      drawArrow(svg, action.path, { dashed: false, color: "#4ade80" });
    } else if (action.type === "pass") {
      drawArrow(svg, [action.from, action.to], { dashed: true, color: "#8a988a" });
    } else if (action.type === "screen") {
      drawScreen(svg, action.at, action.angle || 0);
    }
  }

  for (const p of diagram.players || []) drawPlayer(svg, p);

  container.innerHTML = "";
  container.appendChild(svg);
}
