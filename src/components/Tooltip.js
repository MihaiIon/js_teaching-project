import React from "react";
import PropTypes from "prop-types";

// Components
import PerfectScrollbar from "react-perfect-scrollbar";
import { Tooltip } from "react-tippy";

function TooltipWrapper({ className, children, target: Target }) {
  const scrollbarOptions = {
    suppressScrollX: true,
    scrollYMarginOffset: 20
  };
  return (
    <Tooltip
      arrow
      arrowSize="big"
      position="left"
      className={className}
      html={<PerfectScrollbar options={scrollbarOptions}>{children}</PerfectScrollbar>}
      interactiveBorder={20}
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
