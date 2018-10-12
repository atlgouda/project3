import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'

import Home from './components/Home'
// import Login from './components/Login'
import RestaurantList from './components/RestaurantList';
import ShowRestaurant from './components/ShowRestaurant'
import LogIn from './components/LogIn';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
      
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={LogIn}/>
          <Route exact path='/users/:userId' component={RestaurantList}/>
          <Route exact path='/users/:userId/restaurants/:restaurantId' component={ShowRestaurant}/>
        </Switch>
        </div>
      </Router>
     
    )
  }
}

export default App;
