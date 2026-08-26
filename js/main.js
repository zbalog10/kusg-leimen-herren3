function markActiveNavLink() {
  const page = document.body.dataset.page;
  document.querySelectorAll("nav.main-nav a").forEach((a) => {
    if (a.dataset.page === page) a.classList.add("active");
  });
}

function renderTrainingPlans(filter = "All") {
  const list = document.getElementById("plan-list");
  if (!list) return;
  const plans = TRAINING_PLANS.filter((p) => filter === "All" || p.category === filter);
  list.innerHTML = plans
    .map(
      (p) => `
    <div class="plan-card" id="plan-${p.id}">
      <div class="plan-summary" onclick="document.getElementById('plan-${p.id}').classList.toggle('open')">
        <div class="plan-summary-left">
          <div class="plan-title">${p.title}</div>
          <div class="plan-meta">
            <span class="badge">${p.category}</span>
            <span class="badge muted">${p.duration}</span>
            <span class="badge muted">${formatDate(p.date)}${p.time ? ` · ${p.time}` : ""}</span>
            ${p.location ? `<span class="badge muted">${p.location}</span>` : ""}
          </div>
        </div>
        <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="plan-body">
        <h4>Objective</h4>
        <p>${p.objective}</p>
        <h4>Warm-up</h4>
        <p>${p.warmup}</p>
        <h4>Drills</h4>
        <ul class="drill-list">
          ${p.drills
            .map(
              (d) => `
            <li class="drill-item">
              <div class="drill-head"><span>${d.name}</span><span class="drill-time">${d.time}</span></div>
              <p>${d.desc}</p>
            </li>`
            )
            .join("")}
        </ul>
        ${p.notes ? `<h4>Notes</h4><div class="notes-box">${p.notes}</div>` : ""}
      </div>
    </div>`
    )
    .join("");
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function renderSeasonSchedule() {
  const nextEl = document.getElementById("next-session");
  const fullEl = document.getElementById("schedule-full");
  const toggleBtn = document.getElementById("schedule-toggle");
  if (!nextEl || !fullEl || typeof SEASON_SCHEDULE === "undefined") return;

  const today = todayISO();
  const planByDate = new Map(TRAINING_PLANS.map((p) => [p.date, p]));

  const upcoming = SEASON_SCHEDULE.find((s) => s.date >= today);
  if (upcoming) {
    const plan = planByDate.get(upcoming.date);
    const d = new Date(upcoming.date + "T00:00:00");
    const longDate = d.toLocaleDateString("en-GB", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
    nextEl.innerHTML = `
      <div class="next-session-card">
        <div class="next-session-label">Next session</div>
        <div class="next-session-date">${longDate}</div>
        <div class="next-session-meta">
          <span class="badge">${upcoming.time} · ${upcoming.duration}</span>
          <span class="badge muted">${upcoming.location}</span>
          ${plan ? `<a class="badge" href="#plan-${plan.id}">${plan.title}</a>` : `<span class="badge muted">Not planned yet</span>`}
        </div>
      </div>`;
  } else {
    nextEl.innerHTML = `<p class="schedule-intro">No more sessions scheduled in the template.</p>`;
  }

  const groups = new Map();
  for (const s of SEASON_SCHEDULE) {
    const d = new Date(s.date + "T00:00:00");
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }

  fullEl.innerHTML = Array.from(groups.entries())
    .map(([key, sessions]) => {
      const [y, m] = key.split("-").map(Number);
      const monthLabel = new Date(y, m - 1, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
      return `
      <div class="schedule-month">
        <h3 class="schedule-month-title">${monthLabel}</h3>
        <table class="schedule-table">
          <tbody>
            ${sessions
              .map((s) => {
                const plan = planByDate.get(s.date);
                const wd = new Date(s.date + "T00:00:00").toLocaleDateString("en-GB", { weekday: "short" });
                return `
              <tr class="${s.date < today ? "schedule-row-past" : ""}">
                <td class="schedule-day">${wd}</td>
                <td class="schedule-date">${formatDate(s.date)}</td>
                <td class="schedule-time">${s.time}</td>
                <td class="schedule-status">${plan ? `<a href="#plan-${plan.id}">Planned →</a>` : `<span class="text-muted">Not planned yet</span>`}</td>
              </tr>`;
              })
              .join("")}
          </tbody>
        </table>
      </div>`;
    })
    .join("");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isHidden = fullEl.hasAttribute("hidden");
      fullEl.toggleAttribute("hidden", !isHidden);
      toggleBtn.textContent = isHidden ? "Hide full schedule ↑" : "Show full schedule ↓";
    });
  }
}

function renderGameSchedule() {
  const nextEl = document.getElementById("next-game");
  const listEl = document.getElementById("game-list");
  if (!nextEl || !listEl || typeof GAME_SCHEDULE === "undefined") return;

  const today = todayISO();
  const opponentLabel = (g) => g.opponent || "Opponent TBD";
  const timeLabel = (g) => g.time || "TBD";
  const venueLabel = (g) => g.venue || "Venue TBD";

  const upcoming = GAME_SCHEDULE.find((g) => g.date >= today);
  if (upcoming) {
    const d = new Date(upcoming.date + "T00:00:00");
    const longDate = d.toLocaleDateString("en-GB", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
    nextEl.innerHTML = `
      <div class="next-session-card">
        <div class="next-session-label">Next game — Matchday ${upcoming.matchday}</div>
        <div class="next-session-date">${longDate}</div>
        <div class="next-session-meta">
          <span class="badge">${timeLabel(upcoming)}</span>
          <span class="badge ${upcoming.home ? "" : "muted"}">${upcoming.home ? "Home" : "Away"}</span>
          <span class="badge muted">vs ${opponentLabel(upcoming)}</span>
          <span class="badge muted">${venueLabel(upcoming)}</span>
        </div>
      </div>`;
  } else {
    nextEl.innerHTML = `<p class="schedule-intro">No more games scheduled in the current fixture list.</p>`;
  }

  listEl.innerHTML = `
    <div class="table-scroll">
    <table class="schedule-table game-table">
      <tbody>
        ${GAME_SCHEDULE.map((g) => {
          const isPast = g.date < today;
          return `
          <tr class="${isPast ? "schedule-row-past" : ""}">
            <td class="schedule-day">MD ${g.matchday}</td>
            <td class="schedule-date">${formatDate(g.date)}</td>
            <td class="schedule-time">${timeLabel(g)}</td>
            <td class="game-side"><span class="badge ${g.home ? "" : "muted"}">${g.home ? "Home" : "Away"}</span></td>
            <td class="game-opponent">${g.opponent ? `vs ${g.opponent}` : `<span class="text-muted">Opponent TBD</span>`}</td>
            <td class="game-venue">${g.venue ? g.venue : `<span class="text-muted">TBD</span>`}</td>
          </tr>`;
        }).join("")}
      </tbody>
    </table>
    </div>`;
}

function renderPlanFilters() {
  const bar = document.getElementById("plan-filters");
  if (!bar) return;
  const categories = ["All", ...new Set(TRAINING_PLANS.map((p) => p.category))];
  bar.innerHTML = categories
    .map((c, i) => `<button class="filter-btn${i === 0 ? " active" : ""}" data-cat="${c}">${c}</button>`)
    .join("");
  bar.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      bar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderTrainingPlans(btn.dataset.cat);
    });
  });
}

function renderSetPlays(filter = "All") {
  const grid = document.getElementById("play-grid");
  if (!grid) return;
  const plays = SET_PLAYS.filter((p) => filter === "All" || p.category === filter);
  grid.innerHTML = plays
    .map(
      (p) => `
    <div class="play-card">
      <div class="play-card-head">
        <h3>${p.name}</h3>
        <span class="badge">${p.category}</span>
      </div>
      <div class="court-wrap" id="court-${p.id}"></div>
      <p class="play-desc">${p.description}</p>
      <ul class="key-points">
        ${p.keyPoints.map((k) => `<li>${k}</li>`).join("")}
      </ul>
      <div class="legend">
        <span><span class="swatch cut"></span>cut / move</span>
        <span><span class="swatch pass"></span>pass</span>
        <span><span class="swatch screen"></span>screen</span>
      </div>
      ${p.steps ? `<a class="btn-link" href="play.html?id=${p.id}">View step-by-step →</a>` : ""}
    </div>`
    )
    .join("");

  plays.forEach((p) => {
    const el = document.getElementById(`court-${p.id}`);
    if (el) renderCourt(el, p.diagram);
  });
}

function renderPlayFilters() {
  const bar = document.getElementById("play-filters");
  if (!bar) return;
  const categories = ["All", ...new Set(SET_PLAYS.map((p) => p.category))];
  bar.innerHTML = categories
    .map((c, i) => `<button class="filter-btn${i === 0 ? " active" : ""}" data-cat="${c}">${c}</button>`)
    .join("");
  bar.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      bar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderSetPlays(btn.dataset.cat);
    });
  });
}

function renderPlayDetail() {
  const container = document.getElementById("play-detail");
  if (!container) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const play = SET_PLAYS.find((p) => p.id === id);

  if (!play) {
    container.innerHTML = `<div class="page-header"><h1>Play not found</h1><p>That play doesn't exist. <a href="plays.html">Back to Set Plays</a>.</p></div>`;
    return;
  }

  container.innerHTML = `
    <div class="page-header">
      <div class="play-card-head">
        <h1>${play.name}</h1>
        <span class="badge">${play.category}</span>
      </div>
      <p>${play.description}</p>
    </div>
    <div class="anim-section" id="anim-playback"></div>
    <div class="step-list">
      ${(play.steps || [])
        .map(
          (s, i) => `
        <div class="step-card">
          <div class="step-number">${i + 1}</div>
          <div class="step-body">
            <h3>${s.title}</h3>
            <div class="court-wrap" id="step-court-${i}"></div>
            <p>${s.narrative}</p>
          </div>
        </div>`
        )
        .join("")}
    </div>
    <div class="legend">
      <span><span class="swatch cut"></span>cut / move</span>
      <span><span class="swatch pass"></span>pass</span>
      <span><span class="swatch screen"></span>screen</span>
    </div>
  `;

  (play.steps || []).forEach((s, i) => {
    const el = document.getElementById(`step-court-${i}`);
    if (el) renderCourt(el, { players: s.players, actions: s.actions });
  });

  const animEl = document.getElementById("anim-playback");
  if (animEl && play.steps) renderAnimatedPlayback(animEl, play.steps);
}

function renderDefenseSets(filter = "All") {
  const grid = document.getElementById("defense-grid");
  if (!grid) return;
  const sets = DEFENSIVE_SETS.filter((d) => filter === "All" || d.category === filter);
  grid.innerHTML = sets
    .map(
      (d) => `
    <div class="defense-card">
      <div class="play-card-head">
        <h3>${d.name}</h3>
        <span class="badge">${d.category}</span>
      </div>
      <div class="court-wrap" id="defcourt-${d.id}"></div>
      <p class="defense-summary">${d.summary}</p>
      <a class="btn-link" href="defense-set.html?id=${d.id}">View full tutorial →</a>
    </div>`
    )
    .join("");

  sets.forEach((d) => {
    const el = document.getElementById(`defcourt-${d.id}`);
    if (el) renderCourt(el, d.baseDiagram);
  });
}

function renderDefenseFilters() {
  const bar = document.getElementById("defense-filters");
  if (!bar) return;
  const categories = ["All", ...new Set(DEFENSIVE_SETS.map((d) => d.category))];
  bar.innerHTML = categories
    .map((c, i) => `<button class="filter-btn${i === 0 ? " active" : ""}" data-cat="${c}">${c}</button>`)
    .join("");
  bar.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      bar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderDefenseSets(btn.dataset.cat);
    });
  });
}

function renderDefenseDetail() {
  const container = document.getElementById("defense-detail");
  if (!container) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const set = DEFENSIVE_SETS.find((d) => d.id === id);

  if (!set) {
    container.innerHTML = `<div class="page-header"><h1>Defensive set not found</h1><p>That page doesn't exist. <a href="defense.html">Back to Defensive Sets</a>.</p></div>`;
    return;
  }

  container.innerHTML = `
    <div class="page-header">
      <div class="play-card-head">
        <h1>${set.name}</h1>
        <span class="badge">${set.category}</span>
      </div>
    </div>
    <p class="prose">${set.overview}</p>

    <h2 class="section-heading">Strengths &amp; Weaknesses</h2>
    <div class="two-col-list">
      <div class="strengths">
        <h3>Strengths</h3>
        <ul>${set.strengths.map((s) => `<li>${s}</li>`).join("")}</ul>
      </div>
      <div class="weaknesses">
        <h3>Weaknesses</h3>
        <ul>${set.weaknesses.map((w) => `<li>${w}</li>`).join("")}</ul>
      </div>
    </div>

    <h2 class="section-heading">Coaching Keys</h2>
    <ul class="rules-list">${set.rules.map((r) => `<li>${r}</li>`).join("")}</ul>

    <h2 class="section-heading">Positions</h2>
    <div class="position-grid">
      ${set.positions
        .map(
          (p) => `
        <div class="position-card">
          <div class="position-badge">${p.label}</div>
          <div>
            <h4>${p.name}</h4>
            <p>${p.desc}</p>
          </div>
        </div>`
        )
        .join("")}
    </div>

    <h2 class="section-heading">Base Alignment</h2>
    <div class="court-wrap" id="def-base-court" style="max-width: 420px;"></div>

    <h2 class="section-heading">Animated Walkthrough</h2>
    <div class="anim-section" id="anim-playback"></div>

    <h2 class="section-heading">Reads &amp; Rotations</h2>
    <div class="step-list">
      ${set.reads
        .map(
          (r, i) => `
        <div class="step-card">
          <div class="step-number">${i + 1}</div>
          <div class="step-body">
            <h3>${r.title}</h3>
            <div class="court-wrap" id="def-read-court-${i}"></div>
            <p>${r.narrative}</p>
          </div>
        </div>`
        )
        .join("")}
    </div>
    ${set.source ? `<p class="schedule-source">Source: <a href="${set.source}" target="_blank" rel="noopener">${set.source}</a></p>` : ""}
  `;

  const baseEl = document.getElementById("def-base-court");
  if (baseEl) renderCourt(baseEl, set.baseDiagram);

  set.reads.forEach((r, i) => {
    const el = document.getElementById(`def-read-court-${i}`);
    if (el) renderCourt(el, r.diagram);
  });

  const animEl = document.getElementById("anim-playback");
  if (animEl) {
    const animSteps = [
      { title: "Base Alignment", narrative: "", players: set.baseDiagram.players, actions: [] },
      ...set.reads.map((r) => ({
        title: r.title,
        narrative: r.narrative,
        players: r.diagram.players,
        actions: r.diagram.actions,
        ball: r.diagram.ball,
      })),
    ];
    renderAnimatedPlayback(animEl, animSteps);
  }
}

function renderDrills(filter = "All") {
  const grid = document.getElementById("drill-grid");
  if (!grid || typeof DRILLS === "undefined") return;
  const drills = DRILLS.filter((d) => filter === "All" || d.category === filter);
  grid.innerHTML = drills
    .map(
      (d) => `
    <div class="play-card">
      <div class="play-card-head">
        <h3>${d.name}</h3>
        <span class="badge">${d.category}</span>
      </div>
      <p class="play-desc">${d.summary}</p>
      <a class="btn-link" href="drill.html?id=${d.id}">View full drill →</a>
    </div>`
    )
    .join("");
}

function renderDrillFilters() {
  const bar = document.getElementById("drill-filters");
  if (!bar || typeof DRILLS === "undefined") return;
  const categories = ["All", ...new Set(DRILLS.map((d) => d.category))];
  bar.innerHTML = categories
    .map((c, i) => `<button class="filter-btn${i === 0 ? " active" : ""}" data-cat="${c}">${c}</button>`)
    .join("");
  bar.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      bar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderDrills(btn.dataset.cat);
    });
  });
}

function renderDrillDetail() {
  const container = document.getElementById("drill-detail");
  if (!container || typeof DRILLS === "undefined") return;

  const id = new URLSearchParams(window.location.search).get("id");
  const drill = DRILLS.find((d) => d.id === id);

  if (!drill) {
    container.innerHTML = `<div class="page-header"><h1>Drill not found</h1><p>That drill doesn't exist. <a href="drills.html">Back to Drills</a>.</p></div>`;
    return;
  }

  container.innerHTML = `
    <div class="page-header">
      <div class="play-card-head">
        <h1>${drill.name}</h1>
        <span class="badge">${drill.category}</span>
      </div>
      <p>${drill.summary}</p>
    </div>

    <h2 class="section-heading">Objective</h2>
    <p class="prose">${drill.objective}</p>

    <h2 class="section-heading">Setup</h2>
    <p class="prose">${drill.setup}</p>

    ${
      drill.diagrams && drill.diagrams.length
        ? `
    <h2 class="section-heading">Alignment</h2>
    <div class="diagram-row">
      ${drill.diagrams
        .map(
          (dg, i) => `
        <div class="diagram-col">
          <h4>${dg.title}</h4>
          <div class="court-wrap" id="drill-diagram-${i}"></div>
        </div>`
        )
        .join("")}
    </div>
    <div class="legend">
      <span><span class="swatch dot offense"></span>offense</span>
      <span><span class="swatch dot defense"></span>defense</span>
    </div>`
        : ""
    }

    <h2 class="section-heading">How It's Run</h2>
    <ul class="rules-list">${(drill.steps || []).map((s) => `<li>${s}</li>`).join("")}</ul>

    <h2 class="section-heading">Coaching Points</h2>
    <ul class="rules-list">${(drill.coachingPoints || []).map((c) => `<li>${c}</li>`).join("")}</ul>

    ${drill.source ? `<p class="schedule-source">Source: <a href="${drill.source}" target="_blank" rel="noopener">${drill.source}</a></p>` : ""}
  `;

  (drill.diagrams || []).forEach((dg, i) => {
    const el = document.getElementById(`drill-diagram-${i}`);
    if (el) renderCourt(el, dg.diagram);
  });
}

function renderPlayerStats() {
  const subhead = document.getElementById("players-subhead");
  const listEl = document.getElementById("player-list");
  if (!listEl || typeof PLAYER_STATS === "undefined") return;

  const stand = new Date(PLAYER_STATS.standDate + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  if (subhead) {
    subhead.textContent = `Players returning for next season, ranked by ${PLAYER_STATS.season} scoring — ${PLAYER_STATS.league}. Stats as of ${stand}; players not continuing with the team have been removed.`;
  }

  listEl.innerHTML = `
    <div class="table-scroll">
    <table class="schedule-table player-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Points</th>
          <th>Games</th>
          <th>Avg / Game</th>
        </tr>
      </thead>
      <tbody>
        ${PLAYER_STATS.players
          .map(
            (p) => `
          <tr>
            <td class="schedule-day">${p.rank}.</td>
            <td class="player-name">${p.lastName ? `${p.lastName}, ${p.firstName}` : `<span class="text-muted">Name withheld</span>`}</td>
            <td class="player-points">${p.points}</td>
            <td class="schedule-time">${p.games}</td>
            <td class="player-avg">${p.average.toFixed(1)}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
    </div>
    <p class="schedule-source">Source: <a href="${PLAYER_STATS.source}" target="_blank" rel="noopener">${PLAYER_STATS.source}</a>${
      PLAYER_STATS.players.some((p) => !p.lastName) ? " — some players' names are withheld by the league itself, not by us." : ""
    }</p>
    ${
      PLAYER_STATS.newcomers && PLAYER_STATS.newcomers.length
        ? `
    <h2 class="section-heading">Newcomers</h2>
    <p class="schedule-intro">New to the team this season — no stats with KuSG Leimen 3 yet.</p>
    <div class="newcomer-grid">
      ${PLAYER_STATS.newcomers.map((n) => `<div class="newcomer-card">${n.firstName} ${n.lastName}</div>`).join("")}
    </div>`
        : ""
    }`;
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

document.addEventListener("DOMContentLoaded", () => {
  markActiveNavLink();
  renderSeasonSchedule();
  renderGameSchedule();
  renderPlanFilters();
  renderTrainingPlans();
  renderPlayFilters();
  renderSetPlays();
  renderPlayDetail();
  renderDefenseFilters();
  renderDefenseSets();
  renderDefenseDetail();
  renderDrillFilters();
  renderDrills();
  renderDrillDetail();
  renderPlayerStats();
});
