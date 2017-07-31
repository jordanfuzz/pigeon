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
      imageSources: [],
      crop: {
        width: 50,
        x: 0,
        y: 0
      }
    }

    this.cropImage = this.cropImage.bind(this)
    this.setCropParameters = this.setCropParameters.bind(this)
  }

  layouts = {
    '0': [
      {
        aspect: 3 / 2,
        width: '300px',
        position: {left: 0, top: 0}
      },
    ],
    '1': [
      {
        aspect: 3 / 4,
        width: '150px',
        position: {left: 0, top: 0}
      },
      {
        aspect: 3 / 4,
        width: '150px',
        position: {left: 150, top: 0}
      },
    ],
    '2': [
      {
        aspect: 3 / 4,
        width: '150px',
        position: {left: 0, top: 0}
      },
      {
        aspect: 3 / 2,
        width: '150px',
        position: {left: 150, top: 0}
      },
      {
        aspect: 3 / 2,
        width: '150px',
        position: {left: 150, top: 100}
      },
    ],
    '3': [
      {
        aspect: 3 / 2,
        width: '150px',
        position: {left: 0, top: 0}
      },
      {
        aspect: 3 / 2,
        width: '150px',
        position: {left: 0, top: 100}
      },
      {
        aspect: 3 / 4,
        width: '150px',
        position: {left: 150, top: 0}
      },
    ]

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

  handleFileUpload(event, imageIndex) {
    let file = event.target.files[0]
    let reader = new FileReader()
    reader.onloadend = () => {
      const imageSources = this.state.imageSources.slice(0)
      imageSources[imageIndex] = {originalImageSource: reader.result}
      this.setState({
        imageSources
      })
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
      let cropHeight = cropWidth * (1/crop.aspect)

      let canvas = document.createElement('canvas')
      canvas.width = cropWidth
      canvas.height = cropHeight
      let ctx = canvas.getContext('2d')

      ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)

      let imageSources = this.state.imageSources.splice(0)
      let index = this.state.currentImageIndex
      let imageSrc = canvas.toDataURL('image/jpeg')
      imageSources[index] = Object.assign(imageSources[index], {croppedImageSource: imageSrc})

      this.setState({
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        imageSources
      })
      axios.post('/api/images/crop-info', crop, {headers: {'content-type': 'application/json'}})

      image = null;
    };
    image.src = this.state.imageSources[this.state.currentImageIndex].originalImageSource
  }

  setCropParameters(imageIndex) {
    this.setState({
      currentImageIndex: imageIndex,
      crop: Object.assign(this.state.crop, {aspect: this.layouts[this.props.selectedLayout][imageIndex].aspect})
    })
  }

  renderImage(imageParams, i) {
    let image = this.state.imageSources[i] || {}
    console.log(imageParams)
    return image.croppedImageSource
      ? <img style={{opacity: .75, position:'absolute', width: imageParams.width, top: imageParams.position.top, left: imageParams.position.left}}
             src={image.croppedImageSource} key={i}/>
      : null
  }

  render() {
    let imageCount
    if (this.props) {
      imageCount = this.countImages(this.props.selectedLayout)
    }

    let uploadSections = []
    for (let i = 0; i < imageCount; i++) {
      uploadSections.push(<div key={i} className="upload-section">
        <div className="image-number-container"><h1 className="image-number">{`${i + 1}  -`}</h1></div>
        <div className="upload-section-button relative">Upload
          <input className="invisible" type="file" onClick={() => this.setCropParameters(i)}
                 onChange={(event) => this.handleFileUpload(event, i)}/>
        </div>
        <p className="or-separator">-or-</p>
        <div className="upload-section-button">Choose</div>
        <br/>
        <input className="public-checkbox" type="checkbox"/>
        <p className="public-text">Make this image public?</p>
      </div>)
    }

    let currentImage = this.state.imageSources[this.state.currentImageIndex] || {}

    return (
      <div className="upload-main">

        <Modal
          isOpen={!!currentImage.originalImageSource && !currentImage.croppedImageSource}
          onRequestClose={() => {
            this.setState({imageSource: null})
          }}
          style={{
            overlay: {backgroundColor: 'rgba(10, 10, 10, 0.85)'},
            content: {bottom: 'unset'}
          }}
          contentLabel="Crop Image">
          {currentImage.originalImageSource
            ? <ReactCrop
              onComplete={(crop) => {
                this.setState({crop})
              }}
              crop={this.state.crop}
              src={currentImage.originalImageSource}/>
            : null}

          <div className="done-button-container">
            <div className="upload-section-button" onClick={() => this.cropImage()}>Done</div>
          </div>
        </Modal>
        <h1 className="title">Upload Photos</h1>
        <div className={`selected-layout layout-${this.props.selectedLayout}`}>
          {this.layouts[this.props.selectedLayout].map((imageParams, i) => this.renderImage(imageParams, i))}
        </div>
        <div className="upload-sections">
          {uploadSections}
        </div>
      </div>)

  }

}