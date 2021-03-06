import React, {Component} from 'react'
import './PostcardBack.css'
import PropTypes from 'prop-types'

class PostcardBack extends Component {



  render () {
    let address
    if(this.props)
      address = this.props.address
    return (
      <div className="postcard-back-main">
        <div className="postcard">
          <div style={{"fontFamily":`${this.context.selectedFont}, sans-serif`}} className="postcard-text">{this.context.message}</div>
          <div className="divider"></div>
          <div className="postcard-address">{address}</div>
          <div className="stamp"></div>
        </div>
      </div>)
  }
}

PostcardBack.contextTypes = {
  message: PropTypes.string,
  selectedFont: PropTypes.string
};

export default PostcardBack