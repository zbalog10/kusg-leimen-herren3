// Animated walkthrough for a play's/read's step-by-step sequence. Reuses
// court.js's drawing primitives directly (same global scope, no modules)
// so the animated view always matches the static step diagrams.
//
// Each transition moves a player along the exact `cut` path drawn for that
// step when one starts and ends at that player's known positions; otherwise
// it falls back to a straight line. No extra authoring needed in data.js —
// this reads the same players/actions data the static step cards use.

const AM_STEP_MS = 1400;
const AM_PAUSE_MS = 550;

function amDist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
function amClose(a, b, eps) { return amDist(a, b) <= (eps || 3); }

function amFindPath(actions, from, to) {
  for (const a of actions || []) {
    if ((a.type === "cut" || a.type === "move") && a.path && a.path.length >= 2) {
      if (amClose(a.path[0], from) && amClose(a.path[a.path.length - 1], to)) return a.path;
    }
  }
  return null;
}

// Cumulative-length parameterization so speed stays ~constant across bends.
function amPointAt(path, t) {
  const lens = [];
  let total = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const d = amDist(path[i], path[i + 1]);
    lens.push(d);
    total += d;
  }
  if (total === 0) return { ...path[0] };
  let target = t * total;
  for (let i = 0; i < lens.length; i++) {
    if (target <= lens[i] || i === lens.length - 1) {
      const segT = lens[i] === 0 ? 0 : Math.min(1, target / lens[i]);
      const p0 = path[i], p1 = path[i + 1];
      return { x: p0.x + (p1.x - p0.x) * segT, y: p0.y + (p1.y - p0.y) * segT };
    }
    target -= lens[i];
  }
  return { ...path[path.length - 1] };
}

function amEase(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

// `steps`: array of { title, narrative, players, actions, ball? } — the same
// shape as a play's `steps` entries.
function renderAnimatedPlayback(container, steps) {
  if (!steps || !steps.length) return;

  let idx = 0;
  let playing = false;
  let rafId = null;
  let svg, playerEls;

  container.innerHTML = `
    <div class="anim-toolbar">
      <button type="button" class="anim-btn anim-play">▶ Play</button>
      <button type="button" class="anim-btn anim-restart">⟲ Restart</button>
      <div class="anim-progress"></div>
    </div>
    <div class="court-wrap anim-court"></div>
    <div class="anim-caption">
      <h3 class="anim-title"></h3>
      <p class="anim-text"></p>
    </div>
  `;

  const courtEl = container.querySelector(".anim-court");
  const playBtn = container.querySelector(".anim-play");
  const restartBtn = container.querySelector(".anim-restart");
  const progressEl = container.querySelector(".anim-progress");
  const titleEl = container.querySelector(".anim-title");
  const textEl = container.querySelector(".anim-text");

  progressEl.innerHTML = steps.map((_, i) => `<span class="anim-dot" data-i="${i}"></span>`).join("");
  const dots = Array.from(progressEl.querySelectorAll(".anim-dot"));

  function drawStatic(i) {
    const step = steps[i];
    svg = svgEl("svg", {
      width: "100%",
      viewBox: `${-OOB_MARGIN} ${-OOB_MARGIN} ${COURT_W_PX + 2 * OOB_MARGIN} ${COURT_H_PX + 2 * OOB_MARGIN}`,
    });
    svg.style.display = "block";
    ensureArrowMarker(svg);
    drawCourtLines(svg);

    for (const a of step.actions || []) {
      if (a.type === "cut" || a.type === "move") drawArrow(svg, a.path, { dashed: false, color: "#4ade80" });
      else if (a.type === "pass") drawArrow(svg, [a.from, a.to], { dashed: true, color: "#8a988a" });
      else if (a.type === "screen") drawScreen(svg, a.at, a.angle || 0);
    }

    playerEls = {};
    for (const p of step.players || []) {
      const cx = mapX(p.x), cy = mapY(p.y);
      const isDefense = p.team === "defense";
      const circle = svgEl("circle", {
        cx, cy, r: 11,
        fill: isDefense ? "none" : "#22c55e",
        stroke: isDefense ? "#f59e0b" : "#0a0d0a",
        "stroke-width": 2,
        "stroke-dasharray": isDefense ? "3 2" : "none",
      });
      svg.appendChild(circle);
      let text = null;
      if (p.label) {
        text = svgEl("text", {
          x: cx, y: cy + 4, "text-anchor": "middle",
          fill: isDefense ? "#f59e0b" : "#04120a", "font-size": isDefense ? 10 : 11, "font-weight": 700, "font-family": "inherit",
        });
        text.textContent = p.label;
        svg.appendChild(text);
      }
      playerEls[p.id] = { circle, text };
    }
    if (step.ball) drawBall(svg, step.ball);

    courtEl.innerHTML = "";
    courtEl.appendChild(svg);

    titleEl.textContent = step.title;
    textEl.textContent = step.narrative || "";
    dots.forEach((d, di) => d.classList.toggle("active", di === i));
  }

  function setPlayerPos(id, pos) {
    const el = playerEls[id];
    if (!el) return;
    const cx = mapX(pos.x), cy = mapY(pos.y);
    el.circle.setAttribute("cx", cx);
    el.circle.setAttribute("cy", cy);
    if (el.text) { el.text.setAttribute("x", cx); el.text.setAttribute("y", cy + 4); }
  }

  function animateStep(fromIdx, toIdx, onDone) {
    const fromStep = steps[fromIdx];
    const toStep = steps[toIdx];
    drawStatic(toIdx);

    const moves = {};
    for (const p of toStep.players || []) {
      const prev = (fromStep.players || []).find((q) => q.id === p.id);
      if (!prev || amClose(prev, p, 0.4)) continue;
      moves[p.id] = amFindPath(toStep.actions, prev, p) || [prev, p];
    }

    const passAction = (toStep.actions || []).find((a) => a.type === "pass");
    if (!Object.keys(moves).length && !passAction) { onDone(); return; }

    for (const id of Object.keys(moves)) {
      const prev = (fromStep.players || []).find((q) => q.id === id);
      setPlayerPos(id, prev);
    }

    let ballEl = null;
    if (passAction) {
      ballEl = svgEl("circle", {
        cx: mapX(passAction.from.x), cy: mapY(passAction.from.y),
        r: 6, fill: "#e0663f", stroke: "#0a0d0a", "stroke-width": 1.5,
      });
      svg.appendChild(ballEl);
    }

    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / AM_STEP_MS);
      const et = amEase(t);
      for (const [id, path] of Object.entries(moves)) setPlayerPos(id, amPointAt(path, et));
      if (ballEl) {
        const bx = passAction.from.x + (passAction.to.x - passAction.from.x) * et;
        const by = passAction.from.y + (passAction.to.y - passAction.from.y) * et;
        ballEl.setAttribute("cx", mapX(bx));
        ballEl.setAttribute("cy", mapY(by));
      }
      if (t < 1) {
        rafId = requestAnimationFrame(frame);
      } else {
        if (ballEl) ballEl.remove();
        onDone();
      }
    }
    rafId = requestAnimationFrame(frame);
  }

  function updatePlayBtn() { playBtn.textContent = playing ? "⏸ Pause" : "▶ Play"; }

  function stepForward() {
    if (idx >= steps.length - 1) { playing = false; updatePlayBtn(); return; }
    const from = idx;
    idx = idx + 1;
    animateStep(from, idx, () => {
      if (playing) setTimeout(() => { if (playing) stepForward(); }, AM_PAUSE_MS);
    });
  }

  playBtn.addEventListener("click", () => {
    if (playing) { playing = false; updatePlayBtn(); return; }
    if (idx >= steps.length - 1) { idx = 0; drawStatic(0); }
    playing = true;
    updatePlayBtn();
    setTimeout(() => { if (playing) stepForward(); }, 200);
  });

  restartBtn.addEventListener("click", () => {
    playing = false;
    updatePlayBtn();
    if (rafId) cancelAnimationFrame(rafId);
    idx = 0;
    drawStatic(0);
  });

  dots.forEach((d) => {
    d.addEventListener("click", () => {
      playing = false;
      updatePlayBtn();
      if (rafId) cancelAnimationFrame(rafId);
      idx = Number(d.dataset.i);
      drawStatic(idx);
    });
  });

  drawStatic(0);
}
