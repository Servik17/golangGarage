import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// Styles
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

//  Store
import { createStore } from './store/createStore'

// Pages
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Page404 } from './pages/Page404'
import { Page500 } from './pages/Page500'

// App companent
import { App } from './App';

ReactDOM.render(
  <Provider store={createStore()}>
    <Router>
      <Switch>
        <Route exact path="/login" name="Login Page" component={Login} />
        <Route exact path="/register" name="Register Page" component={Register} />
        <Route exact path="/404" name="Page 404" component={Page404} />
        <Route exact path="/500" name="Page 500" component={Page500} />
        <Route path="/" name="Home" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
