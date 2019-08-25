const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
  answer: {
    type: Number,
    min: 1,
    max: 5
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Rating', ratingSchema)
