// Study configuration. The trial list itself (video paths) is generated into trials_data.js
// by tools/build_selected.py.
const GOOD_POINTS = [
  "Good hand-object interaction",
  "Good object motion related to the scene",
  "No penetration between hand, object and scene",
];

window.STUDY_CONFIG = {
  title: "3D Hand-Object Interaction Generation User Study",
  question: "Which hand-object motion looks more realistic in the scene?",
  // Shown under the question on every page, and as instruction 4 on the start page.
  criteria: "Evaluate based on <strong>Hand-object motion quality</strong> and the <strong>Motion Reality in Scene</strong>.",
  // Text block at the top of the guidance (examples) page. HTML allowed.
  guidance: `
    <p>Evaluate based on <strong>Hand-object motion quality</strong> and the <strong>Motion Reality in Scene</strong>.</p>
    <p><strong>(i) Hand-object Motion Quality</strong>. Good samples should be:</p>
    <ul>
      <li>Hand-object grasp or manipulation looks natural;</li>
      <li>No hand-object penetration.</li>
    </ul>
    <p><strong>(ii) Motion Reality in Scene</strong>. Good samples should be:</p>
    <ul>
      <li>Hand-object activity looks natural in the scene.</li>
      <li>Object lying on the scene surface when hand is away (not floating).</li>
      <li>No hand-scene, object-scene penetrations.</li>
    </ul>`,
  // Instructions may contain simple HTML such as <strong>.
  instructions: [
    "In each question you will see two rendered videos of hands interacting with an object in a 3D scene, shown side by side.",
    "Watch both videos carefully. They loop automatically.",
    "Choose the video (Left or Right) whose hand-object motion looks more realistic in the scene. You can also press <kbd>←</kbd> or <kbd>→</kbd>.",
    "You can review the good and bad examples at any time with the \"View Examples\" button.",
    "Click \"Next\" (or press <kbd>Enter</kbd>) to continue. On the last question, click \"Finish\" and your answers will be submitted automatically.",
  ],
  // Example clips shown after Start (and via "View Examples" during the questions).
  // Optional `detail` is a smaller explanatory line shown under the points.
  examples: {
    good: [
      { src: "videos_selected/explanation/good_1.mp4", points: GOOD_POINTS },
      { src: "videos_selected/explanation/good_2.mp4", points: GOOD_POINTS },
    ],
    bad: [
      { src: "videos_selected/explanation/bad_1.mp4", points: ["Unnatural hand-object interaction"],
        detail: "hand is not grasping the object properly" },
      { src: "videos_selected/explanation/bad_2.mp4", points: ["Object motion unrealistic in the scene"],
        detail: "object is not placed on surface" },
      { src: "videos_selected/explanation/bad_3.mp4", points: ["Penetration between hand, object and scene"] },
    ],
  },
  notes: [
    "Please use a laptop or desktop browser (Chrome, Firefox or Safari).",
    "It takes about 5–10 minutes and has {n} questions.",
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
  // Keyboard shortcut per position: KeyboardEvent.key and the label shown on the button.
  shortcuts: [{ key: "ArrowLeft", label: "←" }, { key: "ArrowRight", label: "→" }],
  randomizePositions: true,  // randomly swap which method is on the left, per question
  randomizeOrder: true,      // shuffle question order per participant
  trials: window.STUDY_TRIALS,
};
