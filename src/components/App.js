import React from "react";

// Components
import Routes from "../routes";
import InfoBubble from "./InfoBubble";

// App Context
export const AppContext = React.createContext({
  steps: {
    CREATE_LALA: 0
  },
  currentStep: 0,
  infoContent: []
});

function App() {
  return (
    <div id="js-app" className="c-app">
      <AppContext.Provider>
        <Routes />
        <InfoBubble />
      </AppContext.Provider>
    </div>
  );
}

export default App;
