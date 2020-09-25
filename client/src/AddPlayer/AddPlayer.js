import React from 'react'
import { Paper, FormControl, InputLabel, Input } from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.css'
import { url } from '../index'
import AlertUser from '../AlertUser/AlertUser'
import './AddPlayer.scss'

const axios = require('axios')

export default class AddPlayer extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            height: 0,
            team: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        // updates the respective state on any change
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit() {
        // pulls all players and iterates through them to see if the player has already been added
        axios.get(`${url}/api/players/`)
            .then(res => {
                for (var player of res.data) {
                    if (player.name === this.state.name) {
                        AlertUser("error", "Uh Oh!", "This player has already been added!")
                        return
                    }
                }
            })
        // sends POST request to add the new player
        axios.post(`${url}/api/players/addPlayer`, {
            name: this.state.name,
            height: this.state.height,
            team: this.state.team
        })
            .then(_ => {
                AlertUser("success", "Success!", "Player Added!")
                setInterval(window.location.reload(), 1000)
            })
            .catch(_ => {
                if (this.state.name === '' || this.state.team === '') {
                    AlertUser("error", "Uh Oh!", "Make sure to fill in every field!")
                }
                else {
                    AlertUser("error", "Uh Oh!", "Something went wrong!")
                }
            })

    }
    render() {
        return (
            <div>
                <div className="AddPlayer" id="AddPlayer">
                    <Paper>
                        <h3>Player Information</h3>
                        <form>
                            <FormControl>
                                <InputLabel htmlFor="my-input">Player Name</InputLabel>
                                <Input name="name" aria-describedby="my-helper-text" onChange={this.handleChange}/>
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="my-input">Player Height</InputLabel>
                                <Input name="height" type="number" aria-describedby="my-helper-text" onChange={this.handleChange} />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="my-input">Current Team</InputLabel>
                                <Input name="team" aria-describedby="my-helper-text" onChange={this.handleChange}/>
                            </FormControl>
                        </form>
                        <button className="btn btn-primary" type="submit" id="add" onClick={this.handleSubmit}>Submit</button>
                    </Paper>
                </div>
                <div id="successOrFail"></div>
            </div>
        )
    }
}