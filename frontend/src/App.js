import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Places from './places/pages/NewPlace';
import Users from './user/pages/Users';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places" exact>
          <Places />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
