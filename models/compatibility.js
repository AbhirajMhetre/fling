
const mongoose = require('mongoose');

const CompatibilitySchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  CompatibilityPercentage:{
      type: Number,
      default: 0
  }

});

module.exports = mongoose.model('compatibility', CompatibilitySchema);