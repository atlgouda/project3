import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default class Home extends Component {
  render() {
    return (
      <div>
          <h1>Welcome to the New Restaurant Guide!</h1>
          <Link to='/login'>Log In</Link>
        
      </div>
    )
  }
}

