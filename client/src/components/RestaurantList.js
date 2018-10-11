import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import EditUser from './EditUser'

export default class RestaurantList extends Component {
    state = {
        user: {},
        restaurants: [],
        toggleEditUserView: false
    }

    buttonToggleUserEditView = () => {
          this.setState({
            toggleEditUserView: !this.state.toggleEditUserView
        })
    }

    getUser = async () => {
        try {
            const userId = this.props.match.params.userId
            const response = await axios.get(`/api/users/${userId}`)
            this.setState({
                user: response.data,
                restaurants: response.data.restaurants
            })

        } catch (error) {
            console.log(error)
        }
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
        {console.log(this.state.user)}

        <button onClick={this.buttonToggleUserEditView}>Edit User</button>
        <h3>New Restaurants</h3>
        {listOfRestaurants}
        {this.state.toggleEditUserView ?
        <EditUser currentUser={this.props.match.params.userId} toggleView={this.buttonToggleUserEditView} /> : null
        
    }
      </div>
    )
    }
}
