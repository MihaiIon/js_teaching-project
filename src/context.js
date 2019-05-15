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
          yield expect(isEnoughWordsInSentence("", 3)).to.be.a("boolean");
          yield expect(isEnoughWordsInSentence("", 3)).to.equal(false);
          yield expect(isEnoughWordsInSentence("Testing this function.", 3)).to.equal(false);
          yield expect(isEnoughWordsInSentence("Testing this function.", 2)).to.equal(true);
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
          yield expect(formatSentence("Testing this function.")).to.be.a("string");
          yield expect(formatSentence("testing this function.")).to.equal("Testing this function.");
          yield expect(formatSentence("Testing this function")).to.equal("Testing this function.");
          yield expect(formatSentence("testing this function.")).to.equal("Testing this function.");
          yield expect(formatSentence("testing this function!")).to.equal("Testing this function!");
          yield expect(formatSentence("testing this function?")).to.equal("Testing this function?");
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
          yield expect(createPreview("Testing this function with words.", 2)).to.be.a("string");
          yield expect(createPreview("Testing this function with words.", 2)).to.equal(
            "...with words."
          );
          yield expect(createPreview("Testing this function with words.", 3)).to.equal(
            "...function with words."
          );
          yield expect(createPreview("Testing this function with words.", 4)).to.equal(
            "...this function with words."
          );
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
          yield expect(onAppendSentenceToStory).to.be.a("function");
          yield expect(onAppendSentenceToStory([], "", () => true)).to.be.a("boolean");
          yield expect(onAppendSentenceToStory([], "", () => true)).to.equal(true);
          yield expect(onAppendSentenceToStory([], sentence, () => false)).to.equal(false);
          const story = [];
          const sentence = "Once upon a time, there was a test.";
          onAppendSentenceToStory(story, sentence, () => true);
          yield expect(story).to.be.an("array");
          yield expect(story).to.have.length(1);
          yield expect(story).to.contain(sentence);
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
          const story = ["a", "b", "c"];
          yield expect(onRevealStory).to.be.a("function");
          yield expect(onRevealStory(story)).to.equal("a b c");
        }
    )
  ],
  currentStep: 0,
  copyrights: `Your Name © ${new Date().getFullYear()}  | your.email@domain.com`
};
