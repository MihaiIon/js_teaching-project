import React from "react";

function Desccription(props) {
  return (
    <div className="c-description">
      <h1 className="o-h1">StoryTeller</h1>
      <p className="o-p">This game requires 2 or more players.</p>
      <p className="o-p">
        The goal is to create a story by only looking at the last words of the last written
        sentence.
      </p>
      <p className="o-p">
        One by one, each player must add a sentence to the story without being watched by the other
        players.
      </p>
      <p className="o-p">When decided, the story can be revealed to all the players.</p>
    </div>
  );
}

export default Desccription;
