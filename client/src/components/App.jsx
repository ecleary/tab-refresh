import React, { Component } from 'react';
import $ from 'jquery';
import Background from './Background.jsx';
import ImageSelector from './ImageSelector.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: [],
    };
    this.getImageData = this.getImageData.bind(this);
  }

  componentDidMount() {
    this.getImageData();
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

  render() {
    const { imageData } = this.state;
    return (
      <div>
        <h1>Too much planets!</h1>
        <Background />
        <ImageSelector imageData={imageData} />
      </div>
    );
  }
}
