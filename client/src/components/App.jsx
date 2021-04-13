import React, { Component } from 'react';
import $ from 'jquery';
import Background from './Background.jsx';
import { ImageSelector } from './ImageSelector.jsx';
import styles from './styles/App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: [],
      backgroundImageUrl: '',
      userId: '602c1f093a2e1c3c66e45f98',
      remainingUnsplashApiCalls: '',
      displayImageSelector: 'Hidden',
      selectorButtonHover: false,
    };
    this.getImageData = this.getImageData.bind(this);
    this.getUserBackgroundImage = this.getUserBackgroundImage.bind(this);
    this.setUserBackgroundImage = this.setUserBackgroundImage.bind(this);
    this.handleSetBackgroundImage = this.handleSetBackgroundImage.bind(this);
    this.toggleImageSelectorDisplay = this.toggleImageSelectorDisplay.bind(this);
    this.handleSelectorButtonMouseEnter = this.handleSelectorButtonMouseEnter.bind(this);
    this.handleSelectorButtonMouseLeave = this.handleSelectorButtonMouseLeave.bind(this);
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
    if (displayImageSelector === 'Hidden') {
      this.setState({
        displayImageSelector: 'Fade',
    }, () => {
      setTimeout(() => {
        this.setState({
          displayImageSelector: '',
        });
      }, 0);
    });
  } else if (displayImageSelector === '') {
      this.setState({
        displayImageSelector: 'Fade',
      }, () => {
        setTimeout(() => {
          this.setState({
            displayImageSelector: 'Hidden',
          });
        }, 160);
      });
    }
  }

  handleSelectorButtonMouseEnter() {
    this.setState({
      selectorButtonHover: true,
    });
  }

  handleSelectorButtonMouseLeave() {
    this.setState({
      selectorButtonHover: false,
    });
  }

  render() {
    const {
      imageData,
      backgroundImageUrl,
      remainingUnsplashApiCalls,
      displayImageSelector,
      selectorButtonHover,
    } = this.state;
    const remainingApiCallCountdown = `API calls left: ${remainingUnsplashApiCalls}`;
    const selectorButtonHoverStyle = selectorButtonHover ? 'Hover' : '';

    return (
      <div>
        <h1 className={styles.remainingUnsplashApiCalls}>
          {remainingApiCallCountdown}
        </h1>
        <Background backgroundImageUrl={backgroundImageUrl} />
        <div
          className={displayImageSelector === ''
            ? styles.imageSelectorModalBackground
            : styles.imageSelectorModalBackgroundHidden}
          onClick={this.toggleImageSelectorDisplay}
        ></div>
        <div
          className={styles[`imageSelectorContainer${displayImageSelector}`]}
        >
          <ImageSelector imageData={imageData} onSetBackgroundImage={this.handleSetBackgroundImage} />
        </div>
        <div
          className={styles.imageSelectorDisplayButton}
          onMouseEnter={this.handleSelectorButtonMouseEnter}
          onMouseLeave={this.handleSelectorButtonMouseLeave}
          onClick={this.toggleImageSelectorDisplay}
        >
          <div className={styles.[`imageSelectorDisplayButtonUpperLeft${selectorButtonHoverStyle}`]} />
          <div className={styles.[`imageSelectorDisplayButtonUpperRight${selectorButtonHoverStyle}`]} />
          <div className={styles.[`imageSelectorDisplayButtonLowerRight${selectorButtonHoverStyle}`]} />
          <div className={styles.[`imageSelectorDisplayButtonLowerLeft${selectorButtonHoverStyle}`]} />
        </div>
      </div>
    );
  }
}
