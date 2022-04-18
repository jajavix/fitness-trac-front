import React, { useState } from "react";
import { useHistory } from "react-router";
import { Activity } from ".";
import { postActivity } from "../util";

const Activities = ({ activities, fetchActivities }) => {
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postActivity(token, name, description);
      if (response) {
        setName("");
        setDescription("");
        await fetchActivities();
        history.push("/activities");
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {token ? (
        <div className="post-card">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label>Name: </label>
              <input
                type="text"
                placeholder="Activity Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </fieldset>
            <fieldset>
              <label>Description: </label>
              <input
                type="text"
                value={description}
                placeholder="Activity Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></input>
            </fieldset>
            <button type="submit">Add activity</button>
          </form>
        </div>
      ) : null}
      {activities ? (
        <div className="post-card">
          <span>Activities:</span>
          {activities.map((activity) => (
            <Activity key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Activities;
