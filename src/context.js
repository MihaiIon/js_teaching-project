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
  title: "",
  steps: [
    createStep(
      LABEL.VARIABLES,
      "Create a variable named example.",
      createVariableDefinitionForStep("example", String),
      ["example"],
      ({ example }) =>
        function* testFunction() {
          yield expect(example).to.be.a("string");
        }
    )
  ],
  currentStep: 0
};
