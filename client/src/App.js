import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AppBar, Toolbar } from '@material-ui/core'
import PlayerTable from './PlayerTable/PlayerTable'
import AddPlayer from './AddPlayer/AddPlayer'
import NewLink from './NewLink/NewLink'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <AppBar style={{position: 'relative'}}>
            <Toolbar>
              <NewLink location="/" text="Basketball Player Ratings" variant="h5"/>
            </Toolbar>
          </AppBar>
          <Route path="/" exact component={PlayerTable} />
          <Route path="/addPlayer" component={AddPlayer} />
        </Router>
      </div>
    )
  }
}
