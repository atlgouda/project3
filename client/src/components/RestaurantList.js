import React, { Component } from 'react'
import axios from 'axios'
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
    //   const listOfRestaurants = this.state.ideas.map((restaurant, i) => {
    //     return (
    //         <div key={i}>
    //             <button>Delete</button>
    //         </div>
    //     )
    //   })

    return (
      <div>
          <h1>Restaurants</h1>
     
    
      </div>
    )
    }
}
