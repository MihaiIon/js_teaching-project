// ======================================================
// Context
// ======================================================

import { expect } from "chai";

// Helper
import { createStep, createFunctionDefinitionForStep } from "./helpers";

// Constants
import { STEP_LABEL as LABEL } from "./constants";

// Export
// ======================================================

export default {
  title: "",
  steps: [
    createStep(
      LABEL.FUNCTION,
      "Create a function lalala caca",
      createFunctionDefinitionForStep("melissa", [["name", Function], ["pipi", Number]]),
      ["melissa"],
      ({ melissa }) =>
        function* testFunction() {
          yield expect(2).to.be.a("number");
          yield expect(melissa).to.be.a("function");
          yield expect(melissa(5)).to.eql(5);
          yield expect(melissa(12, 4)).to.eql(3);
        }
    )
  ],
  currentStep: 0
};
