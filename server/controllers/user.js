const user = require('../models/user.js');

module.exports.getBackgroundImageData = (req, res, next) => {
  const { userId } = req.params;
  user.getBackgroundImageData(userId, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports.setBackgroundImage = (req, res, next) => {
  const { userId } = req.params;
  const { url } = req.body;
  user.setBackgroundImage(userId, url, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};
