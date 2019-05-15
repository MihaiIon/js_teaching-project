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
      "",
      "example",
      String,
      ({ example }) =>
        function* testFunction() {
          yield expect(example).to.be.a("string");
        }
    ),
    createVariableStep(
      "",
      "example2",
      String,
      ({ example2 }) =>
        function* testFunction() {
          yield expect(example2).to.be.a("string");
        }
    ),
    createVariableStep(
      "",
      "example3",
      String,
      ({ example3 }) =>
        function* testFunction() {
          yield expect(example3).to.be.a("string");
        }
    )
  ],
  currentStep: 0,
  copyrights: `Your Name © ${new Date().getFullYear()}  | your.email@domain.com`
};
