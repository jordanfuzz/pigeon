import React, {Component} from 'react'
import './Create.css'
import Layout from './Layout/Layout'
import Upload from './Upload/Upload'

export default class Create extends Component {


  constructor() {
    super()
    this.state = {
      selectedLayout: 0,
      currentStepIndex: 0
    }

    this.updateLayout = this.updateLayout.bind(this)
    this.handleProceed = this.handleProceed.bind(this)
    this.handleGoBack = this.handleGoBack.bind(this)
    this.getCurrentStep = this.getCurrentStep.bind(this)
  }

  handleProceed(event) {
    event.preventDefault()

    this.setState({
      currentStepIndex: this.state.currentStepIndex + 1
    })
  }

  handleGoBack(event) {
    event.preventDefault()

    this.setState({
      currentStepIndex: this.state.currentStepIndex - 1
    })
  }

  updateLayout(layout) {
    this.setState({
      selectedLayout: layout
    })
    return layout
  }

  getCurrentStep(index) {
    switch(index) {
      case 0:
        return <Layout updateLayout={this.updateLayout} selectedLayout={this.state.selectedLayout} />
      case 1:
        return <Upload selectedLayout={this.state.selectedLayout} />
      default:
        return null
    }
  }

  render () {
    let currentStep = this.getCurrentStep(this.state.currentStepIndex)


    return (
      <div className="create-main">
        {currentStep}
        <div className="button-container">
          <div onClick={this.handleGoBack} className={`step-button previous ${this.state.currentStepIndex > 0 ? `shown-button` : `hidden-button`}`}>Previous</div>
          <div onClick={this.handleProceed} className="step-button next">Next</div>
        </div>

      </div>
    )
  }

}