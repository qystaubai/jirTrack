// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const checkAuth = require('./middlewares/checkAuth.middleware')

const PORT = process.env.PORT || 8080; // Step 1

const routes = require('./routes/api');

// Step 2
mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
});

// Data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// Step 3

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


// HTTP request logger
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/user', checkAuth, require('./routes/user.route'))




app.listen(PORT, console.log(`Server is starting at ${PORT}`));