const Note = require('../model/noteModel');
function oldNoteCleaner (queryIntervaltMs) {
  setInterval(async ()=>{
    const notes = Note.find({expirationDate: {$lte: Date.now()}});
    await notes.remove();
  }, queryIntervaltMs);
}

module.exports = oldNoteCleaner;