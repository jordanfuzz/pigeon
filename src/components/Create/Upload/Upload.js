import React, {Component} from 'react'
import './Upload.css'
import axios from 'axios'

export default class Upload extends Component {

  countImages(layout) {
    if(layout === 0)
      return 1
    else if(layout === 1)
      return 2
    else if(layout === 2 || layout === 3)
      return 3
    else return 4
  }

  handleFileUpload(x) {
    let data = new FormData();
    let file = x.target.files[0];
    data.append('image', file);

    return axios.post('/api/images', data, {headers: { 'content-type': 'multipart/form-data' }})
  }
  
  render() {
    let imageCount
    if(this.props) {
      imageCount = this.countImages(this.props.selectedLayout)
    }

    let uploadSections = []
    for (let i = 0; i < imageCount; i++) {
      uploadSections.push(<div key={i}>
        <h1 className="image-number">{`${i+1}  -`}</h1>
        <div className="upload-section-button relative">Upload
          <input className="invisible" type="file" onChange={this.handleFileUpload} />
        </div>
        <p className="or-separator">-or-</p>
        <div className="upload-section-button">Choose</div>
        <br/>
        <input className="public-checkbox" type="checkbox"/>
        <p className="public-text">Make this image public?</p>
        </div>)
    }

    return (
      <div className="upload-main">
        <h1 className="title">Upload Photos</h1>
        <div className={`selected-layout layout-${this.props.selectedLayout}`}></div>
        <div className="upload-sections">
          {uploadSections}
        </div>
      </div>)

  }

}