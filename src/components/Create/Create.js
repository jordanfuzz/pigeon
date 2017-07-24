import React, {Component} from 'react'
import './Create.css'
import Layout from './Layout/Layout'

export default class Create extends Component {


  constructor() {
    super()
    this.state = {
      selectedLayout: 0
    }

    this.updateLayout = this.updateLayout.bind(this)
  }

  updateLayout(layout) {
    this.setState({
      selectedLayout: layout
    })
    return layout
  }

  render () {
    return (
      <div className="create-main">
        <Layout updateLayout={this.updateLayout} selectedLayout={this.state.selectedLayout} />
        <div className="next-button">Next</div>
      </div>
    )
  }

}