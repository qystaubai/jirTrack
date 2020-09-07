const express = require('express');
const app = express();
const checkAuth = require('./middlewares/checkAuth.middleware')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

const config = require('./config/config');

const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/user', checkAuth, require('./routes/user.route'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

async function start() {
    try {
        await mongoose.connect(config.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        app.listen(PORT, () => {console.log("app has been started")})
    } catch (e) {
        console.log("server error", e.message)
        process.exit(1)
    }

}

start()
