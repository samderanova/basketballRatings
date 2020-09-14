import React from 'react'
import { TableRow, TableCell, Icon } from '@material-ui/core'

export default function RenderPlayer(props) {
    let player = props.playerProp
    return (
        <TableRow>
          <TableCell>{player.name}</TableCell>
          <TableCell>{player.height}</TableCell>
          <TableCell>{props.teamsProp}</TableCell>
          <TableCell>
            <p style={{display: 'inline', verticalAlign: 'middle'}}>{props.votes}</p>
            <Icon onClick={_ => props.changeVote(player, "up")}>arrow_upward</Icon>
            <Icon onClick={_ => props.changeVote(player, "down")}>arrow_downward</Icon>
          </TableCell>
        </TableRow>
    )
}