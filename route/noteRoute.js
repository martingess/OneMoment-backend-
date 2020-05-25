const express = require('express');
const router = express.Router();
const {createNote, getNote, deleteNote} = require('../controller/noteController');
router.route('/')
  .post(createNote)

router.route('/:token')
  .delete(deleteNote)
  .get(getNote)
module.exports = router;