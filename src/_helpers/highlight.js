// ======================================================
// Helpers / Highlight
// ======================================================

import React from "react";
import uniqid from "uniqid";

// Helper
// ======================================================

import { isString } from ".";

const flatten = array =>
  array.reduce(
    (flat, toFlatten) => flat.concat(toFlatten instanceof Array ? flatten(toFlatten) : toFlatten),
    []
  );

// Create Elements
// ======================================================

/**
 * TODO
 * @param {String} str Link's content
 * @param {String} href Link's location
 */
const createLink = (text, href) => (
  <a key={uniqid(text)} className="o-link" href={href} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
);

// ------------------------------------------------------

/**
 * TODO
 * @param {String} str Span's content
 * @param {String} [className=""] Class name that will be used for the span
 */
const createSpan = (str, className = "") => (
  <span key={uniqid(str)} className={`c-text-highlight ${className}`}>
    {str}
  </span>
);

// ------------------------------------------------------

/**
 * TODO
 * @param {String} str Span's content
 */
const createMainSpan = str => createSpan(str, "-main");

/**
 * TODO
 * @param {String} str Span's content
 */
const createAccentSpan = str => createSpan(str, "-accent");

/**
 * TODO
 * @param {String} str Span's content
 */
const createBoldSpan = str => createSpan(str, "-bold");

/**
 * TODO
 * @param {String} str Span's content
 */
const createItalicSpan = str => createSpan(str, "-italic");

// Regex
// ======================================================

const mainRegex = /\$\[([ a-zA-Z0-9*-+_ ]+)\]/g;
const accentRegex = /\$\$\[([ a-zA-Z0-9*-+_ ]+)\]/g;
const boldRegex = /\*\*([a-zA-Z0-9-+_ ]+)\*\*/g;
const italicRegex = /_([a-zA-Z0-9-+ ]+)_/g;

// Parse Syntaxe
// ======================================================

/**
 * TODO
 * @param {String} str Raw text
 */
const highlightParser = str => {
  console.log(str);
  return flatten(
    flatten(
      str
        .split(accentRegex)
        .map((s, index) => (index % 2 === 0 ? s : createAccentSpan(highlightParser(s))))
        .map(obj =>
          isString(obj)
            ? obj
                .split(mainRegex)
                .map((s, index) => (index % 2 === 0 ? s : createMainSpan(highlightParser(s))))
            : obj
        )
    ).map(obj =>
      isString(obj)
        ? obj
            .split(boldRegex)
            .map((s, index) => (index % 2 === 0 ? s : createBoldSpan(highlightParser(s))))
        : obj
    )
  ).map(obj =>
    isString(obj)
      ? obj
          .split(italicRegex)
          .map((s, index) => (index % 2 === 0 ? s : createItalicSpan(highlightParser(s))))
      : obj
  );
};

/**
 * TODO
 * @param {String|String[]} [obj=""] TODO
 * @param {String} className TODO
 */
export const highlightText = (obj = "", className = "o-p") => {
  if (isString(obj)) return <p className={className}>{highlightParser(obj)}</p>;
  if (obj instanceof Array) {
    return obj
      .filter(o => isString(o))
      .map(str => <p className={className}>{highlightParser(str)}</p>);
  }
  return null;
};
