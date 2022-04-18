import React, { useState } from "react";
import { useHistory } from "react-router";
import { SingleRoutine } from ".";
import { postRoutine } from "../util";

const MyRoutines = ({ userRoutines, fetchRoutines, fetchUserRoutines }) => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const createRoutine = async (event) => {
    event.preventDefault();
    try {
      const response = await postRoutine(token, name, goal, isPublic);
      if (response) {
        setGoal("");
        setName("");
        await fetchRoutines();
        await fetchUserRoutines();
        history.push("/user/routines");
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="post-card">
        <h2>Create Routine</h2>
        <form onSubmit={createRoutine}>
          <input onChange={(event) => setName(event.target.value)} />
          <input onChange={(event) => setGoal(event.target.value)} />
          <select onChange={(event) => setIsPublic(event.target.value)}>
            <option value="false"> no </option>
            <option value="true"> yes </option>
          </select>
          <button type="submit">Create Routines</button>
        </form>
      </div>
      {userRoutines ? (
        <div className="post-card">
          <h2>My Routines</h2>
          {userRoutines
            ? userRoutines.map((routine) => (
                <SingleRoutine
                  key={routine.name}
                  routine={routine}
                ></SingleRoutine>
              ))
            : null}
        </div>
      ) : null}
    </>
  );
};

export default MyRoutines;
