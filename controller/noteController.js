const Note = require('../model/noteModel');
const createString = require('../helpers/createString');
const CryptoJS = require("crypto-js");
const MomentToken = require('../utils/momentToken')

exports.createNote = async (req, res) => {
  try {
    if (!req.body.data) throw 'Data is not specified';
    const userUnencryptedData = req.body.data;
    const {
      password,
      id
    } = MomentToken.create();
    const ciphertext = CryptoJS.AES.encrypt(userUnencryptedData, password).toString();
    const note = new Note({
      textValidationSignature: CryptoJS.SHA256(userUnencryptedData, password),
      secretData: ciphertext,
      creationDate: Date.now(),
      _id: id
    });
    await note.save();

    res.json({
      success: true,
      message: 'note created',
      data: {
        url: `${id}${password}`
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: 'Some error occured',
      data: {}
    })
  }
}

exports.getNote = async (req, res) => {
  try {
    //find note
    const token = req.params.token;
    const {
      id,
      password
    } = MomentToken.decrypt(token);
    const note = await Note.findOne({
      _id: id
    });
    if (!note) throw 'Note not found';

    //decrypt note
    const decryptedText = CryptoJS.AES.decrypt(note.secretData, password).toString(CryptoJS.enc.Utf8);
    if(CryptoJS.SHA256(decryptedText, password).toString() !== note.textValidationSignature) throw 'Password is incorrect'
    await note.remove();
    res.json({
      success: true,
      message: "Note decrypted",
      data: {
        message: decryptedText
      }
    })
  } catch (err) {
    res.json({
      success: false,
      message: err,
      data: {}
    })
  }
}