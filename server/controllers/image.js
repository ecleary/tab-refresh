const unsplash = require('./unsplash.js');

module.exports.getImages = (req, res, next) => {
  unsplash.getImages((err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};
