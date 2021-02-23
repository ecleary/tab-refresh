import React, { Component } from 'react';
import styles from './styles/Background.css';

export default class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageHasLoaded: false,
      previousImageUrl: '',
    };
    this.setPreviousImageUrl = this.setPreviousImageUrl.bind(this);
  }

  setPreviousImageUrl(url) {
    this.setState({
      previousImageUrl: url,
    });
  }

  componentDidMount() {
    const { backgroundImageUrl } = this.props;
    this.setState({
      previousImageUrl: backgroundImageUrl,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.backgroundImageUrl !== prevProps.backgroundImageUrl) {
      this.setState({
        imageHasLoaded: false,
      }, () => {
        // console.log('Image has NOT yet loaded.');
        const { backgroundImageUrl } = this.props;
        const img = new Image();
        img.onload = () => {
          // console.log('Image HAS LOADED.');
          this.setState({
            imageHasLoaded: true,
            previousImageUrl: backgroundImageUrl,
          });
        };
        img.src = backgroundImageUrl;
        // console.log('backgroundImageUrl:');
        // console.log(backgroundImageUrl);
      });
    }
  }

  render() {
    const { backgroundImageUrl } = this.props;
    const { imageHasLoaded, previousImageUrl } = this.state;
    if (imageHasLoaded) {
      // console.log('imageHasLoaded has changed to TRUE');
      const root = document.querySelector(':root');
      root.style.setProperty('--background-image-url', `url(${backgroundImageUrl})`);
    } else {
      // console.log('imageHasLoaded is FALSE');
      const root = document.querySelector(':root');
      // root.style.setProperty('--background-image-url', `linear-gradient(seagreen, darkblue)`);
      root.style.setProperty('--background-image-url', `url(${previousImageUrl})`);
    }

    return (
      <div className={styles.backgroundImage}></div>
    );
  }
}
