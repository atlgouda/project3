import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default class LogIn extends Component {
    state = {
        users: [],
    }

    getAllUsers = () => {
        axios.get('localhost:3001/api/users').then(res => {
            this.setState({users: res.data})
        })
    }
  render() {
    return (
      <div>
        <h1>Log In</h1>
        <h3>Please select a User</h3>
        {this.state.users.map(user => {
          return (<Link to={`/user/${user._id}`}>{user.name}</Link>)
        })}
      </div>
    )
  }
}
