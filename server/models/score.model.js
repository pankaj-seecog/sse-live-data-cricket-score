var mongoose = require('mongoose');

var scoreSchema = mongoose.Schema({
    playername : String,
    playerscore : Number
});

module.exports = mongoose.model('score',scoreSchema);