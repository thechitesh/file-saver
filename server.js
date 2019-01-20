var express = require("express");
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get("/comments", (req, res, next) => {

    var data = '';
    fs.readFile('comments.json', 'utf8', function (err, content) {
        if (err) throw err;
        res.end( content );
    });
});

app.post('/comments', function(req, res){
    var comment = req.body;
    fs.readFile('comments.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        var obj = JSON.parse(data); //now it an object   
        var idx = obj.comments.length + 1;
        comment.id = idx;
        obj.comments.push(comment); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('comments.json', json, 'utf8', function(err){

            if(err) throw err;
            console.log('saved');
            }); // write it back 
        }

    });


    res.json({message: "comment is added"});
 });

app.listen(1234, () => {
 console.log("Server running on port 1234");
});