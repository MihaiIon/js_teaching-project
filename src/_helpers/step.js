// ======================================================
// Helpers / Step
// ======================================================

import React, { Fragment } from "react";

// Components
import { Prism as Code } from "react-syntax-highlighter";
import ErrorIcon from "react-ionicons/lib/MdClose";
import ValidIcon from "react-ionicons/lib/MdCheckmark";

// Helpers
import { isString } from ".";
import { highlightText } from "./highlight";

// Constants
import { STEP_LABEL } from "../constants";
import { codeStyle } from "../constants/style";

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
      return results;
    }
  }
  /* eslint-enable no-constant-condition */
};

// ------------------------------------------------------

class Step {
  constructor(label, description, codeDefinition, variables, testFunction) {
    this.label = label;
    this.description = highlightText(description, "c-info-bubble_p");
    this.codeDefinition = codeDefinition;
    this.data = this.getData(variables);
    this.validations = this.validate(testFunction);
  }

  /**
   * Provides an object that contains the value of each 'variable' in the the first argument
   * received by this function. If a variable hasn't been declared, its value in the returned
   * object will be 'null'.
   * @param {String[]} variables Array of variables name that should be available in the global scope
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
    throw new Error("Step|getData|Window object is missing");
  }

  /**
   * TODO
   * @param {Function} testFunction TODO
   */
  validate(testFunction) {
    return processTests(testFunction(this.data));
  }

  getSuccessfulAssertionsHTML() {
    const success = this.validations.filter(v => v.isValid);
    const Message = ({ children }) => (
      <span className="c-info-bubble_assertions_message">{children}</span>
    );
    return (
      success.length > 0 && (
        <div>
          <ValidIcon className="c-info-bubble_assertions_icon" color="current" />
          {success.length === this.validations.length ? (
            <Message>
              Passed <b>all</b> tests
            </Message>
          ) : (
            <Message>
              Passed <b>{success.length}</b> of <b>{this.validations.length}</b> tests
            </Message>
          )}
        </div>
      )
    );
  }

  getSFailedAssertionsHTML() {
    const fail = this.validations.filter(v => !v.isValid);
    return (
      fail.length > 0 && (
        <div>
          <span className="c-info-bubble_assertions_message -error">
            <ErrorIcon className="c-info-bubble_assertions_icon -error" color="current" />
            <strong>Failed</strong>
            {`: ${fail[0].error.message.charAt(0).toUpperCase()}${fail[0].error.message.slice(1)}`}
          </span>
        </div>
      )
    );
  }

  /**
   * TODO
   */
  getAssertionsHTML() {
    return (
      <div className="c-info-bubble_assertions">
        <h3 className="c-info-bubble_label">assertions</h3>
        <hr className="c-info-bubble_hr" />
        {this.getSuccessfulAssertionsHTML()}
        {this.getSFailedAssertionsHTML()}
      </div>
    );
  }

  /**
   * TODO
   */
  getContentHTML() {
    return (
      <div className="c-info-bubble_content">
        <h3 className="c-info-bubble_label">{this.label}</h3>
        <hr className="c-info-bubble_hr" />
        {this.description}
        {this.codeDefinition}
      </div>
    );
  }
}

/**
 * TODO
 * @param {String} label See -> constants/index.js#STEP_LABEL
 * @param {String|ReactElement} description A text that describes the step
 * @param {ReactElement} [codeDefinition=null] See -> helpers.js#create*ForStep()
 * @param {String[]} [variables=[]] Array of variables name that should be available in the global scope
 * @param {Function} [testFunction=null] See -> helpers.js#createTestFunction()
 */
export const createStep = (
  label,
  description,
  codeDefinition = null,
  variables = [],
  testFunction = null
) => {
  if (variables.length === 0) {
    throw new Error("createStep|No variables where provided");
  } else if (!testFunction) {
    throw new Error("createStep|The argument 'testFunction' is undefined");
  }
  return new Step(label, description, codeDefinition, variables, testFunction);
};

/**
 * TODO
 * @param {String|ReactElement} description A text that describes the step
 * @param {String} name Variable's name
 * @param {Object} expectedType Variable's type
 * @param {Function} testFunction See -> helpers.js#createTestFunction()
 * @param {String[]} [variables=[name]] Array of variables name that will be used in the test function. If no array is provided, an array with the **step variable** will be created.
 */
export const createVariableStep = (description, name, expectedType, testFunction, variables = []) =>
  createStep(
    STEP_LABEL.VARIABLE,
    description,
    createVariableDefinitionForStep(name, expectedType),
    variables.length === 0 ? [name] : variables,
    testFunction
  );

/**
 * TODO
 * @param {String|ReactElement} description A text that describes the step
 * @param {String} name Function's name
 * @param {[String, Object][]} [params=[]] Function's parameters, ex: [[message, String], [count, Number], ...]
 * @param {String} returnType Function's return type, ex: String, Number, [Function], "void" etc.
 * @param {Function} testFunction See -> helpers.js#createTestFunction()
 * @param {String[]} [variables=[name]] Array of variables name that will be used in the test function. If no array is provided, an array with the **step variable** will be created.
 */
export const createFunctionStep = (
  description,
  name,
  params = [],
  returnType,
  testFunction,
  variables = []
) =>
  createStep(
    STEP_LABEL.FUNCTION,
    description,
    createFunctionDefinitionForStep(name, params, returnType),
    variables.length === 0 ? [name] : variables,
    testFunction
  );

// ------------------------------------------------------

/**
 * TODO
 * @param {String} name Variable's name
 * @param {Object} type Expected type of the variable
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
      {isString(type) ? type : type.name}
    </Code>
  </Fragment>
);

// ------------------------------------------------------

/**
 * TODO
 * @param {String} name Function's name
 * @param {[String, Object][]} [params=[]] Function's parameters, ex: [[message, String], [count, Number], ...]
 * @param {String} [returnType="void"] Function's return type, ex: String, Number, [Function], "void" etc.
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
        `function ${name} (\n  ${params
          .map(([pName, pType]) => `${pName} : ${isString(pType) ? pType : pType.name}`)
          .join(",\n    ")}\n) {`,
        "    // ...",
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
      {isString(returnType) ? returnType : returnType.name}
    </Code>
  </Fragment>
);
