// ======================================================
// Constants / Style
// ======================================================

import { atomDark } from "react-syntax-highlighter/dist/styles/prism";

// Code
// ======================================================

console.log(atomDark);
atomDark.keyword.color = "#ce7bfd";
atomDark.keyword.fontWeight = "bold";
atomDark.function.color = "#7fd5ff";
atomDark["class-name"].color = "rgb(99, 255, 227)";
atomDark["class-name"].fontWeight = "bold";
atomDark['pre[class*="language-"]'].background = "#272a2c";

export const codeStyle = atomDark;
