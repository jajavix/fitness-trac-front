import React, { useState, useEffect } from "react";
import { useAuth } from "../custom-hooks";

export default function Me() {
  const { token } = useAuth();
  const [me, setMe] = useState({});
  console.log(useState({}));

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await fetch(
          `https://fitnesstrac-kr.herokuapp.com/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { success, data: me } = await response.json();

        if (success) {
          // console.log({ me, setMe });
          setMe(me);
        } else {
          throw new Error("error fetching me");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchMe();
  }, [token]);

  //checking an error I encountered!!
  if (!!me) {
    // console.log(me);
  } else {
    // console.log("setMe doesnt exist");
  }

  if (!!setMe) {
    //  console.log(setMe);
  } else {
    // console.log("me doesnt exist");
  }

  const { messages } = me || {};
  const { activities } = me || {};
  const { username } = me || {};

  const activeActivities = activities
    ? activities.filter((activity) => activity.active)
    : [];
  const inactiveActivities = activities
    ? activities.filter((activity) => !activity.active)
    : [];

  //  console.log(messages, posts);

  //soft deletePost
  async function deletePost(activityId) {
    // preventDefault();
    try {
      const response = await fetch(
        `https://fitnesstrac-kr.herokuapp.com/api/activities/${activityId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = await response.json();
      if (success) {
        const filteredActivities = activities.map((activity) => {
          if (activity._id === activityId) {
            activity.active = false;
          }
          return activity;
        });

        setMe({ ...me, activities: filteredActivities });
      }

      // console.log(postId);
    } catch (error) {
      console.error(error);
    }
  }

  //return
  return (
    <section>
      <div>
        <h1>
          Welcome,
          {username}
        </h1>
      </div>
      <h2>My Message</h2>
      <div className="post-card">
        {messages &&
          messages.map((msg) => (
            <article key={msg._id}>
              <h4>Activity ID: {msg.activity._id}</h4>
              <p>Activity Title: {msg.activity.title} </p>
              <button>View Message</button>
            </article>
          ))}
      </div>
      <h2>My Activities</h2>
      <h3>Active Activity</h3>
      <div className="post-card">
        {activeActivities.length
          ? activeActivities.map((activity) => (
              <article key={activity._id}>
                <h4>Activity ID: {activity.title}</h4>
                <p>Activity Title: {activity.description} </p>
                <p>Price: {activity.price} </p>

                <button onClick={() => deletePost(activity._id)}>
                  delete this activity
                </button>
              </article>
            ))
          : "no active activities"}
      </div>
      <h3>Inactive Activities</h3>
      <div className="post-card">
        {inactiveActivities.length
          ? inactiveActivities.map((activity) => (
              <article key={activity._id}>
                <h4>Activity ID: {activity.title}</h4>
                <p>Activity Title: {activity.description} </p>
                <p>Activity: {activity.price} </p>
              </article>
            ))
          : "no inactive activities"}
      </div>
    </section>
  );
}
