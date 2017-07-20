import React, {Component} from 'react'
import './Nav.css'
import menu from './menu.svg'

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
      <div>
        <div className="nav-bar">
          <div className="nav-container">
            <img onClick={this.toggleMenu} alt="menu icon" className="menu-icon" src={menu}/>
            <h1 className="title">Pigeon</h1>
          </div>
            <div className="create-button">Create</div>
            <h2 className="login">Log In</h2>
        </div>
        <div className={this.state.menuShown ? `extended-menu` : `extended-menu-hidden`}>
          <div className="tab"><h2>Create</h2></div>
          <div className="tab"><h2>Account</h2></div>
          <div className="tab"><h2>Gallery</h2></div>
        </div>
      </div>
    )
  }
}