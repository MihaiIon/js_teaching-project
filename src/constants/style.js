// ======================================================
// Constants / Style
// ======================================================

import { atomDark } from "react-syntax-highlighter/dist/styles/prism";

// Code
// ======================================================

// console.log(atomDark);
atomDark.keyword.color = "#da99ff";
atomDark.keyword.fontWeight = "bold";
atomDark.function.color = "#7fd5ff";
atomDark["class-name"].color = "#56fbdd";
atomDark["class-name"].fontWeight = "bold";
atomDark['pre[class*="language-"]'].background = "#29272a";

export const codeStyle = atomDark;
