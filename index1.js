var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var CryptoJS = require('crypto-js');
var secreteKey = 'TienNV';

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index1.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
	  console.log('message: ' + msg);
	  
	  var cText = CryptoJS.AES.encrypt(msg, secreteKey).toString();
	  
	  var plainText = CryptoJS.AES.decrypt(cText, secreteKey);
	  
	  var mess = plainText.toString(CryptoJS.enc.Utf8);
	  
	  io.emit('chat message', mess);
	  
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
