import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Components
import PerfectScrollbar from "react-perfect-scrollbar";
import { Tooltip } from "react-tippy";

function TooltipWrapper({ className, children, target: Target, scrollableContent }) {
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
      html={
        <Fragment>
          {scrollableContent !== null && (
            <PerfectScrollbar options={scrollbarOptions}>{scrollableContent}</PerfectScrollbar>
          )}
          {children}
        </Fragment>
      }
      interactiveBorder={20}
      interactive
    >
      {<Target />}
    </Tooltip>
  );
}

TooltipWrapper.defaultProps = {
  className: "",
  children: null,
  scrollableContent: null
};

TooltipWrapper.propTypes = {
  className: PropTypes.string,
  target: PropTypes.func.isRequired,
  children: PropTypes.node,
  scrollableContent: PropTypes.node
};

export default TooltipWrapper;
