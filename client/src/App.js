import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Routes} from "./routes";
import './App.css';
import {AuthContext} from './context/auth.context';
import {useAuth} from "./hook/auth.hook";

function App() {

    const {login, logout, token, userId, ready} = useAuth();
    const isAuth = !!token
    const routes = Routes(isAuth);

  return (
      <AuthContext.Provider value={{
          login, logout, token, userId, ready
      }}>
      <Router>
          {routes}
      </Router>
      </AuthContext.Provider>
  );
}

export default App;
