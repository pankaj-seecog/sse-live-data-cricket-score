var express = require('express');
var mongoose = require('mongoose');
var app = express();
var route = express.Router();
var Score = require('./models/score.model.js');
var connections = [];
var cors = require('cors');

var  white = ['http://localhost:4200'];
var corsOptions = {
    origin : function(origin,callback){
        var isWhiteListed = white.indexOf(origin) !== -1;
        callback(null,isWhiteListed);
    },
    credentials : true
}

app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost/cricket',function(err,res){
    if(err)
        console.log(err);
    else
        console.log('Database started');
});

app.use('/api',route);

route.get('/records',function(req,res){
    res.socket.setTimeout(5555555555);
    res.writeHead(200,{
        'content-type' : 'text/event-stream',
        'cache-control' : 'no-cache',
        'connection' : 'keep-alive'
    })
    res.write('\n');
    connections.push(res);
});

setInterval(function(){
    for(let i = 0; i < connections.length; i++){
        let re = connections[i];
        var dt = new Date();
        Score.find({},function(err,scoreData){
            if(err){
                console.log(err);
            }else{
                console.log(scoreData);
                // re.write(`data:${dt.getMilliseconds()} \n\n`);
                re.write(`data:${JSON.stringify(scoreData)} \n\n`);
            }
        });
    }
},1000);

app.listen(3001,function(err,res){
    if(err)
        console.log(err);
    else
        console.log('server started');
});

