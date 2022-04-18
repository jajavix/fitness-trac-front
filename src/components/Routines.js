import React from "react";

import { SingleRoutine } from ".";

const Routines = ({ routines }) => {
  return routines ? (
    <div className="posts-main-container">
      <div>
        <h2>Routines</h2>
        {routines.map((routine) => (
          <SingleRoutine key={routine.id} routine={routine}></SingleRoutine>
        ))}
      </div>
    </div>
  ) : null;
};

export default Routines;
