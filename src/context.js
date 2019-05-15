// ======================================================
// Context
// ======================================================

import { expect } from "chai";

// Helper
import { createVariableStep, createFunctionStep } from "./helpers";

// Export
// ======================================================

export default {
  title: "StoryTeller",
  steps: [
    createVariableStep(
      "Create a variable (constant in this case) named PREVIEW_LENGTH. This variable will be used to determine the number of words that will be shown in the preview box.",
      "PREVIEW_LENGTH",
      Number,
      ({ PREVIEW_LENGTH }) =>
        function* testFunction() {
          yield expect(PREVIEW_LENGTH).to.be.a("number");
        }
    )
  ],
  currentStep: 0,
  copyrights: `Your Name © ${new Date().getFullYear()}  | your.email@domain.com`
};
