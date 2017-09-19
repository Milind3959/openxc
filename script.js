var express = require('express');
var mysql = require ('mysql');
var app = express();
var bodyParser = require("body-parser");

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'openxc'
});

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Body parser use JSON data


connection.connect(function(error){
    if(!!error){
        console.log('Error');
    }else{
        console.log('connected');
    }
})

app.get('/', function(req,res){
    
    //about mysql
    connection.query("SELECT * FROM openxc", function(error,rows,fields){
        if(!!error){
            console.log('Error in the query');
        }else{
            // console.log('successful query'); 
            
            console.log(rows);
            res.json(rows);
        }
    });
});

app.post('/', function(req,res){
    // console.log("added");
    var id = req.body.id;
    var rpm = req.body.rpm;
    console.log(id);
    

    res
        .status(200)
        .json(rpm);
   
    
    //about mysql
   connection.query("INSERT INTO openxc(rpm,userid) VALUES (?,1)",rpm, function(error,rows,fields){
        

        if(!!error){
            console.log(error);
        }else{
            console.log('successful query'); 
            console.log("added");
            
        }
    });
});

app.listen(8080);
