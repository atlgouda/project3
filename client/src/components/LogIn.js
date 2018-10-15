import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import 'typeface-roboto';

const StyledListBody = styled.div`
    background-color: #E2DDD9;
    height: 100vh;
    `

const StyledSubHeader = styled.div`
    text-align: center;
    `

const StyledHeader = styled.div`
    background-color: #9198A0;
    display: flex;
    justify-content: center;
`
const ImageContainer = styled.div`
    padding: 3px;
    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        max-width: 30%;
    }
    `
const StyledUserInfo = styled.div`
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
        
        a {
            text-decoration: none;
            color: black;
        } 
`
export default class LogIn extends Component {
    state = {
        users: [],
        newUser: {},
    }

    componentDidMount = async () => {
        const response = await axios.get('/api/users')
        this.setState({ users: response.data })
        console.log(response.data)
    }

    handleChange = (event) => {
        const newUser = { ...this.state.newUser }
        newUser[event.target.name] = event.target.value
        this.setState({ newUser })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const response = await axios.post('/api/users', this.state.newUser)
        const users = [...this.state.users]
        users.push(response.data)
        this.setState({ users })
    }

    render() {
        const usersList = this.state.users.map((user, i) => {
            return (
                <StyledUserInfo key={i}>
                    <Link to={`/users/${user._id}`}
                        key={i}>
                        <ImageContainer>
                            <img src={user.imageUrl} alt="user" />
                        </ImageContainer><br />
                        {user.name} from {user.neighborhood}
                    </Link><br /><br />
                </StyledUserInfo>
            )
        })
        return (
            <StyledListBody>

                <StyledHeader><h1>Users</h1></StyledHeader>
                <StyledSubHeader><h2>Please select a User</h2></StyledSubHeader>
                {usersList}<br></br>
                <StyledSubHeader><h2>Or Create Your Own!</h2></StyledSubHeader><br></br>
                <form onSubmit={this.handleSubmit}>
                    Name: <input type="text"
                        name="name"
                        value={this.state.newUser.name}
                        onChange={this.handleChange} /><br></br>
                    Neighborhood: <input type='text'
                        name="neighborhood"
                        value={this.state.newUser.neighborhood}
                        onChange={this.handleChange} /><br></br>
                    Image URL: <input type="text"
                        name='imageUrl'
                        value={this.state.newUser.imageUrl}
                        onChange={this.handleChange} />
                    <br></br>
                    <input type='submit' value="Create New User" />
                </form>
            </StyledListBody>
        )
    }
}
