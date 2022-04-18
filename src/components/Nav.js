import React from "react";
import { useAuth } from "../custom-hooks";
import { NavLink } from "react-router-dom";

const loggedInLinks = [
  { id: 1, to: "/posts/new", name: "AddNewPost" },
  { id: 2, to: "/myactivities", name: "MyActivities" },
  { id: 2, to: "/myroutines", name: "MyRoutines" },
  { id: 3, to: "/me", name: "Profile" },
];

const loggedOutLinks = [
  { id: 1, to: "/home", name: "Home" },
  { id: 2, to: "/activities", name: "Activities" },
  { id: 3, to: "/routines", name: "Routines" },
  { id: 4, to: "/login", name: "Login" },
  { id: 5, to: "/register", name: "Register" },
];

export default function Nav() {
  const { isLoggedIn, logout } = useAuth();
  const navLinks = isLoggedIn ? loggedInLinks : loggedOutLinks;
  return (
    <nav>
      {navLinks.map(({ id, to, name }) => (
        <NavLink key={id} to={to}>
          {name}
        </NavLink>
      ))}
      {isLoggedIn && <button onClick={logout}>Logout</button>}
    </nav>
  );
}
