const Roku = require('rokujs');
const express = require('express');
const bodyParser = require('body-parser')
const hbs = require('express-handlebars');
const app     = express();
let roku;
//setting view engine
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.listen('3000');
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ extended: false }));


console.log("im alive");

console.log(Roku.keys);


app.post('/device', (req,res)=>{

    roku = new Roku(req.body.address.slice(0,-1));
    roku.apps(function (err, apps) {
        res.render('test',{apps:apps,commands:Roku.keys});
    });

});

app.get('/', (req, res) => {

        Roku.discover(function (devices) {

            res.render('home',{devices: devices})
        });
});

app.post('/launchApp', (req,res)=>{


    roku.launch({ id: req.body.appID.slice(0,-1)}, (err) => {
        if (err) {
            console.log(err);
        }
    });

});

app.post('/press', (req,res)=>{

    roku.press(req.body.cmd.slice(0,-1));
    roku.delay(10);
});


app.post('/input', (req,res)=>{
    roku.type(req.body.input);
    roku.delay(10);
});