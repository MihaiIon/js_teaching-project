import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { animated as a, Transition } from "react-spring/renderprops";

// Components
import Description from "./Description";

// Constants
import { PANEL_DELAY, CONTENT_DELAY } from "../constants/time";

function Container({ children }) {
  const [state, setState] = useState({
    isContentVisible: false,
    isHeaderVisible: false,
    isPanelVisible: false
  });
  useEffect(() => {
    const contentTimer = setTimeout(
      () => setState(({ isContentVisible, ...rest }) => ({ isContentVisible: true, ...rest })),
      CONTENT_DELAY
    );

    const panelTimer = setTimeout(
      () => setState(({ isPanelVisible, ...rest }) => ({ isPanelVisible: true, ...rest })),
      PANEL_DELAY
    );
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(panelTimer);
    };
  }, []);
  return (
    <Transition
      items={state.isPanelVisible}
      from={{ opacity: 0, height: "0vh" }}
      leave={{ opacity: 0, height: "0vh" }}
      enter={{ opacity: 1, height: "100vh" }}
    >
      {show =>
        show &&
        (props => (
          <a.main className="c-container" style={props}>
            <section className="o-container" style={props}>
              {state.isContentVisible && (
                <div className="o-layout">
                  <div className="o-layout_item u-1/2">
                    <div className="c-container_panel">
                      <Description />
                    </div>
                  </div>
                  <div className="o-layout_item u-1/2">
                    <div className="c-container_panel">{children}</div>
                  </div>
                </div>
              )}
            </section>
          </a.main>
        ))
      }
    </Transition>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired
};

export default Container;
