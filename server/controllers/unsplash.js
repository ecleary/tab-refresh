const { createApi } = require('unsplash-js');
const fetch = require('node-fetch');
const config = require('./unsplashConfig.js');

global.fetch = fetch;

const unsplash = createApi({
  accessKey: config.ACCESS_KEY,
});

module.exports.getImages = (callback) => {
  unsplash.photos.getRandom({
    query: 'landscape',
    orientation: 'landscape',
    count: 15,
  }).then(result => {
    if (result.errors) {
      callback(result.errors[0]);
    } else {
      // console.log(result);
      callback(null, result.response);
    }
  });
};
