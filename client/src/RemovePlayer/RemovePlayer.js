import React from 'react'
import ReactDOM from 'react-dom'
import { Alert, AlertTitle } from '@material-ui/lab'
import { FormControl, InputLabel, Input } from '@material-ui/core' 
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

const styles = {
    position: 'absolute',
    bottom: 0,
    width: '100%'
}

function AlertUser(successOrFailure, title, text) {
    ReactDOM.render(        
        <Alert severity={successOrFailure} style={styles}>
            <AlertTitle>{title}</AlertTitle>
            {text}
        </Alert>
    , document.getElementById('successOrFail'))
}

export default class RemovePlayer extends React.Component {
    constructor() {
        super()
        this.state = {
            input: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit(e) {
        axios.get('http://localhost:5000/api/players/')
            .then(res => {
                for (var playerObj of res.data) {
                    if (playerObj.name === this.state.input) {
                        axios.delete(`http://localhost:5000/api/players/removePlayer/${playerObj._id}`)
                            .then(_ => AlertUser("success", "Success!", "Player Removed!"))
                            .catch(err => {
                                console.log(`Error: ${err}`)
                                AlertUser("error", "Uh oh!", "Something went wrong. Try entering another player!")
                            })
                        return
                    }
                }
                AlertUser("error", "Uh oh!", "That player doesn't exist.")
            })
            .catch(err => console.log(`Error: ${err}`))
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <div>
                <form>
                    <FormControl>
                        <InputLabel>Player Name</InputLabel>
                        <Input name="input" aria-describedby="my-helper-text" onChange={this.handleChange}/>
                    </FormControl>
                </form>
                <button 
                    id="remove"
                    name="input"
                    className="btn btn-primary"
                    onClick={this.handleSubmit}>Submit
                </button>
                <div id="successOrFail"></div>
            </div>
        )
    }
}