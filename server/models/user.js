const mongoose = require('../../database');
const { Schema } = mongoose;

const userSchema = new Schema({
  background: { type: String, required: true, default: 'dark' },
  backgroundImage: { type: String },
  images: [
    {
      hostUrlOrig: { type: String },
      hostUrlThumb: { type: String },
      backupUrlOrig: { type: String },
      backupUrlThumb: { type: String },
    },
  ],
  timezone: { type: String },
  clockPosition: { type: String, default: 'middle' },
  clockDisplay: { type: String, default: 'light' },
  thermoLocation: { type: String },
  thermoUnits: { type: String, default: 'fahrenheit' },
  thermoDisplay: { type: String, default: 'light' },
});

const User = module.exports.User = mongoose.model('User', userSchema);

module.exports.getBackgroundImageData = (userId, callback) => {
  User.findOne({ _id: userId })
    .then((res) => callback(null, res.backgroundImage))
    .catch(callback);
};

module.exports.setBackgroundImage = (userId, url, callback) => {
  User.updateOne({ _id: userId }, { backgroundImage: url })
    .then((res) => callback(null, res))
    .catch(callback);
};
