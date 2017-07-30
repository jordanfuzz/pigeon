import React, {Component} from 'react'
import './Recipient.css'
import PostcardBack from '../../PostcardBack/PostcardBack'
import PropTypes from 'prop-types'

class Recipient extends Component {
  constructor() {
    super()

    this.state = {

    }
  }

  render() {


    return(<div className="recipient-main">
      <h1 className="title">Enter the Recipient</h1>
      <PostcardBack />
    </div>)
  }

}


export default Recipient