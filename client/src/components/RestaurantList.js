import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const StyledListBody = styled.div`
    background-color: #E2DDD9;
    height: 120vh;
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
        const newRestaurant = { ...this.state.newRestaurant }
        newRestaurant[event.target.name] = event.target.value
        this.setState({ newRestaurant })
    }

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
        const listOfRestaurants = this.state.restaurants.map((restaurant, i) => {
            const userId = this.props.match.params.userId
            console.log(userId)
            return (
                <Link to={`/users/${userId}/restaurants/${restaurant._id}`}
                    key={i}>
                    <div key={i}>
                        <br></br>
                        {restaurant.restName} in {restaurant.restNeighborhood}
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
                <Link to='/login'>
                    <StyledDelete onClick={() => this.handleDelete()} type="submit" value='Delete User'>Delete</StyledDelete>
                </Link>
                <ImageContainer> <img src={this.state.user.imageUrl} alt="user" /><br></br>
                </ImageContainer>
                <StompingGrounds>
                    Stomping Grounds:{this.state.user.neighborhood}<br></br>
                </StompingGrounds>
                <StyledToggleButton>
                    <button onClick={this.buttonToggleUserEditView}>Add New Restaurant</button></StyledToggleButton>
                <StyledSubHeader><h3>New Restaurants</h3></StyledSubHeader>
                {listOfRestaurants}
                {this.state.toggleEditUserView ?
                    <div><h4>Add New Restaurant</h4><br></br>
                        <form onSubmit={this.handleSubmit}>
                            Name: <input type="text"
                                name="restName"
                                value={this.state.newRestaurant.restName}
                                onChange={this.handleChange} /><br></br>
                            Neighborhood: <input type='text'
                                name="restNeighborhood"
                                value={this.state.newRestaurant.restNeighborhood}
                                onChange={this.handleChange} /><br></br>
                            Cuisine: <input type="text"
                                name='cuisine'
                                value={this.state.newRestaurant.cuisine}
                                onChange={this.handleChange} />
                            Image URL: <input type="text"
                                name='restImageUrl'
                                value={this.state.newRestaurant.restImageUrl}
                                onChange={this.handleChange} /><br></br>
                            <button type='submit' >Create</button>
                        </form>
                    </div> : null
                }<br></br>
            </StyledListBody>
        )
    }
}
