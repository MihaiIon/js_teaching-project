var PREVIEW_LENGTH = 4;

var isEnoughWordsInSentence = function(sentence, length) {
  return sentence.split(" ").length > length;
};

var formatSentence = function(sentence) {
  return sentence;
};

var createPreview = function(sentence, length) {
  return sentence
    .split(" ")
    .reverse()
    .slice(length)
    .reverse()
    .join(" ");
};

var onAppendSentenceToStory = function(story, sentence) {
  return true;
};

var onRevealStory = function(story) {
  return story.join(" ");
};
