// ======================================================
// Helpers
// ======================================================

import React, { Fragment } from "react";

// Components
import { Prism as Code } from "react-syntax-highlighter";
import ErrorIcon from "react-ionicons/lib/MdClose";
import ValidIcon from "react-ionicons/lib/MdCheckmark";

// Constants
import { codeStyle } from "./constants/style";

// Step Related
// ======================================================

class Validation {
  constructor(isValid, error = null) {
    this.isValid = isValid;
    this.error = error;
  }
}

/**
 * TODO
 * @param {Function*} generator TODO
 */
export const processTests = generator => {
  const iterator = generator();
  const results = [];
  let result = null;
  /* eslint-disable no-constant-condition */
  while (true) {
    try {
      result = iterator.next();
      if (!result.done) {
        results.push(new Validation(true));
      }
    } catch (err) {
      results.push(new Validation(false, err));
    }
    if (result === null || result.done) {
      console.log(results);
      return results;
    }
  }
  /* eslint-enable no-constant-condition */
};

// ------------------------------------------------------

class Step {
  constructor(label, description, codeDefinition, variables, testFunction) {
    this.label = label;
    this.description = description;
    this.codeDefinition = codeDefinition;
    this.data = this.getData(variables);
    this.validations = this.validate(testFunction);
  }

  /**
   * Provides an object that contains the value of each 'variable' in the the first argument
   * received by this function. If a variable hasn't been declared, its value in the returned
   * object will be 'null'.
   * @param {[String]} variables Array of variables name that should be available in the global scope
   */
  getData(variables) {
    if (window && typeof window === "object") {
      const data = {};
      for (let i = 0, varName = null; i < variables.length; i += 1) {
        varName = variables[i];
        data[varName] = typeof window[varName] === "undefined" ? null : window[varName];
      }
      return data;
    }
    throw new Error("Step | getData | Window object is missing");
  }

  /**
   * TODO
   * @param {Function} testFunction TODO
   */
  validate(testFunction) {
    return processTests(testFunction(this.data));
  }

  /**
   * TODO
   */
  getHTML() {
    const success = this.validations.filter(v => v.isValid);
    const fail = this.validations.filter(v => !v.isValid);
    console.log(this.validations, fail);
    return (
      <Fragment>
        <div className="c-info-bubble_content">
          <h3 className="c-info-bubble_label">{this.label}</h3>
          <p className="c-info-bubble_p">{this.description}</p>
          {this.codeDefinition}
        </div>
        <div className="c-info-bubble_assertions">
          <h3 className="c-info-bubble_label">assertions</h3>
          {success.length > 0 && (
            <div>
              <ValidIcon className="c-info-bubble_assertions_icon" color="current" />
              <span className="c-info-bubble_assertions_message">
                Passed <strong>{success.length}</strong> test(s)
              </span>
            </div>
          )}
          {fail.length > 0 && (
            <div>
              <ErrorIcon className="c-info-bubble_assertions_icon -error" color="current" />
              <span className="c-info-bubble_assertions_message -error">
                <strong>Failed</strong>
                {`: ${fail[0].error.message.charAt(0).toUpperCase()}${fail[0].error.message.slice(
                  1
                )}`}
              </span>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

/**
 * TODO
 * @param {String} label See -> constants/index.js#STEP_LABEL
 * @param {String | ReactElement} description A text that describes the step
 * @param {ReactElement} codeDefinition See -> helpers.js#create*ForStep()
 * @param {[String]} variables Array of variables name that should be available in the global scope
 * @param {Function} testFunction See -> helpers.js#createTestFunction()
 */
export const createStep = (
  label,
  description,
  codeDefinition = null,
  variables = [],
  testFunction = null
) => {
  if (variables.length === 0) {
    throw new Error("createStep | No variables where provided");
  } else if (!testFunction) {
    throw new Error("createStep | The argument 'testFunction' is undefined");
  }
  return new Step(label, description, codeDefinition, variables, testFunction);
};

// ------------------------------------------------------

/**
 * TODO
 * @param {String} name Function's name
 * @param {[[String, Object]]} params Function's parameters, ex: [[message, String], [count, Number], ...]
 * @param {String} returnType Function's return type, ex: String, Number, [Function], "void" etc.
 */
export const createFunctionDefinitionForStep = (name, params = [], returnType = "void") => (
  <Fragment>
    <Code
      language="javascript"
      style={codeStyle}
      className="c-info-bubble_pre"
      // useInlineStyles={false}
      codeTagProps={{ className: "c-info-bubble_code" }}
    >
      {[
        `function ${name} (${params
          .map(([pName, pType]) => `${pName} : ${pType.name}`)
          .join(", ")}) {`,
        "\t// ...",
        "}"
      ].join("\n")}
    </Code>
    <p className="c-info-bubble_p">Returns type:</p>
    <Code
      language="javascript"
      style={codeStyle}
      className="c-info-bubble_pre"
      codeTagProps={{ className: "c-info-bubble_code" }}
    >
      {returnType}
    </Code>
  </Fragment>
);

// ------------------------------------------------------

/**
 * TODO
 * @param {String} name Variable's name
 * @param {String | Object} type Expected type of the variable
 */
export const createVariableDefinitionForStep = (name, type) => (
  <Fragment>
    <Code
      language="javascript"
      style={codeStyle}
      className="c-info-bubble_pre"
      codeTagProps={{ className: "c-info-bubble_code" }}
    >
      {`var ${name} = ... ;`}
    </Code>
    <p className="c-info-bubble_p">Expected type:</p>
    <Code
      language="javascript"
      style={codeStyle}
      className="c-info-bubble_pre"
      codeTagProps={{ className: "c-info-bubble_code" }}
    >
      {typeof type === "string" || type instanceof String ? type : type.name}
    </Code>
  </Fragment>
);

// Highlight Related
// ======================================================

// export const createKeywordHighlight = str => (
//   <span className="c-info-bubble_highlight -keyword">{str}</span>
// );
// export const createNameHighlight = str => (
//   <span className="c-info-bubble_highlight -name">{str}</span>
// );
// export const createStringHighlight = str => (
//   <span className="c-info-bubble_highlight -string">{str}</span>
// );
