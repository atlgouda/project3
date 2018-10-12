import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import RestaurantList from './RestaurantList'


const StyledHeader = styled.div`
    background-color: silver;
    display: flex;
    justify-content: center;
`
const StyledButton = styled.div`
    font-size: 20px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    max-width: 200px;
    background-color: darkblue;
    opacity: 0.6;
    border-radius: 40px;
    font-weight: bolder;
    margin-left: auto;
    margin-right: auto;
    color: white;
    text-align: center;
    a {
        text-decoration: none;
        color: white;
    }
    
    
`
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
        updatedRestaurant: {},
        editedRestaurant: {}
        
        
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

    handleChange = (event) => {
        //take it
        
        const updatedRestaurant = { ...this.state.updatedRestaurant }
        //change it
        updatedRestaurant[event.target.name] = event.target.value
        //put it back
        this.setState({ updatedRestaurant })
      }
      //push into API/Database
      handleSubmit = async (event) => {
        //prevent page from reloading
        event.preventDefault()
        const userId = this.props.match.params.userId
        const restaurantId = this.props.match.params.restaurantId
        const response = await axios.put(`/api/users/${userId}/restaurants/${restaurantId}`, this.state.updatedRestaurant)
        //push response.data into array
        const editedRestaurant = [...this.state.restaurants]
        editedRestaurant.push(response.data)
        this.setState({ editedRestaurant })
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
          <StyledHeader><h1>{this.state.restaurant.name}</h1></StyledHeader>
          {/* <StyledButton>
            <Link to={RestaurantList}>Back to user's page</Link>
        </StyledButton> */}
          
          {restaurantInfo}
        <div className="formDiv">
        <form onSubmit={this.handleSubmit}>
            Name:<input name="name" type="text" value={this.state.updatedRestaurant.name} onChange={this.handleChange}/> <br></br>
        </form>
        </div>
          
              </div>
    )
  }
}
