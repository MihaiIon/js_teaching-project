import React from "react";
import PropTypes from "prop-types";
import cn from "classnames-helper";

function TextHighlight({ children, accent, bold, italic, main }) {
  return (
    <span
      className={cn(
        "c-text-highlight",
        ["-main", main && !accent && !bold && !italic],
        ["-accent", accent],
        ["-bold", bold],
        ["-italic", italic]
      )}
    >
      {children}
    </span>
  );
}

TextHighlight.defaultProps = {
  accent: false,
  bold: false,
  italic: false,
  main: true
};

TextHighlight.propTypes = {
  accent: PropTypes.bool,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  main: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default TextHighlight;
