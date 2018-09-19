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

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './styles/main.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5adccf',
      main: '#07AA9E',
      dark: '#007a70',
    },
    secondary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#cccccc',
    }
  }
});

const App = () => (
  <div>
    <MuiThemeProvider theme={theme}>
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
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </Router>
    </MuiThemeProvider>
  </div>
);

export default App;
