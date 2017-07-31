import React, {Component} from 'react'
import PostcardBack from '../../PostcardBack/PostcardBack'
import './Message.css'

const fonts = {
  'Open Sans': 'Open Sans',
  'Indie Flower': 'Flower',
  'Great Vibes': 'Vibes',
  'Gochi Hand': 'Pigeon'
}

class Message extends Component {

  constructor() {
    super()

    this.state = {
      textValue: '',
      currentFont: Object.keys(fonts)[0]
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleFontChange = this.handleFontChange.bind(this)
  }

  handleTextChange(value) {
    this.props.updatePostcardMessage(value)
    if(value.length > 140)
      return
   this.setState({
     textValue: value
   })
  }

  handleFontChange(value) {
    this.props.updatePostcardFont(value)
    this.setState({
      currentFont: value
    })
  }

  render() {
    return (
      <div className="message-main">
        <h1 className="title">Add Your Message</h1>
        <PostcardBack />
        <h6 className="message-header">Message:</h6>
        <textarea value={this.context.message} onChange={(event) => this.handleTextChange(event.target.value)} className="message-box"></textarea>
        <h6 className="message-header">Font:</h6>
        <select style={{fontFamily: this.state.currentFont}} className="font-selector" onChange={(event) => this.handleFontChange(event.target.value)}>
          {Object.keys(fonts).map(key => {
            return <option style={{fontFamily: key}} value={key}>{fonts[key]}</option>
          })}
        </select>
      </div>
    )
  }
}

export default Message