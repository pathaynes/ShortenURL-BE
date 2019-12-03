const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  url: {
    type: String,
    unique: true
  },
  hits: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Url', schema);
