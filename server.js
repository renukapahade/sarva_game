const express = require("express");
const socket = require("socket.io");

// Server setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server);

//Store the User rooms
const activeUsersMap = {};


//Socket connection
io.on("connection", function (socket) {

  //When a new connection is made, create a new room
  socket.on("new_user", function (data) {
    console.log("New socket connection");
    socket.userId = data;
    socket.join(data); // We are using room of socket io
    activeUsersMap[data]={lives:3,score:0};
    console.log("New user: " + data);
    console.log("------------------------------------");
  });

  //When a new key is requested from a specific user generate a random key between a-z
  socket.on("get_display_key", function (data) {
    io.to(data).emit("display_key",String.fromCharCode(97+Math.floor(Math.random() * 26)),activeUsersMap[data].score,activeUsersMap[data].lives);
  });

  //Update the score of a particular user when a keypress is performed by the client
  socket.on("update_score", function (data, key_pressed, actual_key) {

    //Update the score/lives as per the input of a user
    if (key_pressed !== "" && key_pressed == actual_key){
      ++activeUsersMap[data].score;
    }
    else if(key_pressed !== "" && key_pressed !== actual_key){
      --activeUsersMap[data].score;
    }
    else {
      --activeUsersMap[data].lives;
    }

    //Emit an event according to the state of the game.
    if (activeUsersMap[data].lives < 1){
      io.to(data).emit("game_over",activeUsersMap[data].score,activeUsersMap[data].lives);
    }else{
      io.to(data).emit("display_key",String.fromCharCode(97+Math.floor(Math.random() * 26)),activeUsersMap[data].score,activeUsersMap[data].lives);
    }
  });

  //when a connection is deleted update the Hashmap
  socket.on("disconnect", () => {
    delete activeUsersMap[socket.userId];
  });

});