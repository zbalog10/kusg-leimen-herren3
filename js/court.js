// Renders a half-court diagram from a play's `diagram` data.
// Coordinate system: x 0-100 (sideline to sideline), y 0-100 (baseline/hoop at y=0, half-court line at y=100).

const COURT_NS = "http://www.w3.org/2000/svg";

function svgEl(tag, attrs) {
  const el = document.createElementNS(COURT_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function mapX(x) { return (x / 100) * 300; }
function mapY(y) { return 320 - (y / 100) * 300; } // flip so hoop (y=0) is near top of the SVG

function drawCourtLines(svg) {
  const line = (x1, y1, x2, y2, extra = {}) =>
    svg.appendChild(svgEl("line", { x1: mapX(x1), y1: mapY(y1), x2: mapX(x2), y2: mapY(y2), stroke: "#2b3a26", "stroke-width": 1.5, ...extra }));
  const arcPath = (d, extra = {}) => svg.appendChild(svgEl("path", { d, fill: "none", stroke: "#2b3a26", "stroke-width": 1.5, ...extra }));

  // Court boundary (half court)
  svg.appendChild(svgEl("rect", { x: mapX(0), y: mapY(100), width: mapX(100) - mapX(0), height: mapY(0) - mapY(100), fill: "none", stroke: "#2b3a26", "stroke-width": 2 }));

  // Half-court line
  line(0, 100, 100, 100);

  // Key / paint
  line(34, 0, 34, 19);
  line(66, 0, 66, 19);
  line(34, 19, 66, 19);

  // Free-throw circle
  const c = { x: mapX(50), y: mapY(19) };
  svg.appendChild(svgEl("circle", { cx: c.x, cy: c.y, r: (mapX(62) - mapX(50)), fill: "none", stroke: "#2b3a26", "stroke-width": 1.5, "stroke-dasharray": "4 3" }));

  // Restricted area arc under the hoop
  arcPath(`M ${mapX(44)} ${mapY(0)} A ${mapX(50) - mapX(44)} ${mapX(50) - mapX(44)} 0 0 0 ${mapX(56)} ${mapY(0)}`);

  // Backboard + rim
  line(47, 3.5, 53, 3.5, { "stroke-width": 2.2 });
  svg.appendChild(svgEl("circle", { cx: mapX(50), cy: mapY(4.5), r: 3, fill: "none", stroke: "#e0663f", "stroke-width": 1.6 }));

  // Three-point line: straight sections then an arc
  line(3, 0, 3, 21);
  line(97, 0, 97, 21);
  arcPath(`M ${mapX(3)} ${mapY(21)} A ${mapX(50) - mapX(3)} ${mapX(50) - mapX(3)} 0 0 0 ${mapX(97)} ${mapY(21)}`);
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
