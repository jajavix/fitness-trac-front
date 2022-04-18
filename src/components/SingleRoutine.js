import React from "react";
import { Activity } from ".";

const SingleRoutine = ({ children, routine }) => {
  return routine ? (
    <div className="posts-main-container">
      <div>
        <h3>{routine.name}</h3>
        <div>Written by {routine.creatorName}</div>
        <div>Goal: {routine.goal}</div>
        <div>Public: {routine.isPublic ? "yes" : "no"}</div>
      </div>
      {children}

      {routine.activities.length > 0 && (
        <div className="activities">
          <h4>Activities:</h4>
          <ul className="activities-list">
            {routine.activities.map((activity) => (
              <li key={activity.id}>
                <Activity activity={activity}>
                  {
                    <>
                      <span>Repetition: {activity.count} times</span>
                      <span>Duration: {activity.duration} minutes</span>
                    </>
                  }
                </Activity>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ) : null;
};

export default SingleRoutine;
