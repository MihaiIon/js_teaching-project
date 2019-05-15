import React from "react";
import PropTypes from "prop-types";

function Main({ children }) {
  return (
    <main className="c-main -center">
      <div className="o-container">{children}</div>
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.node.isRequired
};

export default Main;
