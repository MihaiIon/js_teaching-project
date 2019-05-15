import React from "react";
import PropTypes from "prop-types";

// Components
import { Tooltip } from "react-tippy";

function TooltipWrapper({ className, children, target: Target }) {
  return (
    <Tooltip
      arrow
      arrowSize="big"
      position="left"
      className={className}
      html={children}
      interactive
    >
      {<Target />}
    </Tooltip>
  );
}

TooltipWrapper.defaultProps = {
  className: ""
};

TooltipWrapper.propTypes = {
  className: PropTypes.string,
  target: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default TooltipWrapper;
