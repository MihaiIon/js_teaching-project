import React, { useState, useEffect } from "react";

// Components
import Fade from "react-reveal/Fade";
import HelpIcon from "react-ionicons/lib/MdHelp";
import { Manager, Reference } from "react-popper";
import Tooltip from "../modules/Tooltip";

// Context
import { AppContext } from "./App";

// Helpers
import { createFunctionDefinitionForStep } from "../helpers";

// Constants
import { INFO_BUBBLE_DELAY } from "../constants/time";

// Info Bubble
// ======================================================

function InfoBubble() {
  // Hooks
  const [state, setState] = useState({
    isInfoBubbleVisible: false,
    isTooltipVisible: false
  });
  useEffect(() => {
    const timer = setTimeout(
      () => void setState(currentState => ({ ...currentState, isInfoBubbleVisible: true })),
      INFO_BUBBLE_DELAY
    );
    return () => clearTimeout(timer);
  }, []);

  // Component
  return (
    <AppContext.Consumer>
      {() => (
        <Manager>
          {/* Trigger */}
          {/* ====================================================== */}
          <Reference>
            {({ ref }) =>
              state.isInfoBubbleVisible && (
                <Fade bottom>
                  <aside
                    ref={ref}
                    className="c-info-bubble"
                    onMouseEnter={() =>
                      setState(({ isTooltipVisible, ...rest }) => ({
                        ...rest,
                        isTooltipVisible: true
                      }))
                    }
                    onMouseLeave={() =>
                      setState(({ isTooltipVisible, ...rest }) => ({
                        ...rest,
                        isTooltipVisible: false
                      }))
                    }
                  >
                    <button className="c-info-bubble_btn" type="button">
                      <HelpIcon className="c-info-bubble_icon" />
                    </button>
                  </aside>
                </Fade>
              )
            }
          </Reference>
          {/* Tooltip */}
          {/* ====================================================== */}
          <Tooltip placement="left" show={state.isTooltipVisible}>
            {createFunctionDefinitionForStep("melissa", [["name", Function], ["pipi", Number]])}
          </Tooltip>
        </Manager>
      )}
    </AppContext.Consumer>
  );
}

export default InfoBubble;
