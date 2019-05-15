import React from "react";
import cn from "classnames-helper";

// Components
import Fade from "react-reveal/Fade";
import HelpIcon from "react-ionicons/lib/MdHelp";
import NextIcon from "react-ionicons/lib/IosArrowForward";
import PreviousIcon from "react-ionicons/lib/IosArrowBack";
import Tooltip from "./Tooltip";

// Helpers
import { getCurrentStep, isCurrentStepValid, isFirstStep, isLastStep } from "../selectors";

// Context
import { AppContext, nextStepAction, previousStepAction } from "./App";

// Info Bubble
// ======================================================

function InfoBubble() {
  return (
    <Fade bottom>
      <div className="c-info-bubble_circle">
        <button className="c-info-bubble_btn" type="button">
          <HelpIcon className="c-info-bubble_icon" />
        </button>
      </div>
    </Fade>
  );
}

// ------------------------------------------------------

function InfoBubbleWrapper() {
  return (
    <AppContext.Consumer>
      {({ state, dispatch }) => (
        <Tooltip
          target={InfoBubble}
          scrollableContent={getCurrentStep(state).getContentHTML()}
          className="c-info-bubble"
        >
          {getCurrentStep(state).getAssertionsHTML()}
          <div className="o-layout">
            <button
              className={cn("o-layout_item u-1/2", "c-info-bubble_control-btn", [
                "-disabled",
                isFirstStep(state)
              ])}
              type="button"
              onClick={isFirstStep(state) ? null : () => dispatch(previousStepAction())}
            >
              <PreviousIcon className="c-info-bubble_control-btn_icon" />
            </button>
            <button
              className={cn("o-layout_item u-1/2", "c-info-bubble_control-btn", [
                "-disabled",
                isLastStep(state) || !isCurrentStepValid(state)
              ])}
              type="button"
              onClick={
                isLastStep(state) || !isCurrentStepValid(state)
                  ? null
                  : () => dispatch(nextStepAction())
              }
            >
              <NextIcon className="c-info-bubble_control-btn_icon" />
            </button>
          </div>
        </Tooltip>
      )}
    </AppContext.Consumer>
  );
}

export default InfoBubbleWrapper;
