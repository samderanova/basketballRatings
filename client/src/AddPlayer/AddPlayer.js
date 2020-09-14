import React from 'react'
import { Paper, FormControl, InputLabel, Input } from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.css'
import './AddPlayer.scss'

const axios = require('axios')
export default class AddPlayer extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            height: 0,
            teams: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.addNewTeam = this.addNewTeam.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    addNewTeam() {
        document.getElementById('newTeams').append(
            <FormControl>
                <Input name="teams" aria-describedby="my-helper-text" onChange={this.handleChange}/>
            </FormControl>
        )
    }
    handleChange(e) {
        if (e.target.name === "teams") {
            let teamListElements = document.querySelectorAll('Input[name=teams]')
            this.setState(_ => {
                var newTeams = []
                for (var team of teamListElements) { newTeams.push(team.value) }
                return {teams: newTeams}
            })
        }
        else this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit(e) {
        axios.post('http://localhost:5000/api/players/addPlayer', {
            name: this.state.name,
            height: this.state.height,
            teams: this.state.teams
        })
            .then(_ => alert('Player Submitted!'))
            .catch(err => console.log(err))
    }
    render() {
        return (
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
                        <label style={{textAlign: 'center'}}>Player Teams</label>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Player Teams</InputLabel>
                            <Input name="teams" aria-describedby="my-helper-text" onChange={this.handleChange}/>
                        </FormControl>
                    </form>
                    <button className="btn btn-primary" onClick={this.addNewTeam}>Add New Team</button>
                    <div id="newTeams"></div>
                    <button className="btn btn-primary" type="submit" id="add" onClick={this.handleSubmit}>Submit</button>
                </Paper>
            </div>
        )
    }
}