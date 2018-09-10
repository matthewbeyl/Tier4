import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import HomeView from './components/HomeView/HomeView';
import DashboardView from './components/DashboardView/DashboardView';
import AdminView from './components/AdminView/AdminView';
import TestComponent from './components/TestComponent/TestComponent'

import { createMuiTheme } from '@material-ui/core/styles';

import './styles/main.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5adde1',
      main: '#00abaf',
      dark: '#007b80',
    }
  }
});

const App = () => (
  <div>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/login"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/admin"
          component={AdminView}
        />
        <Route
          path="/home"
          component={HomeView}
        />
        <Route
          path="/dashboard"
          component={DashboardView}
        />
        <Route
          path="/test"
          component={TestComponent}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </Router>
  </div>
);

export default App;
