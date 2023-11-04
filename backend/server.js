const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const {errorHandler} = require('./middlewares/errormiddleware');
const port = process.env.PORT;
var cors = require('cors');

connectDB();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));


app.use(errorHandler);

app.listen(port, () => { console.log(`Server is running on port: ${port}`)});
