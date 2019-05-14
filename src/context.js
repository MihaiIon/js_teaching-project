// ======================================================
// Context
// ======================================================

import { expect } from "chai";

// Helper
import {
  createStep,
  createVariableDefinitionForStep,
  createFunctionDefinitionForStep
} from "./helpers";

// Constants
import { STEP_LABEL as LABEL } from "./constants";

// Export
// ======================================================

export default {
  title: "StoryTeller",
  steps: [
    createStep(
      LABEL.VARIABLE,
      "Create a variable (constant in this case) named PREVIEW_LENGTH. This variable will be used to determine the number of words that will be shown in the preview box.",
      createVariableDefinitionForStep("PREVIEW_LENGTH", Number),
      ["PREVIEW_LENGTH"],
      ({ PREVIEW_LENGTH }) =>
        function* testFunction() {
          yield expect(PREVIEW_LENGTH).to.be.a("number");
        }
    )
    // createStep(
    //   LABEL.FUNCTION,
    //   "Create a variable (constant in this case) named PREVIEW_LENGTH. This variable will be used to determine the number of words that will be shown in the preview box.",
    //   createVariableDefinitionForStep("PREVIEW_LENGTH", Number),
    //   ["PREVIEW_LENGTH"],
    //   ({ PREVIEW_LENGTH }) =>
    //     function* testFunction() {
    //       yield expect(PREVIEW_LENGTH).to.be.a("number");
    //     }
    // ),
  ],
  currentStep: 0
};
