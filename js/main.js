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
            <span class="badge muted">${formatDate(p.date)}</span>
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

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

document.addEventListener("DOMContentLoaded", () => {
  markActiveNavLink();
  renderPlanFilters();
  renderTrainingPlans();
  renderPlayFilters();
  renderSetPlays();
});
