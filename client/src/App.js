import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'
import styled from 'styled-components'
import Home from './components/Home'
import LogIn from './components/LogIn'
import RestaurantList from './components/RestaurantList';


class App extends Component {
  render() {
    return (
      <div>
      <Router>
      
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={LogIn}/>
          <Route exact path='/users/:userId' component={RestaurantList}/>
        </Switch>
      
      </Router>
      </div>
    )
  }
}

export default App;
