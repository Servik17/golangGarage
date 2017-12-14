import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Styles
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

// Pages
import Login from './Pages/Login'
import Register from './Pages/Register'
import Page404 from './Pages/Page404'
import Page500 from './Pages/Page500'

// App companent
import App from './App';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/login" name="Login Page" component={Login} />
      <Route exact path="/register" name="Register Page" component={Register} />
      <Route exact path="/404" name="Page 404" component={Page404} />
      <Route exact path="/500" name="Page 500" component={Page500} />
      <Route path="/" name="Home" component={App} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
