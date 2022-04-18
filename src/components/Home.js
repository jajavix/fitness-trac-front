import React from "react";

const Home = ({ user, token }) => {
  return (
    <div className="post-card">
      <h1>
        <br />
        <br />
        {token ? (
          <span>You are logged in as {user.username}</span>
        ) : (
          "Welcome Back"
        )}
      </h1>
    </div>
  );
};

export default Home;
