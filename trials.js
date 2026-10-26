// Study configuration. The trial list itself (video paths) is generated into trials_data.js
// by tools/build_selected.py.
window.STUDY_CONFIG = {
  title: "3D Hand-Object Interaction Generation User Study",
  question: "Which hand-object motion looks more realistic in the scene?",
  // Instructions may contain simple HTML such as <strong>.
  instructions: [
    "In each question you will see two rendered videos of hands interacting with an object in a 3D scene, shown side by side.",
    "Watch both videos carefully. They loop automatically; use \"Replay both\" to restart them together.",
    "Choose the video (Left or Right) whose hand-object motion looks more realistic in the scene. You can also press <kbd>L</kbd> or <kbd>R</kbd>.",
    "Evaluate based on <strong>Hand-object motion quality</strong> and their <strong>Interactions with Scene</strong>.",
    "Click \"Next\" (or press <kbd>Enter</kbd>) to continue. On the last question, click \"Finish\" and your answers will be submitted automatically.",
  ],
  notes: [
    "Please use a laptop or desktop browser (Chrome, Firefox or Safari).",
    "It takes about 10–15 minutes and has {n} questions.",
    "Don't refresh the page partway through: progress isn't saved and you would start over.",
  ],
  // Google Apps Script web app URL (see README, "Automatic result collection").
  // Leave empty to fall back to downloading the .json file.
  submitUrl: "https://script.google.com/macros/s/AKfycbwa9-hAouV1dXD-BEHsQYi48b25YE2yYqydy22uzRN6jgycDCQWHUewg3FAEYyocKCp/exec",
  // Shown only if automatic submission fails, so the participant can email the file instead.
  contactEmail: "zhaojiahe1@gmail.com",  // TODO: your email address
  // Each sample becomes one question per comparison (keys into each sample's `videos`).
  comparisons: [["ours", "mdm"], ["ours", "bimart-ho"]],
  positions: ["Left", "Right"],
  randomizePositions: true,  // randomly swap which method is on the left, per question
  randomizeOrder: true,      // shuffle question order per participant
  trials: window.STUDY_TRIALS,
};
