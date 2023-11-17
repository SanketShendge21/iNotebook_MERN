const connectToMongo = require('./db'); //importing db.js
const express = require('express')
const cors = require('cors') // importing cors.js from express to resolve CORS requests
connectToMongo(); //using connect function to connect to MongoDB

const app = express()

app.use(cors())

const port = 5000

app.use(express.json());

// Available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`)
})