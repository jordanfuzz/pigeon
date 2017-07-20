import React, {Component} from 'react'
import lake from './lake.jpg'
import zebras from './zebras.jpg'
import mountain from './mountain.jpg'
import './Slideshow.css'
import previous from './left-arrow.svg'
import next from './right-arrow.svg'

export default class Slideshow extends Component {
  constructor() {
    super()

    this.state = {
      currentSlide: 0
    }
    this.handleNext = this.handleNext.bind(this)
    this.handlePrevious = this.handlePrevious.bind(this)
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
    let source = lake

    switch(this.state.currentSlide) {
      case 0:
        source = lake
        break
      case 1:
        source = mountain
        break
      case 2:
        source = zebras
        break
      default:
        source = lake
        console.log("used default")
    }

    return(

      <div className="slideshow-container">
        <img onClick={this.handlePrevious} className="slideshow-button-left" src={previous} alt="Previous"/>
        <img className="slideshow-image" src={source} alt="Lake"/>
        <img onClick={this.handleNext} className="slideshow-button-right" src={next} alt="Next"/>
      </div>

    )
  }


}