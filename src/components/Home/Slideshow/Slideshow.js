import React, {Component} from 'react'
import lake from './lake.jpg'
import './Slideshow.css'
import previous from './left-arrow.svg'
import next from './right-arrow.svg'

export default class Slideshow extends Component {
  constructor() {
    super()

    this.state = {
      currentSlide: 0
    }
  }

  handleNext(event) {
    event.preventDefault()

    if(this.state.currentSlide >= 2) {
      this.setState({
        currentSlide: 0
      })
    }
    else {
      this.setState({
        currentSlide: this.state.currentSlide + 1
      })
    }
  }

  handlePrevious(event) {
    event.preventDefault()

    if(this.state.currentSlide <= 0) {
      this.setState({
        currentSlide: 2
      })
    }
    else {
      this.setState({
        currentSlide: this.state.currentSlide - 1
      })
    }
  }

  render() {
    return(

      <div className="slideshow-container">
        <img onClick={this.handlePrevious} className="slideshow-button-left" src={previous} alt="Previous"/>
        <img className="slideshow-image" src={lake} alt="Lake"/>
        <img onClick={this.handleNext} className="slideshow-button-right" src={next} alt="Next"/>
      </div>

    )
  }


}