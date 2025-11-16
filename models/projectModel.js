const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  role: String,
  summary: String,
  image: String,
  impact: [String], // An array of strings
  tech: String,
  github: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);