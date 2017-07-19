import React, {Component} from 'react'
import lake from './lake.jpg'
import './Slideshow.css'

export default class Slideshow extends Component {

  render() {
    return(
      <div>
        <img className="slideshow-image" src={lake} alt="Lake"/>
      </div>

    )
  }


}