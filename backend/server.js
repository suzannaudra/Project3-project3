const express = require('express');
const cors = require('cors');
const mongoos = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Did NOT enter any URL or details into .env file yet
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection established successfully")
});

const toysRouter = require('./routes/toys');
const usersRouter = require('./routes/users');

app.use('/toys', toysRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})