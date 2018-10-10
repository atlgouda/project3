import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


export default class RestaurantList extends Component {
    state = {
        user: {},
        restaurants: [],
    }

    getUser = async () => {
        const userId = this.props.match.params.userId
        const response = await axios.get(`/api/users/${userId}`)
        this.setState({
            user: response.data,
            restaurants: response.data.restaurants
        })
    }

    componentDidMount = () => {
        this.getUser()
    }


  render() {
    const userId = this.props.match.params.userId  
      const listOfRestaurants = this.state.restaurants.map((restaurant, i) => {
      const userId = this.props.match.params.userId  
        return (
            <div key={i}>
                <br></br>
            Name: {restaurant.name}
            
            <br></br>
           
            In: {restaurant.neighborhood}
            </div>
            )
        })
    return (
        
      <div>
        <h1>Restaurants for {this.state.user.name}</h1>
        
       <Link to={`/users/${userId}/edit`}>
        <button>Edit User</button>
        </Link>
        <h3>New Restaurants</h3>
        {listOfRestaurants}
        
      </div>
    )
    }
}
