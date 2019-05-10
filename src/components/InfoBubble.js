import React, { useState, useEffect } from "react";

// Components
import Fade from "react-reveal/Fade";
import HelpIcon from "react-ionicons/lib/MdHelp";
import { Tooltip } from "react-tippy";

// Helpers
import { getCurrentStepHTML } from "../selectors";

// Constants
import { INFO_BUBBLE_DELAY } from "../constants/time";

// Info Bubble
// ======================================================

// Context
import { AppContext } from "./App";

function InfoBubble() {
  // Hooks
  const [isVisible, setVisibility] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => void setVisibility(state => !state), INFO_BUBBLE_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // Component
  return (
    <AppContext.Consumer>
      {({ state }) =>
        isVisible && (
          <Tooltip
            arrow
            arrowSize="big"
            position="left"
            className="c-info-bubble"
            html={getCurrentStepHTML(state)}
            interactive
          >
            <Fade bottom>
              <div className="c-info-bubble_circle">
                <button className="c-info-bubble_btn" type="button">
                  <HelpIcon className="c-info-bubble_icon" />
                </button>
              </div>
            </Fade>
          </Tooltip>
        )
      }
    </AppContext.Consumer>
  );
}

export default InfoBubble;
