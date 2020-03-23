const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const app = express();
const server = http.createServer(app);
const io = socketIo(server); //io = socketio.http.app(express)

const indexRoute = require("./routes/index");

app.use(indexRoute);

const port = 4001;
const url =
  "https://api.darksky.net/forecast/371e8448409d5220717714842a112d95/23.8103,90.4125";

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(url);
    socket.emit("FromApi", res.data.currently.temperature);
  } catch (err) {
    console.error(`Error: ${err.code}`);
  }
};

let interval;

io.on("connection", socket => {
  console.log("New client connected");

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    getApiAndEmit(socket);
  }, 10000);

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Listening on port no ${port}`);
});
