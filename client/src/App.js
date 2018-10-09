import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import styled from 'styled-components'
import Home from './components/Home'
import LogIn from './components/LogIn'
import RestaurantList from './components/RestaurantList'

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/user/:userId' component={RestaurantList}/>
        </Switch>
      </div>
      </Router>
    )
  }
}

export default App;
