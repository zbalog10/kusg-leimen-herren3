# KuSG Leimen Herren 3 — Team Playbook

Static site (no build step, no backend). Open `index.html` directly, or serve the
folder with any static file server, to view it locally.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Editing content

All content lives in [`js/data.js`](js/data.js) — everything else renders
automatically from it.

### Training plans

Add an entry to the `TRAINING_PLANS` array:

```js
{
  id: "unique-id",
  title: "Week X · Session Y — Title",
  date: "2026-09-08",       // YYYY-MM-DD
  category: "Defense",       // becomes a filter tab automatically
  duration: "90 min",
  objective: "...",
  warmup: "...",
  drills: [
    { name: "Drill name", time: "10 min", desc: "..." },
  ],
  notes: "optional, omit the field to skip the notes box",
}
```

### Set plays

Add an entry to the `SET_PLAYS` array. The court diagram uses a normalized
coordinate system: `x` runs 0–100 sideline to sideline, `y` runs 0–100 with the
**hoop at y=0** and the half-court line at y=100.

Player numbering convention: `1` = point guard, `2` = shooting guard,
`3` = small forward, `4` = power forward, `5` = center.

```js
{
  id: "unique-id",
  name: "Play Name",
  category: "Half-Court Offense",   // becomes a filter tab automatically
  description: "...",
  keyPoints: ["...", "..."],
  diagram: {
    players: [
      { id: "1", label: "1", x: 50, y: 85 },
      // ...one entry per player. Add { team: "defense" } for a defender marker.
    ],
    actions: [
      { type: "cut",   path: [{ x: 50, y: 85 }, { x: 50, y: 60 }] }, // solid green arrow
      { type: "pass",  from: { x: 50, y: 85 }, to: { x: 38, y: 55 } }, // dashed grey arrow
      { type: "screen", at: { x: 62, y: 55 }, angle: 90 },              // red bar, angle in degrees
    ],
  },
}
```

Tip: sketch the play on paper first with x/y as rough percentages of the
half-court width/depth, then transcribe the coordinates — no need to be exact.

## Deploying to GitHub Pages

1. Create a repo on GitHub (public, so Pages is free) and push this folder to it.
2. In the repo settings → Pages, set the source to the `main` branch, root folder.
3. The site will be live at `https://<username>.github.io/<repo-name>/`.

Whenever you edit `js/data.js`, commit and push — the live site updates within
a minute or two.
