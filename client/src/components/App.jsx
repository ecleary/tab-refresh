import React, { Component } from 'react';
import $ from 'jquery';
import Background from './Background.jsx';
import ImageSelector from './ImageSelector.jsx';
import styles from './styles/App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: [],
      backgroundImageUrl: '',
      userId: '602c1f093a2e1c3c66e45f98',
      remainingUnsplashApiCalls: '',
      displayImageSelector: false,
    };
    this.getImageData = this.getImageData.bind(this);
    this.getUserBackgroundImage = this.getUserBackgroundImage.bind(this);
    this.setUserBackgroundImage = this.setUserBackgroundImage.bind(this);
    this.handleSetBackgroundImage = this.handleSetBackgroundImage.bind(this);
    this.toggleImageSelectorDisplay = this.toggleImageSelectorDisplay.bind(this);
  }

  componentDidMount() {
    this.getImageData();
    this.getUserBackgroundImage();
  }

  getImageData() {
    $.ajax({
      url: '/api/images',
      method: 'GET',
      success: (response) => {
        const { data, xRatelimitRemaining } = response;
        this.setState({
          imageData: data,
          remainingUnsplashApiCalls: xRatelimitRemaining,
        });
      },
      error: console.error,
    });
  }

  getUserBackgroundImage() {
    const { userId } = this.state;
    $.ajax({
      url: `/api/users/${userId}/backgroundImage`,
      method: 'GET',
      success: (data) => {
        this.setState({
          backgroundImageUrl: data,
        });
      },
      error: console.error,
    });
  }

  setUserBackgroundImage() {
    const { userId, backgroundImageUrl } = this.state;
    const data = { url: backgroundImageUrl };
    $.ajax({
      url: `/api/users/${userId}/backgroundImage`,
      method: 'PATCH',
      data: data,
      success: () => {},
      error: console.error,
    });
  }

  handleSetBackgroundImage(event, url) {
    event.preventDefault();
    this.setState({
      backgroundImageUrl: url,
    }, this.setUserBackgroundImage);
  }

  toggleImageSelectorDisplay() {
    const { displayImageSelector } = this.state;
    this.setState({
      displayImageSelector: !displayImageSelector,
    });
  }

  render() {
    const {
      imageData,
      backgroundImageUrl,
      remainingUnsplashApiCalls,
      displayImageSelector,
    } = this.state;
    const remainingApiCallCountdown = `API calls left: ${remainingUnsplashApiCalls}`;


    return (
      <div>
        <h1 className={styles.remainingUnsplashApiCalls}>
          {remainingApiCallCountdown}
        </h1>
        <Background backgroundImageUrl={backgroundImageUrl} />
        <div
          className={displayImageSelector
            ? styles.imageSelectorModalBackground
            : styles.imageSelectorModalBackgroundHidden}
          onClick={this.toggleImageSelectorDisplay}
        ></div>
        <div
          className={displayImageSelector
            ? styles.imageSelectorContainer
            : styles.imageSelectorContainerHidden}
        >
          <ImageSelector imageData={imageData} onSetBackgroundImage={this.handleSetBackgroundImage} />
        </div>
        <button
          className={styles.imageSelectorDisplayButton}
          onClick={this.toggleImageSelectorDisplay}
        >
          Select image
        </button>
      </div>
    );
  }
}
