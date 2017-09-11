const Roku = require('rokujs');
const express = require('express');
const hbs = require('express-handlebars');
const app     = express();


//setting view engine
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.listen('3000');

console.log("im alive");

app.get('/',function (req, res) {


    Roku.discover(function (devices) {

        console.log(devices);



    });

    const roku = new Roku(devices[0].address);
    roku.apps(function (err, apps) {
        if (err){
            console.log(err);
        }
        console.log(apps);

    });

    res.render('home')
})
