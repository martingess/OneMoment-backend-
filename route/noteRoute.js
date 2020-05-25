const express = require('express');
const router = express.Router();
const {createNote, getNote} = require('../controller/noteController');
router.route('/')
  .post(createNote)

router.route('/:token')
  .get(getNote)

module.exports = router;