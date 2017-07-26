import React, {Component} from 'react'
import './Upload.css'
import ImageUploader from 'react-images-uploader'
import 'react-images-uploader/styles.css'
import 'react-images-uploader/font.css'

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

  render() {
    let imageCount
    if(this.props) {
      imageCount = this.countImages(this.props.selectedLayout)
    }
    let uploadSections = []
    for (let i = 0; i < imageCount; i++) {
      uploadSections.push(<div key={i}>
        <h1 className="image-number">{`${i+1}  -`}</h1>
        <div className="upload-section-button">Upload</div>
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
        <ImageUploader
          plusElement={<div className="upload-section-button">Upload</div>}
          url="/api/upload-image"
          optimisticPreviews={true}
          multiple={false}
          label="Upload a picture!"
          onLoadEnd={ (err, response) => {
            if (err)
              console.log(err)
            else
              console.log("Done!", response)
          }}
          />
      </div>)

  }

}