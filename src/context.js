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
      "This variable will be used to determine the number of words that will be shown in the preview box.",
      "PREVIEW_LENGTH",
      Number,
      ({ PREVIEW_LENGTH }) =>
        function* testFunction() {
          yield expect(PREVIEW_LENGTH).to.be.a("number");
        }
    ),
    createFunctionStep(
      "This function receives 2 arguments: sentence and length. The length is the value of ...TODO",
      "createPreview",
      [["sentence", String], ["length", Number]],
      String,
      ({ createPreview }) =>
        function* testFunction() {
          yield expect(createPreview).to.be.a("function");
          yield expect(() => createPreview()).to.throws("caca");
          yield expect(createPreview("Mihai is a king lalala lalala alala")).to.be.a("string");
        }
    )
  ],
  currentStep: 0,
  copyrights: `Your Name © ${new Date().getFullYear()}  | your.email@domain.com`
};
