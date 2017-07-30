import React, {Component} from 'react'
import './Upload.css'
import axios from 'axios'
import Modal from 'react-modal'
import ReactCrop from 'react-image-crop'
import '../../../../node_modules/react-image-crop/dist/ReactCrop.css'

export default class Upload extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageSource: null,
      crop: {
        width: 50,
        aspect: 3/2,
        x:0,
        y:0
      }
    }

    this.cropImage = this.cropImage.bind(this)
  }

  countImages(layout) {
    if (layout === 0)
      return 1
    else if (layout === 1)
      return 2
    else if (layout === 2 || layout === 3)
      return 3
    else return 4
  }

  handleFileUpload(event) {
    let file = event.target.files[0]
    let reader = new FileReader()
    reader.onloadend = () => {
      this.setState({imageSource: reader.result})
    }
    reader.readAsDataURL(file)

    return axios.post('/api/images', file, {headers: {'content-type': file.type}})
    //     return axios.post('/api/images', file, {headers: {'content-type': file.type, 'id': id, postcardPosition: 1}})

  }

  cropImage() {
    let image = new Image()
    image.onload = () => {
      let imageWidth = image.naturalWidth
      let imageHeight = image.naturalHeight
      let crop = this.state.crop

      let cropX = (crop.x / 100) * imageWidth
      let cropY = (crop.y / 100) * imageHeight

      let cropWidth = (crop.width / 100) * imageWidth
      let cropHeight = (crop.height / 100) * imageHeight

      let canvas = document.createElement('canvas')
      canvas.width = cropWidth
      canvas.height = cropHeight
      let ctx = canvas.getContext('2d')

      ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)

      this.setState({
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        croppedImageSource: canvas.toDataURL('image/jpeg')
      })
      axios.post('/api/images/crop-info', crop, {headers: {'content-type': 'application/json'}})
      // this.ready()

      image = null;
    };
    image.src = this.state.imageSource
  }

  render() {
    let imageCount
    if (this.props) {
      imageCount = this.countImages(this.props.selectedLayout)
    }

    let uploadSections = []
    for (let i = 0; i < imageCount; i++) {
      uploadSections.push(<div key={i}>
        <h1 className="image-number">{`${i + 1}  -`}</h1>
        <div className="upload-section-button relative">Upload
          <input className="invisible" type="file" onChange={(event) => this.handleFileUpload(event)}/>
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

        <Modal
          isOpen={!!this.state.imageSource && !this.state.croppedImageSource}
          onRequestClose={() => {
            this.setState({imageSource: null})
          }}
          contentLabel="Crop Image">
          {this.state.imageSource
            ? <ReactCrop
              onComplete={(crop) => {
                this.setState({crop})
              }}
              crop={this.state.crop}
              src={this.state.imageSource}/>
            : null}

          <button className="upload-section-button" onClick={() => this.cropImage()}>Done</button>
        </Modal>
        <h1 className="title">Upload Photos</h1>
        <div className={`selected-layout layout-${this.props.selectedLayout}`}>
          {this.state.croppedImageSource
            ? <img style={{width:'300px'}} src={this.state.croppedImageSource}/>
            : null}
        </div>
        <div className="upload-sections">
          {uploadSections}
        </div>
      </div>)

  }

}