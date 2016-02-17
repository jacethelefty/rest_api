var mongoose = require('mongoose');

var republicanSchema = new mongoose.Schema({
  party: {type: String, default: 'Republican'},
  name: {type: String, trim: true, unique: true, required: true},
  email: {type: String, index: true, match: /.+\@.+\..+/},
  gender: {type: String, enum: ['Male', 'Female']},
  cityFrom: {type: String},
  prevExper: {type: Boolean},
  age: {type: Number, min: 18},
  living: {type: Boolean},
  money: {type: Number}
});

module.exports = mongoose.model("repPolitician", republicanSchema);
