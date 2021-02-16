import React, { Component } from 'react';
import $ from 'jquery';
import Background from './Background.jsx';
import ImageSelector from './ImageSelector.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: [],
      backgroundImageUrl: '',
      userId: '602c1f093a2e1c3c66e45f98',
    };
    this.getImageData = this.getImageData.bind(this);
    this.getUserBackgroundImage = this.getUserBackgroundImage.bind(this);
    this.setUserBackgroundImage = this.setUserBackgroundImage.bind(this);
    this.handleSetBackgroundImage = this.handleSetBackgroundImage.bind(this);
  }

  componentDidMount() {
    this.getImageData();
    this.getUserBackgroundImage();
  }

  getImageData() {
    $.ajax({
      url: '/api/images',
      method: 'GET',
      success: (data) => {
        this.setState({
          imageData: data,
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
    // console.log('url:');
    // console.log(url);
    this.setState({
      backgroundImageUrl: url,
    }, this.setUserBackgroundImage);
  }

  render() {
    const { imageData, backgroundImageUrl } = this.state;
    return (
      <div>
        <Background backgroundImageUrl={backgroundImageUrl} />
        <ImageSelector imageData={imageData} onSetBackgroundImage={this.handleSetBackgroundImage} />
      </div>
    );
  }
}
