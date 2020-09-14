import React from 'react'
import { Icon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import RenderPlayer from '../RenderPlayer/RenderPlayer'
import './PlayerTable.scss'

export default class PlayerTable extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      players: [],
      votes: []
    }
    this.changeVote = this.changeVote.bind(this)
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/players')
      .then(res => this.setState({
        isLoading: false,
        players: res.data,
        votes: res.data.map(player => player.votes)
      }))
      .catch(err => console.log(err))
  }
  changeVote(player, upOrDown) {
    axios.post(`http://localhost:5000/api/players/editPlayer/${player._id}`, {
      name: player.name,
      height: player.height,
      teams: player.teams,
      votes: upOrDown === "up" ? player.votes + 1 : player.votes - 1
    })
      .then(_ => window.location.reload())
      .catch(err => console.log(err))
  }
  render() {
    var rows = []
    for (var i=0; i<this.state.players.length; i++) {
      var player = this.state.players[i]
      var teams = player.teams.map(team => <p style={{margin: 0}} key={team}>{team}</p>)
      rows.push(
        <RenderPlayer 
          key={i}
          playerProp={player}
          teamsProp={teams}
          votes={this.state.votes[i]}
          changeVote={this.changeVote}
        />
      )
    }
    return (
      <div className="PlayerTable">
        { 
          this.state.isLoading ? 
          <CircularProgress style={{display: 'block', margin: '20px auto'}}/>
          :
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><h3>Player</h3></TableCell>
                  <TableCell><h3>Height (in)</h3></TableCell>
                  <TableCell><h3>Team(s)</h3></TableCell>
                  <TableCell><h3>Ranking</h3></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows}
              </TableBody>
            </Table>
          </TableContainer>
        }
        <div className="addPlayer">
          <Icon color="secondary">add_circle</Icon>
        </div>
      </div>
    )
  }
}
