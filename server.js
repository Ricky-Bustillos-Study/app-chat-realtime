const express = require('express');
const path = require('path');

// initialize the express app
const app = express();

// define http protocol port
const server = require('http').createServer(app);

// define wss protocol port
const io = require('socket.io')(server);

// define the folder that contains the front-end files
app.use(express.static(path.join(__dirname, 'public')));

// define the folder that contains the views files
app.set('views', path.join(__dirname, 'public'));

// define the view engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index.html');
})

server.listen(3000)