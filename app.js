const express = require('express')
const mongoose = require('mongoose')
const port = 8000;
mongoose.connect("mongodb://127.0.0.1/CRUD", {useNewUrlParser:true});

const app = express()

mongoose.connection.on('open', () => {
    console.log('Connected Successfully...')
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const myRouter = require('./routes/myRoute');
app.use('/user', myRouter);

app.listen(port, () => {
    console.log(`Server successfully started on port: ${port}`)
})