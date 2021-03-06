// const { createApi } = require('unsplash-js');
// const fetch = require('node-fetch');
const config = require('./unsplashConfig.js');
const axios = require('axios');

// global.fetch = fetch;

const QUERY = 'landscape';
const ORIENTATION = 'landscape';
const COUNT = '30';
// const url = `https://api.unsplash.com/photos/random?query=${QUERY}&orientation=${ORIENTATION}&count=${COUNT}`;
const url = `https://api.unsplash.com/search/photos?query=${QUERY}&orientation=${ORIENTATION}&per_page=${COUNT}`;
// const url = `https://api.unsplash.com/search/photos?query=${QUERY}&orientation=${ORIENTATION}`;

module.exports.getImages = (callback) => {
  axios({
    url: url,
    method: 'get',
    headers: {
      Authorization: `Client-ID ${config.ACCESS_KEY}`,
    },
  }).then((res) => {
    const data = {
      // data: res.data,
      data: res.data.results,
      xRatelimitRemaining: res.headers['x-ratelimit-remaining'],
    };
    callback(null, data);
  }).catch(callback);
};

// const unsplash = createApi({
//   accessKey: config.ACCESS_KEY,
// });

// module.exports.getImages = (callback) => {
//   unsplash.photos.getRandom({
//     query: 'landscape',
//     orientation: 'landscape',
//     count: 15,
//   }).then(result => {
//     if (result.errors) {
//       callback(result.errors[0]);
//     } else {
//       // console.log(result);
//       callback(null, result.response);
//     }
//   });
// };
