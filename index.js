/*
PHASE 2 & 3
CCAPDEV S11
    Group Members: 
        Ng, Sherilyn Kaye
        Vizmanos, Julianne 
*/
var PORT = process.env.PORT || 3000;

require('dotenv').config();
const express = require('express');
const fileupload = require('express-fileupload');
const session = require('express-session');
const app = new express();
const path = require('path'); //local path directory for static resource folder
const hbs = require('hbs');
//const authRoute = require('./routes/auth');
const routes = require(`./routes/routes.js`);
const db = require(`./database/models/db.js`);
db.connect();

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(fileupload());
app.use(express.static('public'));
//app.use('/user', authRoute); //this refers to the path where the data can be accessed

app.set('views', __dirname + './views'); 
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + `/views/partials`);

app.use(session({
    secret: 'CCAPDEV-SECRET',
    resave: false,
    saveUninitialized: false,
}));

app.use(`/`, routes);

app.listen(PORT, function(){
    console.log("Node server is running at port 3000.....");
});
