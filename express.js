// script for server side

const express = require("express");
const app = express();
// express server
const server = require("http").Server(app);
const path = require("path");

// create server socket
const io = require("socket.io")(server);
// serve static assets to client
app.use(express.static("public"));


io.on("connection",function(socket)
{
    socket.on("size",function(size)
    {
        socket.broadcast.emit("onsize",size);
    });
    socket.on("color", function(color) {
        socket.broadcast.emit("oncolor", color);
    });
    socket.on("toolchange", function(tool) {
        socket.broadcast.emit("ontoolchange", tool);
    });
    socket.on("hamburger", function() {
        socket.broadcast.emit("onhamburger");
    });
    socket.on("mousedown", function(point) {
        socket.broadcast.emit("onmousedown", point);
    });
    socket.on("mousemove", function(point) {
        socket.broadcast.emit("onmousemove", point);
    });
    socket.on("undo", function() {
        socket.broadcast.emit("onundo");
    });
    socket.on("redo", function() {
        socket.broadcast.emit("onredo");
    });
});

const port = process.env.PORT || 3000;
server.listen(port, function(req, res) {
    console.log("Server has started at port 3000");
});