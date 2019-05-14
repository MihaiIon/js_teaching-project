import React from "react";
import PropTypes from "prop-types";
import { animated as a, Trail } from "react-spring/renderprops";
import cn from "classnames-helper";

function Preview({ value, full }) {
  return (
    <div className={cn("c-preview", ["-full", full])}>
      <Trail
        items={value
          .split(" ")
          .map((item, index) => ({ text: item, key: `story-fragment-${index}` }))}
        keys={item => item.key}
        from={{ opacity: 0, transform: "translate3d(0,0.6rem,0) scale(0.01)" }}
        to={{ opacity: 1, transform: "translate3d(0,0rem,0) scale(1)" }}
      >
        {item => props => (
          <a.span className="c-preview_fragment" style={props}>
            {item.text}
          </a.span>
        )}
      </Trail>
    </div>
  );
}

Preview.defaultProps = {
  value: "Once upon a time..."
};

Preview.propTypes = {
  full: PropTypes.bool.isRequired,
  value: PropTypes.string
};

export default Preview;
