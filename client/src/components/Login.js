import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import 'typeface-roboto';

const StyledSubHeader = styled.div`
    text-align: center;
    `

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
        max-width: 30%;
    }
    `
const StyledUserInfo = styled.div`
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
        
        a {
            text-decoration: none;
            color: slategray;
        }

    
    
`
export default class LogIn extends Component {
    state = {
        users: [],
        newUser: {},
    }

    componentDidMount = async () => {
        const response = await axios.get('/api/users')
        this.setState({ users: response.data})
        console.log(response.data)
    }

handleChange = (event) => {
    //take it
    const newUser = { ...this.state.newUser }
    //change it
    newUser[event.target.name] = event.target.value
    //put it back
    this.setState({ newUser })
}

//push into API / Database
handleSubmit = async (event) => {
    //prevent page from reloading
    event.preventDefault()
    const response = await axios.post('/api/users', this.state.newUser)
    //push response.data into array
    const users = [...this.state.users]
    users.push(response.data)
    this.setState({ users })
  }


  

  render() {
        //get users out of state and map through it
        const usersList = this.state.users.map((user, i) => {
            return (
            <StyledUserInfo key={i}>
              
            
            <Link to={`/users/${user._id}`}
            key={i}
            >
           <ImageContainer>
            <img src={user.imageUrl} alt="user" />
            </ImageContainer>
            <br></br>
            {user.name} from {user.neighborhood}
            </Link>
            <br></br><br></br>
         
            </StyledUserInfo>
            )
        })
    return (
      <div>
        
        <StyledHeader><h1>Users</h1></StyledHeader>
        <StyledSubHeader><h2>Please select a User</h2></StyledSubHeader>
        {usersList}
        <br></br>
        <StyledSubHeader><h2>Or Create Your Own!</h2></StyledSubHeader>
        <br></br>
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
        
      </div>
    )
  }
}
