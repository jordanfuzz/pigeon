import React, {Component} from 'react'
import './Home.css'
import arrow from './down-arrow.svg'
import image from './image.svg'
import postcard from './postcard.svg'
import mail from './message.svg'
import Slideshow from './Slideshow/Slideshow'
import {connect} from 'react-redux'
import {dispatchGetUser} from '../../services/authenticationService'
import {Link} from 'react-router-dom'

class Home extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    console.log('Received props!')
    dispatchGetUser()
  }

  render () {
    return (
      <div className="home-main">
        <div className="welcome-text">{this.props.firstName ? `Welcome, ${this.props.firstName}` : ""}</div>
        <section>
          <Slideshow/>
          <p className="intro-text">Create custom postcards from your mobile device</p>
          <div className="separator"></div>
          <h1 className="get-started-text">GET STARTED</h1>
          <img src={arrow} alt="down arrow" className="down-arrow" />
        </section>
        <section>
          <div className="upload-container">
            <div className="home-section-top">
              <h1 className="home-section-title">Upload</h1>
              <img className="home-section-icon" src={image} alt="Upload a photo"/>
            </div>
            <p className="home-section-description">Upload your photo, or choose one of ours</p>
          </div>
          <div className="customize-container">
            <div className="home-section-top">
              <img className="home-section-icon" src={postcard} alt="Customize your postcard"/>
              <h1 className="home-section-title-left">Customize</h1>
            </div>
            <p className="home-section-description-left">Pick your styles and add a message</p>
          </div>
          <div className="send-container">
            <div className="home-section-top">
              <h1 className="home-section-title">Send</h1>
              <img className="home-section-icon" src={mail} alt="Send your postcard"/>
            </div>
            <p className="home-section-description">Send a printed postcard to your friends</p>
            <div className="separator-white"></div>
            <Link className="create-button-link" to="/create">
              <div className="home-create-button">Start Creating</div>
            </Link>
          </div>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    firstName: state.currentUser.firstname
  }
}

export default connect(mapStateToProps)(Home)