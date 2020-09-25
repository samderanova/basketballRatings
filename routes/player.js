const router = require('express').Router()
const Player = require('../models/player.model')

const routes = ['/', '/:id', '/addPlayer', '/removePlayer/:id', '/editPlayer/:id']

router.route(routes[0]).get((req, res) => {
    Player.find()
        .then(player => res.json(player))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route(routes[1]).get((req, res) => {
    Player.findById(req.params.id)
        .then(player => res.json(player))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route(routes[2]).post((req, res) => {
    const name = req.body.name, height = req.body.height, team = req.body.team, votes = 0
    const newPlayer = new Player({name, height, team, votes})
    newPlayer.save()
        .then(_ => res.json('Player added!'))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route(routes[3]).delete((req, res) => {
    Player.findByIdAndDelete(req.params.id)
        .then(_ => res.json('Player deleted!'))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route(routes[4]).post((req, res) => {
    Player.findById(req.params.id)
        .then(player => {
            player.name = req.body.name
            player.height = req.body.height
            player.team = req.body.team
            player.votes = req.body.votes
            player.save()
                .then(_ => res.json('Player edited!'))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})


module.exports = router