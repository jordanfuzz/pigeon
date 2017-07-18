import React, {Component} from 'react'
import './Home.css'
import arrow from './down-arrow.svg'

export default class Home extends Component {

  render () {
    return (
      <div>
        <section>
          <div className="slideshow-container"></div>
          <p className="intro-text">Create custom postcards from your mobile device</p>
          <div className="separator"></div>
          <h1 className="get-started-text">GET STARTED</h1>
          <img src={arrow} alt="down arrow" className="down-arrow" />
        </section>
        <section>
          <div className="upload-container">
            <div className="home-section-top">
              <h1 className="home-section-title">Upload</h1>
            </div>
            <p className="home-section-description">Upload your photo, or choose one of ours</p>
          </div>
          <div className="customize-container">
            <div className="home-section-top">
              <h1 className="home-section-title">Customize</h1>
            </div>
            <p className="home-section-description">Pick your styles and add a message</p>
          </div>
          <div className="send-container">
            <div className="home-section-top">
              <h1 className="home-section-title">Send</h1>
            </div>
            <p className="home-section-description">Send a printed postcard to your friends</p>
          </div>
        </section>
      </div>
    )
  }
}