import React, {Component} from 'react'
import './Nav.css'
import menu from './menu.svg'
import {Link} from 'react-router-dom'

export default class Nav extends Component {
  constructor() {
    super()

    this.state = {
      menuShown: false
    }

    this.toggleMenu = this.toggleMenu.bind(this)

  }

  toggleMenu(event) {
    event.preventDefault()

    this.setState({
      menuShown: !this.state.menuShown
    })
    console.log(this.state.menuShown)
  }


  render() {
    return (
      <div className="nav-main">
        <div className="nav-bar">
          <div className="nav-container">
            <img onClick={this.toggleMenu} alt="menu icon" className="menu-icon" src={menu}/>
            <h1 className="title">Pigeon</h1>
          </div>
            <div className="create-button">Create</div>
          <a href="http://localhost:3001/auth">
            <h2 className="login">Log In</h2>
          </a>
        </div>
        <div className={this.state.menuShown ? `extended-menu` : `extended-menu-hidden`}>
          <Link className="no-underline" to="/">
            <div className="tab tab-one"><h2>Home</h2></div>
          </Link>
          <Link className="no-underline" to="/create">
            <div className="tab tab-two"><h2>Create</h2></div>
          </Link>
          <Link className="no-underline" to="/cart">
            <div className="tab tab-three"><h2>Cart</h2></div>
          </Link>
        </div>
      </div>
    )
  }
}