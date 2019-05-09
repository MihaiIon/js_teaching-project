import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Components
import { Popper } from "react-popper";

function Tooltip({ children, placement: tooltipPlacement }) {
  return (
    <Popper placement={tooltipPlacement}>
      {({ ref, style, placement, arrowProps }) => (
        <div ref={ref} style={style} className="c-tooltip" data-placement={placement}>
          <div className="c-tooltip_content">{children}</div>
          <div ref={arrowProps.ref} style={arrowProps.style} className="c-tooltip_arrow" />
        </div>
      )}
    </Popper>
  );
}

Tooltip.defaultProps = {
  placement: "top"
};

Tooltip.propTypes = {
  show: PropTypes.bool.isRequired,
  placement: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Tooltip;
