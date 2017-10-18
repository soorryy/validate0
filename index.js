var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){	//只要偵測到'chat message'事件發生
    io.emit('chat message', msg);			//發送給所有連線進來的socket 內容為msg
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
