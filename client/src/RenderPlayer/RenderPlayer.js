import React from 'react'
import { TableRow, TableCell, Icon } from '@material-ui/core'

export default function RenderPlayer(props) {
    let player = props.playerProp
    return (
        <TableRow>
          <TableCell>{player.name}</TableCell>
          <TableCell>{player.height}</TableCell>
          <TableCell>{props.teamProp}</TableCell>
          <TableCell>
            <p style={{display: 'inline', verticalAlign: 'middle'}}>{props.votes}</p>
            <Icon id="up" onClick={_ => props.changeVote(player, "up")}>arrow_upward</Icon>
            <Icon id="down" onClick={_ => props.changeVote(player, "down")}>arrow_downward</Icon>
          </TableCell>
        </TableRow>
    )
}