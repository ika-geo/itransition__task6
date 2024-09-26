import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import Login from "./pages/Login.jsx";
import ToHomePage from "./components/ToHomePage.jsx";
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import PresentationPage from "./pages/PresentationPage.jsx";


function App() {
    const user = useSelector(state=>state.user.name)
    if (!user){
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="*" element={<ToHomePage/>}/>
                </Routes>
            </BrowserRouter>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/presentation/:id" element={<PresentationPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App



// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
//
// const socket = io("http://localhost:5000"); // Change to your server URL
//
// function App() {
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState([]);
//     const [roomNumber, setRoomNumber] = useState(""); // Room number as string
//     const [user, setUser] = useState("");
//     const [users, setUsers] = useState([]);
//
//     // Generate random username
//     function generateRandomName() {
//         const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
//         return names[Math.floor(Math.random() * names.length)];
//     }
//
//     useEffect(() => {
//         setUser(generateRandomName())
//
//         socket.on('receiveMessage', (msg) => {
//             setMessages((prevMessages) => [...prevMessages, msg]);
//         });
//
//         socket.on('joinRoom', (users) => {
//             console.log(users)
//             setUsers(users); // Update the user list when someone joins
//         });
//
//         socket.on('userLeft', (user) => {
//             console.log(user)
//             // setUsers(updatedUsers); // Update the user list when someone disconnects
//         });
//
//         socket.on('userLeft', (userName) => {
//             console.log(userName)
//         });
//
//         // socket.on("disconnect", () => {
//         //     socket.emit('removeUser', user)
//         // })
//
//         return () => {
//             socket.off('receiveMessage');
//             socket.off('joinRoom');
//             socket.off('userDisconnected');
//         };
//     }, []);
//
//     // Join room when room number is set
//     const joinRoom = () => {
//         socket.emit('joinRoom', roomNumber, user);
//     };
//
//     const sendMessage = () => {
//         if (roomNumber) {
//             socket.emit('sendMessage', message, roomNumber);
//             setMessage("")
//         } else {
//             alert("Please enter a room number first!");
//         }
//     };
//
//     return (
//         <div style={{ padding: '20px' }}>
//             <h1>Socket.IO Chat Example</h1>
//
//             <div>
//                 <input
//                     type="text"
//                     value={roomNumber}
//                     onChange={(e) => setRoomNumber(e.target.value)}
//                     placeholder="Enter Room Number"
//                 />
//                 <button onClick={joinRoom}>Join Room</button>
//             </div>
//
//             <h2>Messages</h2>
//             <div>
//                 {messages.map((msg, index) => (
//                     <div key={index}>{msg}</div>
//                 ))}
//             </div>
//
//             <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type a message"
//             />
//             <button onClick={sendMessage}>Send</button>
//
//             <h2>Users in Room</h2>
//             {users.map((user, index) => (
//                 <div key={index}>{user}</div>
//             ))}
//         </div>
//     );
// }
//
// export default App;
