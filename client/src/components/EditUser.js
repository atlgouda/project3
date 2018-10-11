import React, { Component } from 'react'
import axios from 'axios'



export default class EditUser extends Component {
    state = {
        user: {},
    }

getUser = async () => {
    console.log(this.props.currentUser)
    const userId = this.props.currentUser
    const response = await axios.get(`/api/users/${userId}`)
    this.setState({
        user: response.data
    })
}
componentDidMount = () => {
    this.getUser()
  }
    //update
handleChange= async (e) => {
    const updatedUser = {...this.state.user}
    updatedUser[e.target.name] = e.target.value
    this.setState({ user: updatedUser })

}

updateUser = async (e) => {
    e.preventDefault()
    const userId = this.props.currentUser
    const updatedUser = this.state.user
    console.log(updatedUser)
    //Axios call not working 
    await axios.put(`/api/users/${userId})`, updatedUser)
    await function(res){
        this.setState({ user: res.data })
    }
    await this.props.toggleView()
}
  render() { 
    return (
      <div>
          <h1>Edit User</h1>
        <form onSubmit={this.updateUser}>
            Name:<input type="text" name="name" onChange={this.handleChange} value={this.state.user.name}/><br></br>
            <input type="submit" value='Update' />
        </form>
        <button onClick={(() => this.props.toggleView())}>toggle</button>
      </div>
    )
  }
}
