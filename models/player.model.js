const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema({
    name: {type: String, required: true},
    height: {type: Number, required: true},
    team: {type: String, required: true},
    votes: {type: Number, required: false}
})

const Player = mongoose.model('Player', playerSchema)
module.exports = Player