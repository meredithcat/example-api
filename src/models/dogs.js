const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: Replace this with actual model

const DogSchema = new Schema({
  name: { type: String, required: true },
  breed: { type: String },
  color: { type: String }
})

Dog = mongoose.model('Dog', DogSchema);

module.exports = Dog;