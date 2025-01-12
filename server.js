var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

var users = [];
var connections = [];

// Serve static files
app.use(express.static(__dirname));

// Start server
server.listen(3000, function() {
    console.log("Server listening on port 3000");
});

// Serve HTML file
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

// Socket.IO connection
io.sockets.on("connection", function(socket) {
    connections.push(socket);
    console.log("Connected: %s socket(s) connected", connections.length);

    // Disconnect
    socket.on("disconnect", function() {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected: %s socket(s) connected", connections.length);
    });

    // Send message
    socket.on("send message", function(data) {
        console.log(data);
        io.sockets.emit("new message", { msg: data });
    });
});
