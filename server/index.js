const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const { setSocket } = require("./socket/SetSockets");
const mainRoute = require('./routes/mainRoute');
let dotenv = require('dotenv');
const createConnectionToDataBase = require("./database/connectToMongoDB");


//middlewares
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", 'OPTIONS'],
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/api', mainRoute);

app.get('/', function(req, res) {
    res.send('API is running...');
})

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.io
const io = new Server(server, {
    cors: {
        origin: "https://itransition-task6-sigma.vercel.app",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

createConnectionToDataBase()
setSocket(io);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');
//
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//         credentials: true
//     }
// });
//
// app.use(cors());
//
//
// io.on('connection', (socket) => {
//     // Store the username in the socket object for later use
//     socket.userName = ''; // This will be set when the user joins a room
//     socket.presentationId = ''
//     // When a user joins a room
//     socket.on('joinPresentation', function (presentationId, userName) {
//         socket.join(presentationId);
//         // Set the username for the socket instance
//         socket.userName = userName;
//         // Add the user to the room's user list
//         // Emit the updated user list to everyone in the room
//         io.to(presentationId).emit('joinPresentation', userName);
//     });
//
//     // When a user updates presentation
//     socket.on('changePresentation', function (presentationId) {
//         io.to(presentationId).emit('receiveMessage');
//     });
//
//     // Handle user disconnection
//     socket.on('disconnect', () => {
//         io.to(socket.presentationId).emit('userLeft', socket.userName);
//     });
// });
//
//
//
//
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//
