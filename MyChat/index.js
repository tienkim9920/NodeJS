const express = require('express');
var bodyParser = require('body-parser');

var routeChat = require('./routes/chat.route');

const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/chat', routeChat);


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));