import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default class LogIn extends Component {
    state = {
        users: [],
    }

    componentDidMount = async () => {
        const response = await axios.get('/api/users')
        this.setState({ users: response.data})
    }

  render() {
        //get users out of state and map through it
        const usersList = this.state.users.map((user, i) => {
            return (
            <div>
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
       
      </div>
    )
  }
}
