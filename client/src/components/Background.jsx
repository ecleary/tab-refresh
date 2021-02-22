import React, { Component } from 'react';
import styles from './styles/Background.css';

export default class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageHasLoaded: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.backgroundImageUrl !== prevProps.backgroundImageUrl) {
      this.setState({
        imageHasLoaded: false,
      }, () => {
        console.log('Image has NOT yet loaded.');
        const { backgroundImageUrl } = this.props;
        const img = new Image();
        img.onload = () => {
          console.log('Image HAS LOADED.');
          this.setState({
            imageHasLoaded: true,
          });
        };
        img.src = backgroundImageUrl;
        console.log('backgroundImageUrl:');
        console.log(backgroundImageUrl);
      });
    }
  }

  render() {
    const { backgroundImageUrl } = this.props;
    const { imageHasLoaded } = this.state;
    if (imageHasLoaded) {
      const root = document.querySelector(':root');
      root.style.setProperty('--background-image-url', `url(${backgroundImageUrl})`);
    }

    return (
      <div className={styles.backgroundImage}></div>
    );
  }
}
