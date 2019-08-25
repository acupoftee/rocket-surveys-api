const mongoose = require('mongoose')

const promptSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating'
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Prompt', promptSchema)
