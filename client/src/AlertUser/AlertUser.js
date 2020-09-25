import React from 'react'
import ReactDOM from 'react-dom'
import { Alert, AlertTitle } from '@material-ui/lab'

export default function AlertUser(successOrFailure, title, text) {
    ReactDOM.render(        
        <Alert severity={successOrFailure} style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <AlertTitle>{title}</AlertTitle>
            {text}
        </Alert>
    , document.getElementById('successOrFail'))
  }