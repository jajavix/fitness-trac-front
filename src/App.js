//route
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuth } from "./custom-hooks";
import {
  LoginOrRegister,
  Activities,
  Routines,
  Nav,
  NewPost,
  MyActivites,
  MyRoutines,
} from "./components";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Nav />
      <Switch>
        {/*logged in routes*/}
        {isLoggedIn && (
          <>
            {/* anything that requires an authorization header is the fetch, any create, update, delete action */}
            <Route exact path="/activities" component={Activities} />
            <Route exact path="/routines" component={Routines} />
            <Route path="/posts/new" component={NewPost} />
            <Route path="/myactivities" component={MyActivites} />
            <Route path="/myroutines" component={MyRoutines} />
          </>
        )}

        {/*logged in routes*/}
        {!isLoggedIn && (
          <>
            {/* anything that requires an authorization header is the fetch, any create, update, delete action */}
            <Route exact path="/activities" component={Activities} />
            <Route path="/login" component={LoginOrRegister} />
            <Route path="/register" component={LoginOrRegister} />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
