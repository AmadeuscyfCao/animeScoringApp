import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../MainPage/mainpage.jsx';
import Login from '../Login/login.jsx';
import  Signup from '../Signup/signup.jsx';

class App extends Component {
  render() {
    return(
      <HashRouter>
        <Switch>
          <Route exact path = '/' component = {MainPage}/>
          <Route exact path = '/login' component = {Login}/>
          <Route exact path = '/signup' component = {Signup}/>
        </Switch>
      </HashRouter>
    )
  }
}

export default App;