import React from "react";

// Components
// import Component from "../components/...";
import Main from "../components/Main";
import Form from "../modules/Form";
import Description from "../modules/Description";

function home() {
  return (
    <Main>
      <div className="o-layout">
        <div className="o-layout_item u-1/2">
          <Description />
        </div>
        <div className="o-layout_item u-1/2">
          <Form />
        </div>
      </div>
    </Main>
  );
}

export default home;
