const express = require('express')
const app =express()
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3000;


http.listen(PORT, () => {
    console.log(`Socket.IO server running at http://localhost:${PORT}/`);
  })

  app.use(express.static(__dirname+'/public'));
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index2.html');
    
  })
  app.use(express.static(__dirname+'/index.html'));
  //socket

const io = require('socket.io')(http)

io.on('connection', socket =>{
    console.log('connected..');
 })


 //testing
 const users = {};

io.on('connection', socket =>{  
    //if user joins, let other people to know
    socket.on('new-user-joined',name =>{ 
        console.log("newuser", name) ;
         users[socket.id]=name;
         socket.broadcast.emit('user-joined',name);
        })
        //if someone sends message , broadcast it to other people
        socket.on('send',message => {
            socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
        })

        //if someone live chat  , broadcast it to other people
        socket.on('disconnect',message => {
            socket.broadcast.emit('left', users[socket.id])
            delete users[socket.id];
        })
})