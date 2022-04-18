import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { login } from "../util/index";

const { REACT_APP_BASE_URL } = process.env;

const Login = ({ setClient }) => {
  const params = useParams();
  const history = useHistory();

  const { isLoggedIn, setIsLoggedIn, setUserToken, setUser } = useContext(
    UserContext
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log("params: ", params);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login({ username, password });
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

  useEffect(async () => {
    if (isLoggedIn === true) {
      history.push("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="post-card">
      <h1>Please login below! (: {params.method}</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="username"
          onChange={(event) => setUsername(event.target.value)}
        ></input>

        <input
          type="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
