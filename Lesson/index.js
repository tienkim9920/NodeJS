const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var db = require('./db');
var usersRoute = require('./routes/users.route');
var usersAuth = require('./routes/auth.route');

const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index')
});

app.use('/auth', usersAuth);
app.use('/users', usersRoute);



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));