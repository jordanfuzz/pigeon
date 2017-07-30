import React, {Component} from 'react'
import './Create.css'
import Layout from './Layout/Layout'
import Upload from './Upload/Upload'
import Message from './Message/Message'
import Recipient from './Recipient/Recipient'
import PropTypes from 'prop-types'

class Create extends Component {


  constructor() {
    super()
    this.state = {
      currentStepIndex: 0,
      selectedLayout: 0,
      selectedFont: "Open Sans",
      message: "",
      recipientName: ""
    }

    this.updateLayout = this.updateLayout.bind(this)
    this.handleProceed = this.handleProceed.bind(this)
    this.handleGoBack = this.handleGoBack.bind(this)
    this.getCurrentStep = this.getCurrentStep.bind(this)
    this.updatePostcardFont = this.updatePostcardFont.bind(this)
    this.updatePostcardMessage = this.updatePostcardMessage.bind(this)
    this.updateRecipientName = this.updateRecipientName.bind(this)
  }

  getChildContext() {
    return {
      selectedLayout: this.state.selectedLayout,
      selectedFont: this.state.selectedFont,
      message: this.state.message
    }
  }

  updatePostcardFont(font) {
    this.setState({
      selectedFont: font
    })
  }

  updatePostcardMessage(message) {
    this.setState({
      message: message
    })
  }

  updateRecipientName(name) {
    this.setState({
      recipientName: name
    })
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

  handleFinish(event) {
    event.preventDefault()
    //create postcard db call

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
      case 2:
        return <Message updatePostcardFont={this.updatePostcardFont} updatePostcardMessage={this.updatePostcardMessage}/>
      case 3:
        return <Recipient updateRecipientName={this.updateRecipientName}/>
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
          <div onClick={this.handleProceed} className={`step-button next ${this.state.currentStepIndex < 3 ? `shown-button` : `hidden-button`}`}>Next</div>
          <div onClick={this.handleFinish} className={`step-button previous ${this.state.currentStepIndex === 3 ? `shown-button` : `hidden-button`}`}>Finish</div>
        </div>
      </div>
    )
  }
}

Create.childContextTypes = {
  selectedLayout: PropTypes.number,
  selectedFont: PropTypes.string,
  message: PropTypes.string
}

export default Create