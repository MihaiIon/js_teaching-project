// ======================================================
// Context
// ======================================================

import { expect } from "chai";

// Helper
import { createVariableStep, createFunctionStep } from "./_helpers/step";

// Export
// ======================================================

export default {
  title: "StoryTeller",
  steps: [
    createVariableStep(
      "This variable will be used to determine the $[number of words] that will be shown in the $[preview box].",
      "PREVIEW_LENGTH",
      Number,
      ({ PREVIEW_LENGTH }) =>
        function* testFunction() {
          yield expect(PREVIEW_LENGTH).to.be.a("number");
        }
    ),
    createFunctionStep(
      [
        "This function must return $$[true] if the **sentence** contains $[at least] **length** $$[+ 1] words.",
        "The second argument is the value of the variable **PREVIEW_LENGTH**."
      ],
      "isEnoughWordsInSentence",
      [["sentence", String], ["length", Number]],
      Boolean,
      ({ isEnoughWordsInSentence }) =>
        function* testFunction() {
          yield expect(isEnoughWordsInSentence).to.be.a("function");
          yield expect(isEnoughWordsInSentence("", 3)).to.equal(false);
          yield expect(isEnoughWordsInSentence("test test test", 3)).to.equal(false);
          yield expect(isEnoughWordsInSentence("test test test", 2)).to.equal(true);
        }
    ),
    createFunctionStep(
      "Description",
      "formatSentence",
      [["sentence", String]],
      String,
      ({ formatSentence }) =>
        function* testFunction() {
          yield expect(formatSentence).to.be.a("function");
        }
    ),
    createFunctionStep(
      [
        "This function must return the $[last words] of the **sentence**.",
        "The second argument is the value of the variable **PREVIEW_LENGTH**."
      ],
      "createPreview",
      [["sentence", String], ["length", Number]],
      String,
      ({ createPreview }) =>
        function* testFunction() {
          yield expect(createPreview).to.be.a("function");
          yield expect(createPreview("Mihai is a king lalala lalala alala")).to.be.a("string");
        }
    ),
    createFunctionStep(
      "Description",
      "onAppendSentenceToStory",
      [["story", "String[ ]"]],
      "null",
      ({ onAppendSentenceToStory }) =>
        function* testFunction() {
          yield expect(onAppendSentenceToStory).to.be.a("function");
        }
    ),
    createFunctionStep(
      "Description",
      "onRevealStory",
      [["story", "String[ ]"]],
      String,
      ({ onRevealStory }) =>
        function* testFunction() {
          yield expect(onRevealStory).to.be.a("function");
        }
    )
  ],
  currentStep: 0,
  copyrights: `Your Name © ${new Date().getFullYear()}  | your.email@domain.com`
};
