// Study configuration. The trial list itself (video paths) is generated into trials_data.js
// by tools/build_selected.py.
window.STUDY_CONFIG = {
  title: "Hand-Object Interaction Generation User Study",
  question: "Which hand-object motion looks more realistic in the scene?",
  instructions: [
    "In each question you will see two videos of hands interacting with an object, shown side by side.",
    "Watch both videos carefully. They loop automatically; use \"Replay both\" to restart them together.",
    "Choose the video (Left or Right) whose hand-object motion looks more realistic in the scene.",
    "Consider contact, penetration, hand pose naturalness and motion smoothness.",
    "Click \"Next\" to continue. On the last question, click \"Finish\" and your answers will be submitted automatically.",
  ],
  notes: [
    "Please use a laptop or desktop browser (Chrome, Firefox or Safari).",
    "It takes about 10–15 minutes and has {n} questions.",
    "Don't refresh the page partway through: progress isn't saved and you would start over.",
  ],
  // Google Apps Script web app URL (see README, "Automatic result collection").
  // Leave empty to fall back to downloading the .json file.
  submitUrl: "",
  // Shown only if automatic submission fails, so the participant can email the file instead.
  contactEmail: "",  // TODO: your email address
  // Each sample becomes one question per comparison (keys into each sample's `videos`).
  comparisons: [["ours", "mdm"], ["ours", "bimart-ho"]],
  positions: ["Left", "Right"],
  randomizePositions: true,  // randomly swap which method is on the left, per question
  randomizeOrder: true,      // shuffle question order per participant
  trials: window.STUDY_TRIALS,
};
