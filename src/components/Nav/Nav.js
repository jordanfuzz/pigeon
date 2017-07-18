import React, {Component} from 'react'
import './Nav.css'
import menu from './menu.svg'

export default class Nav extends Component {

  render() {
    return (
      <div className="nav-bar">
        <div className="nav-container">
          <img alt="menu icon" className="menu-icon" src={menu}/>
          <h1 className="title">Pigeon</h1>
        </div>
          <div className="create-button">Create</div>
          <h2 className="login">Log In</h2>
      </div>
    )
  }
}