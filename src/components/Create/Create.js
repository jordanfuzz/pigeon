import React, {Component} from 'react'
import styles from './create.css'

export default class Create extends Component {

  render () {
    return (
      <div>
        <h1>Choose Your Layout</h1>
        <div className="selected-layout"></div>
      </div>
    )
  }

}