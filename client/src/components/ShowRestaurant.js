import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const ImageContainer = styled.div`
    padding: 3px;
    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        max-width: 60%;
    }
`

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
        <ImageContainer>
            <img src={this.state.restaurant.imageUrl} alt="restaurant" />
        </ImageContainer>
        Serving {this.state.restaurant.cuisine} to the 
        good people of {this.state.restaurant.neighborhood}<br></br>
        <a href={this.state.restaurant.linkAddress}>Restaurant Website</a><br></br>
       
       
              </div>
        )
    return (
      <div>
          <h1>{this.state.restaurant.name}</h1>
          {restaurantInfo}
        
          
              </div>
    )
  }
}
