import React, {Component} from 'react'
import './Create.css'

export default class Create extends Component {
  static layouts = [0,1,2,3,4]

  constructor() {
    super()
    this.state = {
      selectedLayout: 0,
      layouts: [1,2,3,4]
    }
  }

  handleChangeLayout(layout) {

    this.setState({
      selectedLayout: layout,
      layouts: Create.layouts.filter((l) => l !== layout)
    })

  }

  renderLayout(layout) {
    let classNames = `layout layout-${layout}`
    return <div className={classNames} onClick={() => this.handleChangeLayout(layout)}></div>
  }

  render () {
    return (
      <div className="create-main">
        <h1 className="title">Choose Your Layout</h1>
        <div className={`selected-layout layout-${this.state.selectedLayout}`}></div>
        <div className="layouts">
          {this.state.layouts.map((layout) => this.renderLayout(layout))}
        </div>
      </div>
    )
  }

}