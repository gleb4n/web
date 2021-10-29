var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require("mysql2");
var mqtt = require('mqtt');

var client = mqtt.connect('mqtt://192.168.35.93:1883')

var connection = mysql.createConnection({
  host: "192.168.35.206",
  user: "root",
  password: "password",
  database: "olimp"  
});

const sql955 = "select * from tb_test where `Router` = 'RUT955' order by `Date` desc limit 1";
const sql950 = "select * from tb_test where `Router` = 'RUT950' order by `Date` desc limit 1";


        var key  = 'id';
        var key2 = 'Date';
        var key3 = 'Vr';
        var key4 = 'Router';
        var zero = 0;     
         
setInterval(async function mySql(){  connection.query(sql955, //alldata,        
          function(err, results, fields) {
             console.log('Output from database RUT955: ',results);
             console.log('');
            if(err != null){
                console.log("Error: ",err);
            } 

            let test = results;
            var myJson = JSON.stringify(test);
            returnValue(myJson);           

      // output
io.on('connection', function(socket) { 
        setInterval(function(){
         socket.send(alldata[0] + '|' +alldata[1] + '|' + alldata[2] + '|' + alldata[3] + '|');
     },1000)
});
})},3000);

setInterval(async function mySql(){  connection.query(sql950, //alldata,        
          function(err, results, fields) {
             console.log('Output from database RUT950: ',results);
             console.log('');
            if(err != null){
                console.log("Error: ",err);
            } 
            let test = results;
            var myJson = JSON.stringify(test);
            returnValue2(myJson);
            io.on('connection', function(socket) { 
            setInterval(function(){
            socket.emit('gleb', {alldata2});
               },1000)
            })
   })},3000);


setInterval( function(){
app.get('/', function(req, res) {
      res.sendfile('index.html');
      })},1000);


http.listen(3000, function() {
   console.log('listening on localhost:3000');
});


sendValue();


function sendValue(){
   var arr = [];
io.on('connection', function(socket) {
         
         socket.on('setValues', function(data) {    
         console.log("DATA1: ", data)
         arr.push(data);
         console.log("arr", arr[0], arr[1]);
         let register = Number(data)
          var topic = 'request';
         var message = '0 3 0 192.168.27.90 502 5 1 6 '+ arr[0] + ' ' + arr[1]; 
         
         client.publish(topic, message)
         console.log('Topic:',topic,' | Message sent:', message) 
         })                   
      })};

function returnValue(text){
    id = text.indexOf(key, zero)
    idSecond = text.indexOf(key2,id)
    idFind = text.slice(id + 4, idSecond - 2);
    //return idFind;
    date = text.indexOf(key2, zero)
    dateSecond = text.indexOf(key3, date)
    dateFind = text.slice(date + 7, dateSecond - 3)
   // return dateFind;
    vr = text.indexOf(key3, zero)
    vrSecond = text.indexOf(key4, vr)
    vrFind = text.slice(vr + 6, vrSecond - 4)
   // return vrFind;
    router = text.indexOf(key4, zero)
    routerSecond = text.indexOf(']', router)
    routerFind = text.slice(router + 9, routerSecond - 2)
    //return routerFind;
    alldata = [idFind, dateFind, vrFind, routerFind];
    return idFind,dateFind,vrFind,routerFind,alldata;
}

function returnValue2(text){
    id = text.indexOf(key, zero)
    idSecond = text.indexOf(key2,id)
    idFind2 = text.slice(id + 4, idSecond - 2);
    //return idFind;
    date = text.indexOf(key2, zero)
    dateSecond = text.indexOf(key3, date)
    dateFind2 = text.slice(date + 7, dateSecond - 3)
   // return dateFind;
    vr = text.indexOf(key3, zero)
    vrSecond = text.indexOf(key4, vr)
    vrFind2 = text.slice(vr + 6, vrSecond - 4)
   // return vrFind;
    router = text.indexOf(key4, zero)
    routerSecond = text.indexOf(']', router)
    routerFind2 = text.slice(router + 9, routerSecond - 2)
    //return routerFind;
    alldata2 = [idFind2, dateFind2, vrFind2, routerFind2];
    return idFind2,dateFind2,vrFind2,routerFind2,alldata2;
}