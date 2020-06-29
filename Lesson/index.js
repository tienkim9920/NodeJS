const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var session = require('./middleware/session.middleware');

var usersRoute = require('./routes/users.route');
var usersAuth = require('./routes/auth.route');
var products = require('./routes/products.route');
var addCart = require('./routes/cart.route');

const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'));
app.use(cookieParser('ahdsjasdhjkashdsdf099'));
app.use(session);

app.get('/', (req, res) => {
    res.render('index')
});

app.use('/auth', usersAuth);
app.use('/users', usersRoute);
app.use('/products', products);
app.use('/cart', addCart);


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));