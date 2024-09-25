import React from 'react';
import {useSelector} from "react-redux";

// activeUsers
// activeUsers
// author
// blackListUsers


const UsersInPresentation = ({ presentation }) => {
    let user = useSelector(state => state.user.name); // Renamed to avoid confusion with the `user` inside map
    console.log(presentation.blackListUsers);
    console.log(presentation.activeUsers);

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Users in Presentation</h2>
            {
                presentation.activeUsers.map(userItem => (
                    <div key={userItem} className="bg-white p-4 mb-2 rounded-lg shadow-md flex justify-between items-center border-gray-100 border-[1px]">
                        <p>{userItem}</p>
                        {
                            user === presentation.author && (
                                presentation.blackListUsers.includes(userItem) ?
                                    <button className="bg-green-500 text-white p-2 rounded-lg">Unblock</button>
                                    : <button className="bg-red-500 text-white p-2 rounded-lg">Block</button>
                            )
                        }
                    </div>
                ))
            }
        </div>
    );
};


export default UsersInPresentation;