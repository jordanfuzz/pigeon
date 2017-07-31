import React, {Component} from 'react'
import './Recipient.css'
import PostcardBack from '../../PostcardBack/PostcardBack'

class Recipient extends Component {
  constructor() {
    super()

    this.state = {
      recipientName: "",
      recipientAddress: "",
      recipientCity: "",
      recipientState: "",
      recipientPostalCode: "",
      recipientCountry: ""

    }
  }

  handleChange(key, value) {
    if (key === "recipientName")
      this.props.updateRecipientName(value)
    this.setState({
      [key]: value
    })
  }

  render() {
    let address = (<div>
      <div>{this.state.recipientName}</div>
      <div>{this.state.recipientAddress}</div>
      <div>{this.state.recipientCity ? `${this.state.recipientCity} ${this.state.recipientState}, ${this.state.recipientPostalCode}` : ``}</div>
      <div>{this.state.recipientCountry}</div>
    </div>)


    return (<div className="recipient-main">
      <h1 className="title">Enter the Recipient</h1>
      <PostcardBack address={address}/>
      <input placeholder="Name" className="recipient-field" onChange={(e) => this.handleChange(e.target.name, e.target.value)}
             name="recipientName" value={this.state.recipientName} type="text"/>
      <input placeholder="Address" className="recipient-field" onChange={(e) => this.handleChange(e.target.name, e.target.value)}
             name="recipientAddress" value={this.state.recipientAddress} type="text"/>
      <input placeholder="City" className="recipient-field city" onChange={(e) => this.handleChange(e.target.name, e.target.value)}
             name="recipientCity" value={this.state.recipientCity} type="text"/>
      <input placeholder="State" className="recipient-field state" onChange={(e) => this.handleChange(e.target.name, e.target.value)}
             name="recipientState" value={this.state.recipientState} type="text"/>
      <input placeholder="Postal Code" className="recipient-field" onChange={(e) => this.handleChange(e.target.name, e.target.value)}
             name="recipientPostalCode" value={this.state.recipientPostalCode} type="text"/>
      <input placeholder="Country" className="recipient-field" onChange={(e) => this.handleChange(e.target.name, e.target.value)}
             name="recipientCountry" value={this.state.recipientCountry} type="text"/>
    </div>)
  }

}


export default Recipient