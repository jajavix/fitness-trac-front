import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { register } from "../util/index";

const { REACT_APP_BASE_URL } = process.env;

const Register = ({ setClient }) => {
  const { isLoggedIn, setIsLoggedIn, setUserToken, setUser } = useContext(
    UserContext
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const params = useParams();
  const history = useHistory();
  console.log("params: ", params);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const user = await register({ username, password });
      if (user) {
        localStorage.setItem("token", user.token);
        setClient(user.user.username);
        setUsername("");
        setPassword("");
        history.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post-card">
      <h1>Hi there, please register below! </h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="username"
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <hr></hr>
        <input
          type="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <hr></hr>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
