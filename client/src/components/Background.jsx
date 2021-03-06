import React, { Component } from 'react';
import styles from './styles/Background.css';

export default class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrlList: [],
      waitingUrl: '',
    };
    this.loadImage = this.loadImage.bind(this);
    this.addImgUrlToList = this.addImgUrlToList.bind(this);
    this.shortenImgUrlList = this.shortenImgUrlList.bind(this);
  }

  loadImage(backgroundImageUrl) {
    const img = new Image();
    img.onload = () => {
      this.addImgUrlToList(backgroundImageUrl);
    };
    img.src = backgroundImageUrl;
  }

  addImgUrlToList(imgUrl) {
    const imgUrlList = this.state.imgUrlList.slice();
    imgUrlList.unshift(imgUrl);
    this.setState({
      imgUrlList,
    }, () => {
      const { imgUrlList } = this.state;
      if (imgUrlList.length > 1) {
        const removeImgUrl = setTimeout(this.shortenImgUrlList, 2100);
      }
    });
  }

  shortenImgUrlList() {
    const imgUrlList = this.state.imgUrlList.slice();
    imgUrlList.pop();
    this.setState({
      imgUrlList,
    }, () => {
      const { waitingUrl } = this.state;
      if (waitingUrl.length > 0) {
        this.loadImage(waitingUrl);
        this.setState({
          waitingUrl: '',
        });
      }
    });
  }

  componentDidMount() {
    this.addImgUrlToList('about:blank');
  }

  componentDidUpdate(prevProps) {
    const { imgUrlList } = this.state;
    if (this.props.backgroundImageUrl !== prevProps.backgroundImageUrl) {
      const { backgroundImageUrl } = this.props;
      if (imgUrlList.length < 2) {
        this.loadImage(backgroundImageUrl);
      } else {
        this.setState({
          waitingUrl: backgroundImageUrl,
        });
      }
    }
  }

  render() {
    const { imgUrlList } = this.state;
    const backgroundImages = [];
    const root = document.querySelector(':root');
    imgUrlList.forEach((imgUrl, index) => {
      root.style.setProperty(
        `--background-image-url-${index}`,
        imgUrl === 'about:blank'
          ? imgUrl
          : `url(${imgUrl})`,
      );
      root.style.setProperty(`--background-image-z-index-${index}`, `calc(1 + ${index})`);
      root.style.setProperty(`--background-image-opacity-${index}`, index > 0 ? 0 : 1);
      backgroundImages.push(<div key={imgUrl} className={styles[`backgroundImage${index}`]} />);
    });

    return (
      <div>
        {backgroundImages}
      </div>
    );
  }
}
