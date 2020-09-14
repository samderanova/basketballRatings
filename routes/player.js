const router = require('express').Router()
const Player = require('../models/player.model')

router.route('/').get((req, res) => {
    Player.find()
        .then(player => res.json(player))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/:id').get((req, res) => {
    Player.findById(req.params.id)
        .then(player => res.json(player))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/addPlayer').post((req, res) => {
    const name = req.body.name, height = req.body.height, teams = req.body.teams, votes = 0
    const newPlayer = new Player({name, height, teams, votes})
    newPlayer.save()
        .then(_ => res.json('Player added!'))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/removePlayer/:id').delete((req, res) => {
    Player.findByIdAndDelete(req.params.id)
        .then(_ => res.json('Player deleted!'))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/editPlayer/:id').post((req, res) => {
    Player.findById(req.params.id)
        .then(player => {
            player.name = req.body.name
            player.height = req.body.height
            player.teams = req.body.teams
            player.votes = req.body.votes
            player.save()
                .then(_ => res.json('Player edited!'))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})


module.exports = router