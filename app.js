const Roku = require('rokujs');
const express = require('express');
const hbs = require('express-handlebars');
const app     = express();


//setting view engine
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.listen('3000');

console.log("im alive");

app.get('/', (req, res) => {

    let dev = {};
    let devTest = {
        "1":"test1",
        "2":"test2"

    };
    
    Roku.discover(function (devices) {

        console.log(devices);

        dev = devices;

    });



    res.render('home',{devices: devTest})
});

app.post('/device', (req,res)=>{


});
