import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Router, Switch } from 'react-router-dom';
import NotFound from './Compnents/NotFound';
import SignUp from './Compnents/SignUpOrIn/SignUp';
import Home from './Compnents/Home/Home';
import BeforeHome from './Compnents/Home/BeforeHome';
import MapsDrive from './Compnents/Home/MapsDrive';
import Realtime from './Compnents/Home/Realtime';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const Routing = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/signup" component={SignUp} />
      <Route exact path="/home" component={BeforeHome} />
      <Route path="/home/directions" component={Home} />
      <Route path="/home/drive" component={MapsDrive} />
      <Route path="/home/realtime" component={Realtime} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

ReactDOM.render(Routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
