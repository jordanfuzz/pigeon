import React, {Component} from 'react'
import './Message.css'

export default class Message extends Component {
  constructor() {
    super()

    this.state = {
      currentFont: 'Open Sans',
      textValue: ''
    }

  }



  render() {

    return (
      <div className="message-main">
        <h1 className="title">Add Your Message</h1>
        <div className="postcard">
          <div className="postcard-text">Take a look at this picture, nerd!</div>
          <div className="divider"></div>
          <div className="stamp"></div>
        </div>
        <h6 className="message-header">Message:</h6>
        <textarea className="message-box"></textarea>
        <h6 className="message-header">Font:</h6>
        <select>
          <option value="Open Sans">Open Sans</option>
        </select>

      </div>
    )
  }
}