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

module.exports.User = mongoose.model('User', userSchema);
