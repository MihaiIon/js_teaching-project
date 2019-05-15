// ======================================================
// Context
// ======================================================

import { expect } from "chai";

// Helper
import { createVariableStep, createFunctionStep } from "./_helpers/step";

// Export
// ======================================================

export default {
  title: "TITLE_DEMO",
  steps: [
    createVariableStep(
      "Descripton",
      "example",
      String,
      ({ example }) =>
        function* testFunction() {
          yield true;
        }
    )
  ],
  currentStep: 0,
  copyrights: `Your Name © ${new Date().getFullYear()}  | your.email@domain.com`
};
