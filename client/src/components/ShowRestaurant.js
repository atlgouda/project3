import React, { Component } from 'react'
import axios from 'axios'
export default class ShowRestaurant extends Component {

    state = {
        restaurant: {},
        
    }
    getRestaurant = async () => {
        const userId = this.props.match.params.userId
        const restaurantId = 
        this.props.match.params.restaurantId
        
        const response = await axios.get(`/api/users/${userId}/restaurants/${restaurantId}`)
        this.setState({
            restaurant: response.data,
        })
    }

    componentDidMount = () =>{
        this.getRestaurant()
    }
 
    render() {
        // const userId = 
        // this.props.match.params.userId
        // const restaurantId=
        // this.state
        const restaurantInfo = (
        <div>
        Name: {this.state.restaurant.name}
       
              </div>
        )
    return (
      <div>
          {restaurantInfo}
        Show one restaurant
       
              </div>
    )
  }
}
