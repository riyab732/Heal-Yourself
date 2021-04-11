const socket= io()

//ask user its name
let name;
//let textarea= document.querySelector('#inputmessage');
do{
  name=  prompt('Please enter your name: ')
}while(!name)

// get dom element in js variables
const form = document.getElementById('send-container');
const messageInput=document.getElementById('inputmessage');
const messageContainer=document.querySelector(".container");

//func. which will append event info to the container
const append =(message,position)=>{
const messageElement = document.createElement("div");
messageElement.innerHTML=message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.appendChild(messageElement);
}
//const name= prompt("Enter your name here");

// the form gets submitted, send server the message
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,`right`)
    socket.emit('send',message)
    messageInput.value=''
})

//if new user joined recieve event from the server
socket.emit('new-user-joined', name)

socket.on('user-joined',name =>{
  append(`${name} joined the chat`,`right`)
})

//if server send a message recieve it
socket.on('receive',data =>{
    append(`${data.name}:  ${data.message}`,`left`)
  })
//if user leave the chat ,apppend info to container
  socket.on('left',name =>{
    append(`${name} left the chat`,`left`)
  })