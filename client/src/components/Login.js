import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


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
            <div key={i}>
                <br></br>
            
            <Link to={`/users/${user._id}`}
            key={i}
            >Name: {user.name}
            </Link>
            <br></br>
           
            Stomping Grounds: {user.neighborhood}
            </div>
            )
        })
    return (
      <div>
        
        <h1>Log In</h1>
        <h3>Please select a User</h3>
        {usersList}
            
        <form onSubmit={this.handleSubmit}>
        <input type="text"
        name="name"
        value={this.state.newUser.name}
        onChange={this.handleChange} />
        <input type='submit' value="Create New User" />
        
        </form>
        
      </div>
    )
  }
}
