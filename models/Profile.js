const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  profilePicture: {
    type: String
  },
  coverPhoto: {
    type: String
  },
  genderInterestedIn: {
    type: String
  },
  age: {
    type: Number
  },
  caste:{
    type: String
  },
  college: {
    type: String
  },
  fieldOfStudy: {
    type: String
  },
  favoritesitecom: {
    type: String
  },
  favoriteseries: {
    type: String
  },
  height: {
    type: Number
  },
  virginity:{
    type: String
  },
  dogOrCat: {
    type: String
  },
  whatVert: {
    type: String
  },
  politics: {
    type: String
  },
  religion: {
    type: String
  },
  drinker: {
    type: String
  },
  smoker: {
    type: String
  },
  cooking: {
    type: String
  },
  poessesive: {
    type: String
  },
  chatOrCall: {
    type: String
  },
  reading: {
    type: String
  },
  travel: {
    type: String
  },
  spendNight: {
    type: String
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);