import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import EditUser from './EditUser'

const StyledHeader = styled.div`
    background-color: silver;
    display: flex;
    justify-content: center;
`

export default class RestaurantList extends Component {
    state = {
        user: {},
        restaurants: [],
        newRestaurant: {},
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
    handleDelete = async(event) => {
        const userId = this.props.match.params.userId
        axios.delete(`/api/users/${userId}`)
        await this.getUser()
    }

    handleChange = (event) => {
        //take it
        const newRestaurant = { ...this.state.newRestaurant}
        //change it
        newRestaurant[event.target.name] = event.target.value
        //put it back
       this.setState({ newRestaurant })
    }
    //push into API
    handleSubmit = async (event) => {
        event.preventDefault()
        console.log('sup dude')
        const userId = this.props.match.params.userId
        const response = await axios.post(`/api/users/${userId}/restaurants`, this.state.newRestaurant)
        console.log(response.data)
        const restaurants = [...this.state.restaurants]
        console.log(restaurants)
        restaurants.push(this.state.newRestaurant)
        this.setState({ restaurants })
    }

  render() {
    // const userId = this.props.match.params.userId  
      const listOfRestaurants = this.state.restaurants.map((restaurant, i) => {
      const userId = this.props.match.params.userId  
      console.log(userId)
    //   const restaurantId = this.state.restaurants.map((restaurant, i) => )
        return (
            
            <Link to={`/users/${userId}/restaurants/${restaurant._id}`}
            key={i}
            >
            <div key={i}>
                <br></br>
            Name: {restaurant.name}
            
            <br></br>
           
            In: {restaurant.neighborhood}
            </div>
            </Link>
            )
        })
        
        
    return (
        
      <div>
        <StyledHeader>
        <h1>{this.state.user.name}'s Page</h1>
        </StyledHeader>
        {/* {console.log(this.state.user)} */}
        Neighborhood:{this.state.user.neighborhood}<br></br>
        Image Url: {this.state.user.imageUrl}<br></br>
{/* Delete User */}
        <Link to='/login'>
        <button onClick={() => this.handleDelete()} type="submit" value='Delete User'>Delete</button>
        </Link>

{/* // Toggle */}
        <button onClick={this.buttonToggleUserEditView}>Edit User</button>
        <h3>New Restaurants</h3>
        {listOfRestaurants}
        {this.state.toggleEditUserView ?
        <EditUser currentUser={this.props.match.params.userId} toggleView={this.buttonToggleUserEditView} /> : null 
    }<br></br>
        <div>Add New Restaurant<br></br>
        <form onSubmit={this.handleSubmit}>
        Name: <input type="text"
        name="name"
        value={this.state.newRestaurant.name}
        onChange={this.handleChange} /><br></br>
        Neighborhood: <input type='text'
        name="neighborhood"
        value={this.state.newRestaurant.neighborhood}
        onChange={this.handleChange} /><br></br>
        Image URL: <input type="text"
        name='imageUrl'
        value={this.state.newRestaurant.imageUrl}
        onChange={this.handleChange} />
        <br></br>
        <input type='submit' value="Create New Restaurant" />
        </form>
        
        </div>
        </div>
     
    )
    }
}
