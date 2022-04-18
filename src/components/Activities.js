import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Activities() {
  //posts need to manage the post data coming from our stranger things app
  //so we need two pieces of info
  //a way of holding onto state: useState
  //a way of handling async effects: useEffect

  //search box
  const { search } = useLocation();
  const history = useHistory();
  console.log("search", search);
  const searchParams = new URLSearchParams(search);
  console.log("searchParams", searchParams);
  const searchTerm = searchParams.get("searchTerm") || "";
  console.log("searchTerm", searchTerm);

  //post
  const [activities, setActivities] = useState([]);
  console.log(activities);

  useEffect(() => {
    //create as async fetch function
    async function fetchActivities() {
      try {
        const response = await fetch(
          `https://fitnesstrac-kr.herokuapp.com/api/activities`
        );
        //unpacked the response stream
        const { success, data } = await response.json();
        console.log(data);
        if (success) {
          setActivities(data.activities);
        }

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    // call it
    fetchActivities();
  }, []);

  //filter post function returns a boolean
  const activityMatch = (activities, searchTerm) => {
    const { location, title, price } = activities;
    console.log("activities fields", location, title, price);
    // console.log("searchTerm inside match", searchTerm);
    const toCheck = [location, title, price];
    for (const field of toCheck) {
      if (field.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
    }
  };

  //filter variable to get posts, searchterm
  const filterActivities = activities.filter((activity) =>
    activityMatch(activities, searchTerm)
  );
  console.log("filterActivities", filterActivities);

  //return
  return (
    <section>
      <div>
        <h1>Welcome to Fitness Tracker: Activities</h1>
      </div>
      <hr></hr>
      <div className="post-card">
        <h2>Search</h2>
        <input
          type="text"
          placeholder="enter something"
          onChange={(e) =>
            history.push(
              e.target.value
                ? `/activities?searchTerm=${e.target.value}`
                : "/activities"
            )
          }
        />
      </div>
      <hr></hr>
      <div className="'post-main-container">
        {activities &&
          filterActivities.map((activity) => (
            <div key={activity._id} className="post-card">
              <h4>Post ID: {activity.title}</h4>
              <p>Post Title: {activity.description} </p>
              <p>goal: {activity.goal} </p>
              <p>Location: {activity.location} </p>
              <Link to="activities/new">
                <button>Edit Activities</button>
                <button>Message</button>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}
