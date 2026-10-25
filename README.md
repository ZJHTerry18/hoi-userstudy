# Hand-Object Interaction Generation User Study

A web page of pairwise comparisons. Each curated sample (currently 5 ARCTIC + 15 HOT3D) gives two questions, ours vs MDM and ours vs BimArt-HO, so 40 questions in total. They are shuffled per participant, ours is randomly placed left or right, and the participant picks the more realistic video. A start page shows the instructions first. On "Finish" the answers are submitted automatically to a Google Sheet, or downloaded as a `.json` file if that fails.

## What gets published

Only these files are needed online:

```
index.html
trials.js           # question / instructions / settings
trials_data.js      # generated list of videos
videos_selected/    # 90 H.264 clips, ~13 MB
```

Do **not** upload `videos/` (raw renders, ~2.2 GB), `videos_preview/`, `curate.html` or `tools/`.

## 0. Choose the samples and views (curation tool, for you only)

Raw renders live in `videos/<model>/videos/<dataset>/<sample>_pred[_front|_back|_left|_right].mp4`.

1. Make small browser-playable previews (one-off, ~2 min; re-run after adding new videos):
   ```bash
   python3 tools/make_previews.py
   ```
2. Start the curation tool and open http://localhost:8766/curate.html:
   ```bash
   python3 tools/curate_server.py
   ```
3. For each sample you see 3 rows (ours / BimArt-HO / MDM) x 5 views, all playing in sync.
   - Pick a view: keys **1–5** or click a column.
   - **Enter** selects the sample with that view; **X** rejects it. Both jump to the next undecided sample.
   - **←/→** browse, **U** next undecided, **R** restart videos, **Space** pause.
   - Switch dataset with the tabs at the top; set the **Target per dataset** there.
4. Every decision is saved immediately to `tools/curation.json`. Stop whenever the counters reach your target (a green banner tells you); reopening the page resumes where you left off. Click a chip under "Selected" to revisit or change a pick.
5. Build the study videos from your picks (re-encodes the chosen views into `videos_selected/` and writes `trials_data.js`):
   ```bash
   python3 tools/build_selected.py
   ```

## 1. Test it locally

```bash
cd userstudy
python3 -m http.server 8765
```

Open http://localhost:8765 and click through a few questions. (Opening `index.html` directly from Finder does not work — it must be served over HTTP.)

## 2. Put it online (GitHub Pages, free)

1. Create a new **public** GitHub repository, e.g. `hoi-userstudy`. (Pages on a private repo needs a paid plan. Anyone with the link can see the videos either way.)
2. From the `userstudy` folder:
   ```bash
   printf "videos/\nvideos_preview/\ncurate.html\ntools/\n.claude/\n.DS_Store\n" > .gitignore
   git init && git add . && git commit -m "User study"
   git branch -M main
   git remote add origin https://github.com/<your-username>/hoi-userstudy.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
4. After ~1 minute the study is live at `https://<your-username>.github.io/hoi-userstudy/`. Open it once yourself and finish a full run to check.

Alternatives: drag the folder (without `videos/`) onto https://app.netlify.com/drop, or put it on university web space — any static host works.

If you change anything later (views, samples, wording), commit and push again; the site updates automatically.

## 3. Automatic result collection (Google Sheets, one-time setup)

Results are sent to a Google Sheet that you own, through a small Google Apps Script. It's free and needs no server. If submission ever fails, the page downloads the `.json` file instead and asks the participant to email it to you.

1. Go to https://sheets.new (signed in to Google) and name the sheet, e.g. `HOI user study results`.
2. In the sheet: **Extensions → Apps Script**. Delete the sample code, paste the contents of `tools/google_apps_script.js`, and click **Save**.
3. Click **Deploy → New deployment**. Click the gear icon next to "Select type" and choose **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click **Deploy** and authorise it. Google will warn that the app is unverified, because it's your own script: click **Advanced → Go to … (unsafe) → Allow**.
4. Copy the **Web app URL** (it ends in `/exec`). Opening it in a browser should show `{"ok":true,"message":"User study endpoint is running."}`.
5. Paste the URL into `trials.js`:
   ```js
   submitUrl: "https://script.google.com/macros/s/XXXX/exec",
   contactEmail: "you@example.com",   // shown only if submission fails
   ```
   Then commit and push.
6. Do one full test run on the live site and check that rows appear in the sheet. Delete the test rows before inviting participants.

The sheet gets two tabs, created on the first submission:
- `participants`: one row per participant, with how often ours won against each baseline, plus the full raw JSON.
- `responses`: one row per answered question (dataset, view, column layout, choice, response time).

Notes:
- If you later edit the script, use **Deploy → Manage deployments → ✏️ → Version: New version**. This keeps the same URL.
- If your university Google account doesn't offer "Anyone" access, use a personal Google account.

## 4. Invite participants

Send the link with a short message, for example:

> Hi! I'm running a short user study for my research on hand-object motion generation. It takes about 10–15 minutes and is anonymous.
> Please open this link on a **laptop/desktop** (Chrome, Firefox or Safari): https://<your-username>.github.io/hoi-userstudy/
> Your answers are submitted automatically when you click **Finish**. Thank you!

Aim for at least about 20 participants (about 600 judgments).

## 5. Analyse the results

In the Google Sheet, open the `responses` tab and use **File → Download → Comma-separated values (.csv)**, then:

```bash
python3 tools/analyze.py responses.csv
```

This prints, for each baseline, how often ours was preferred (overall and per dataset) with a two-sided binomial test against 50%. Any `.json` files emailed to you as a fallback can be included too:

```bash
python3 tools/analyze.py responses.csv results/*.json
```

## Changing the study

- Wording / instructions / randomisation: edit `trials.js`.
- Different samples or views: change them in the curation tool, then re-run `python3 tools/build_selected.py`, commit and push.
