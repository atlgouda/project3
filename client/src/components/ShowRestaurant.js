import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const StyledHeader = styled.div`
    background-color: silver;
    display: flex;
    justify-content: center;
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
        const response = await axios.put('', this.state.updatedRestaurant)
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
