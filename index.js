const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
const connection = mongoose.connection
connection.once('open', _ => console.log('Successfully connected to MongoDB database'))

const playerRouter = require('./routes/player')
app.use('/api/players', playerRouter)

app.listen(port, _ => console.log(`Server running on ${port}`))