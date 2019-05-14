import React, { useReducer } from "react";

// Components
import Routes from "../routes";
import InfoBubble from "./InfoBubble";

// App Context
// ======================================================

import ctx from "../context";

export const AppContext = React.createContext();
export const APP_ACTION_TYPE = {
  NEXT_STEP: "APP__NEXT_STEP",
  PREVIOUS_STEP: "APP__PREVIOUS_STEP",
  SET_STEP: "APP__SET_STEP"
};

// ------------------------------------------------------

const reducer = (state, action) => {
  switch (action.type) {
    case APP_ACTION_TYPE.NEXT_STEP:
      return { ...state, currentStep: state.currentStep + 1 };
    case APP_ACTION_TYPE.PREVIOUS_STEP:
      return { ...state, currentStep: state.currentStep - 1 };
    case APP_ACTION_TYPE.SET_STEP:
      return { ...state, currentStep: action.value };
    default:
      return state;
  }
};

// Component
// ======================================================

function App() {
  const [state, dispatch] = useReducer(reducer, ctx);
  return (
    <div id="js-app" className="c-app">
      <AppContext.Provider value={{ state, dispatch }}>
        <Routes />
        <InfoBubble />
      </AppContext.Provider>
    </div>
  );
}

export default App;
