const express = require("express");
const expressWs = require("express-ws");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();
// decorate the app instance with express-ws to have it
// implement websockets
expressWs(app);
console.log("starting server...");

// Create a new set to hold each clients socket connection
const connections = new Set();

// We define a handler that will be called everytime a new
// Websocket connection is made
const wsHandler = (ws) => {
  connections.add(ws);

  // We define the handler to be called everytime this
  // connection receives a new message from the client
  ws.on("message", async (message) => {
    const post = JSON.parse(message);

    //save posts in prisma sqLite DB
    await prisma.post.create({
      data: {
        message: post.message,
        user: post.user,
      },
    });

    // Once we receive a message, we send it to all clients
    // in the connection set
    connections.forEach((conn) => conn.send(message));
  });

  ws.on("close", () => {
    connections.delete(ws);
  });
};

app.ws("/post", wsHandler);

app.get(`/post`, async (req, res) => {
  const result = await prisma.post.findMany();
  res.json(result);
});

app.use(express.static("build"));

// start the server, listening to port 8080
app.listen(8080);
