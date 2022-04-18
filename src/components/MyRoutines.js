import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Me() {
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
  const [routines, setRoutines] = useState([]);
  console.log(routines);

  useEffect(() => {
    //create as async fetch function
    async function fetchRoutines() {
      try {
        const response = await fetch(
          `https://fitnesstrac-kr.herokuapp.com/api/routines`
        );
        //unpacked the response stream
        const { success, data } = await response.json();
        console.log(data);
        if (success) {
          setRoutines(data.routines);
        }

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    // call it
    fetchRoutines();
  }, []);

  //filter post function returns a boolean
  const routineMatch = (routines, searchTerm) => {
    const { location, title, price } = routines;
    console.log("routines fields", location, title, price);
    // console.log("searchTerm inside match", searchTerm);
    const toCheck = [location, title, price];
    for (const field of toCheck) {
      if (field.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
    }
  };

  //filter variable to get posts, searchterm
  const filterRoutines = routines.filter((routine) =>
    routineMatch(routines, searchTerm)
  );
  console.log("filterRoutines", filterRoutines);

  //return
  return (
    <section>
      <div>
        <h1>Welcome to Fitness Tracker: Routines</h1>
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
                ? `/routines?searchTerm=${e.target.value}`
                : "/routines"
            )
          }
        />
      </div>
      <hr></hr>
      <div className="'post-main-container">
        {routines &&
          filterRoutines.map((routine) => (
            <div key={routine._id} className="post-card">
              <h4>Routine ID: {routine.title}</h4>
              <p>Routine Title: {routine.description} </p>
              <p>Routine: {routine.price} </p>
              <p>Location: {routine.location} </p>
              <Link to="routines/new">
                <button>Edit Routines</button>
                <button>Message</button>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}
