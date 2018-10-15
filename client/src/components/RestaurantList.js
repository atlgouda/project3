import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import EditUser from './EditUser'

const StyledListBody = styled.div`
    background-color: #E2DDD9;
    height: 100vh;
    `
const StyledSubHeader = styled.div`

    text-align: center;
    `
const StyledToggleButton = styled.div`
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    max-width: 150px;
    margin-top: 15px;
`


const StompingGrounds = styled.div`
    text-align: center;
    font-weight: bold;
`
const ImageContainer = styled.div`
    padding: 3px;
    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        max-width: 35%;
        border-radius: 150px;
    }
`
const StyledDelete = styled.div`
    font-size: 15px;
    padding: 8px;
    margin-top: 10px;
    margin-bottom: 10px;
    max-width: 75px;
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
const StyledButton = styled.div`
    font-size: 15px;
    padding: 8px;
    margin-top: 10px;
    margin-bottom: 10px;
    max-width: 150px;
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
const StyledHeader = styled.div`
    background-color: #9198A0;
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
    handleDelete = async (event) => {
        const userId = this.props.match.params.userId
        axios.delete(`/api/users/${userId}`)
        await this.getUser()
    }

    handleChange = (event) => {
        //take it
        const newRestaurant = { ...this.state.newRestaurant }
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
                        {restaurant.name} in {restaurant.neighborhood}
                    </div>
                </Link>
            )
        })


        return (

            <StyledListBody>
                <StyledHeader>
                    <h1>{this.state.user.name}'s Page</h1>
                </StyledHeader>
                <StyledButton>
                    <Link to='/login'>Back</Link>
                </StyledButton>
                {/* Delete User */}
                <Link to='/login'>
                    <StyledDelete onClick={() => this.handleDelete()} type="submit" value='Delete User'>Delete</StyledDelete>
                </Link>
                {/* {console.log(this.state.user)} */}
                <ImageContainer> <img src={this.state.user.imageUrl} alt="user" /><br></br>
                </ImageContainer>
                <StompingGrounds>
                    Stomping Grounds:{this.state.user.neighborhood}<br></br>
                </StompingGrounds>

                

                {/* // Toggle */}
                <StyledToggleButton>
                <button onClick={this.buttonToggleUserEditView}>Add New Restaurant</button></StyledToggleButton>
                <StyledSubHeader><h3>New Restaurants</h3></StyledSubHeader>
                {listOfRestaurants}
                {this.state.toggleEditUserView ?
                 
                    <div><h4>Add New Restaurant</h4><br></br>
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

                </div> : null
                }<br></br>
                
            </StyledListBody>

        )
    }
}
