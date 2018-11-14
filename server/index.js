const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const router = express.Router();
router.get("/", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});
const app = express();
app.use(router);
const server = http.createServer(app);
const io = socketIo(server);
io.on("connection", socket => {
    console.log("New client connected")
    socket.on("disconnect", () => console.log("Client disconnected"));
    socket.on('message', function (msg) {
        console.log(msg)
        io.emit("message", msg);
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));