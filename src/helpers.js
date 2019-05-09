// ======================================================
// Helpers
// ======================================================

import React, { Fragment } from "react";
import { Prism as Code } from "react-syntax-highlighter";

// Constants
import { codeStyle } from "./constants/style";

export const createStep = (label, description, codeDefinition = null, asserts = []) => (
  <Fragment>
    <h3 className="c-info-bubble_label">{label}</h3>
    <p className="c-info-bubble_p">{description}</p>
    {codeDefinition}
  </Fragment>
);

/**
 *
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
