import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// import RestaurantList from './RestaurantList'

const StyledInputForm = styled.div`
    margin-top: 10px;`
const StyledInput = styled.div`
    margin-top: 0px;`

const StyledListBody = styled.div`
    background-color: #E2DDD9;
    height: 100vh;
    `

const StyledDelete = styled.div`
    font-size: 20px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    max-width: 100px;
    background-color: red;
    opacity: 0.8;
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

const StyledHeader = styled.div`
    background-color: #9198A0;
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
        max-height: 200px;
    }
`

export default class ShowRestaurant extends Component {
    
    state = {
        restaurant: {},
        updatedRestaurant: {},
        // editedRestaurant: {}
        
        
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

    componentDidMount = () => {
        this.getRestaurant()
    }
    handleDelete = async (event) => {
        const userId = this.props.match.params.userId
        const restaurantId = this.props.match.params.restaurantId
        axios.delete(`/api/users/${userId}/restaurants/${restaurantId}`)
        await this.getRestaurant()
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
        // const editedRestaurant = [...this.state.restaurants]
        // editedRestaurant.push(response.data)
        const updatedRestaurant = response.data
        this.setState({ updatedRestaurant })
      }
  
    render() {
        const userId = 
        this.props.match.params.userId
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
            <StyledListBody>
                <StyledHeader><h1>{this.state.restaurant.name}</h1></StyledHeader>
                <StyledButton>
                  <Link to={`/users/${userId}`}>Back to user's page</Link>
              </StyledButton>
      
              <Link to={`/users/${userId}`}>
                          <StyledDelete onClick={() => this.handleDelete()} type="submit" value='Delete Restaurant'>Delete</StyledDelete>
                      </Link>
                
                {restaurantInfo}
              <StyledInputForm>
                  <h4>Edit Restaurant</h4>
              <form onSubmit={this.handleSubmit}>
                  <StyledInput>Name:<input name="name" type="text" value={this.state.updatedRestaurant.name} onChange={this.handleChange}/></StyledInput> <br></br>
                  
              </form>
              {/* <form onSubmit={this.handleSubmit}> */}
              <StyledInput>Cuisine:<input name="cuisine" type="text" value={this.state.updatedRestaurant.cuisine} onChange={this.handleChange}/></StyledInput> <br></br>
              {/* </form> */}
              </StyledInputForm>
                
                    </StyledListBody>
          )
        }
      }
