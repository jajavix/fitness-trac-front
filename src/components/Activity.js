import React from "react";

const Activity = ({ children, activity }) => {
  return activity ? (
    <>
      <div className="posts-main-container">
        <h3>Name: {activity.name}</h3>
        <div>Description: {activity.description}</div>
      </div>
      {children}
    </>
  ) : null;
};

export default Activity;
