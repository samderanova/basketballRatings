import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, 
  CircularProgress } from '@material-ui/core'
import axios from 'axios'
import RenderPlayer from '../RenderPlayer/RenderPlayer'
import { url } from '../index'
import AlertUser from '../AlertUser/AlertUser'
import './PlayerTable.scss'

export default class PlayerTable extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true, // display CircularProgress when pulling and rendering data from backend
      players: [], // array of players pulled from backend
      votes: [], // the number of votes for each player stored in an array
    }
    this.changeVote = this.changeVote.bind(this)
  }
  componentDidMount() {
    // get all players from MongoDB database
    axios.get(`${url}/api/players`)
      .then(res => { 
        res.data.sort((first, second) => first.votes - second.votes).reverse()
        this.setState({
          isLoading: false,
          players: res.data,
          votes: res.data.map(player => player.votes)
        })
    })
      .catch(err => console.log(err))
  }
  changeVote(player, upOrDown) {
    //first check local storage to see if they have already voted for this player
    if (localStorage.getItem(player.name) === "up" && upOrDown === "up") {
      AlertUser("error", "Uh oh!", "You can't upvote more than once!")
      return
    }
    else if (localStorage.getItem(player.name) === "down" && upOrDown === "down") {
      AlertUser("error", "Uh oh!", "You can't downvote more than once!")
      return
    }
    else if (player.votes === 0 && upOrDown === "down") {
      AlertUser("error", "Uh oh!", "Negative votes aren't allowed!")
      return
    }
    else {
      // send POST request updating the vote number and set "player_name: up || down" in local storage
      axios.post(`${url}/api/players/editPlayer/${player._id}`, {
        name: player.name,
        height: player.height,
        team: player.team,
        votes: upOrDown === "up" ? player.votes + 1 : player.votes - 1
      })
        .then(_ => {
          if (upOrDown === "up") {
            if (localStorage.getItem(player.name) === "down") localStorage.removeItem(player.name)
            else localStorage.setItem(player.name, "up")
          }
          else {
            if (localStorage.getItem(player.name) === "up") localStorage.removeItem(player.name)
            else localStorage.setItem(player.name, "down")
          }
          window.location.reload() // reloads page for changes to take effect on the user screen
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    /* render table rows*/
    var rows = []
    for (var i=0; i<this.state.players.length; i++) {
      var player = this.state.players[i]
      rows.push(
        <RenderPlayer 
          key={i}
          playerProp={player}
          teamProp={player.team}
          votes={this.state.votes[i]}
          changeVote={this.changeVote}
        />
      )
    }
    return (
      <div>
        <div className="PlayerTable">
          { 
            this.state.isLoading ? 
            <CircularProgress style={{display: 'block', margin: '20px auto'}}/>
            :
            <div>
              <div className="introduction">
                <h2>Welcome to the Basketball Player Ratings website!</h2>
                <p>The list with players from the NBA are below. If there is a player you would like to
                  see on the list and currently isn't on it, you can add them. Once you've added the ones
                  you like, you can upvote or downvote them. Naturally, players will be ranked by the number
                  of votes they have.
                </p>
                <p>Before you do anything, <b>please keep in mind</b> that the number of votes a player 
                has on this website does not determine their potential.</p>
                <p>With that said, have fun!</p>
              </div>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><h3>Player</h3></TableCell>
                      <TableCell><h3>Height (in)</h3></TableCell>
                      <TableCell><h3>Current Team</h3></TableCell>
                      <TableCell><h3>Ranking</h3></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          }
          <Link to={"/addPlayer"}>
            <Icon color="secondary" id="addPlayerBtn">add_circle</Icon>  
          </Link>
        </div>
        <div id="successOrFail"></div> {/* used to display any errors */}
      </div>
    )
  }
}
