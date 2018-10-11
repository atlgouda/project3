import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledComeIn = styled.div`
    font-size: 5vh;
    margin-top: 55%;
    background-color: black;
    opacity: 0.6;
    border-radius: 40px;
    font-weight: bolder;
    margin-left: 10%;
    margin-right: 10%;
    
    
`
const StyledWelcome = styled.div`
    margin-right: 10%;
    margin-left: 10%;
    padding-top: 10%;
    padding-bottom: 10%;
    border-top: 20%;
    
    font-weight: bolder;
    font-size: 6vh;

`

const LandingPage = styled.div`
  background-image: url(https://i.imgur.com/n2IgZRG.jpg?1);
  height: 100vh; 
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  max-width: 414;
  color: white;
  a {
      text-decoration: none;
      color: whitesmoke;
  }
 text-align: center;
 font-size: 100%;
 

`

export default class Home extends Component {
  render() {
    return (
      <LandingPage>
          <StyledWelcome>
          <Link to='/login'>ATL Future Favs</Link></StyledWelcome>
        <StyledComeIn>
            <Link to='/login'>Come on in y'all</Link>
        </StyledComeIn>
      </LandingPage>
       
    )
  }
}

