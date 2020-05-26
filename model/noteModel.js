const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: напилить возможность задания пароля
const noteSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  creationDate: Number,
  isOpenedDate: Number,
  textValidationSignature: {
    required: true,
    type: String
  },
  secretData: {
    required: true,
    type: String
  },
  expirationDate: {
    type: Number
  }
});

const noteModel = mongoose.model('note', noteSchema);

module.exports = noteModel;
