import React, {Component} from 'react'
import './Home.css'
import arrow from './down-arrow.svg'

export default class Home extends Component {

  render () {
    return (
      <div>
        <div className="slideshow-container"></div>
        <p className="intro-text">Create custom postcards from your mobile device</p>
        <div className="separator"></div>
        <h1 className="get-started-text">GET STARTED</h1>
        <img src={arrow} alt="down arrow" className="down-arrow" />
      </div>
    )
  }
}