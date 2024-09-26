import React, {useEffect} from 'react';
import {useSelector} from "react-redux";

// activeUsers
// author
// blackListUsers

const UsersInPresentation = ({presentation, socket, handlegetPresentationByIdForSocket}) => {
    let user = useSelector(state => state.user.name);

    useEffect(() => {
        if (presentation && socket) {
            socket.emit('joinPresentation', user, presentation._id);
            socket.on('refreshPresentation', handlegetPresentationByIdForSocket);
            return () => {
                socket.off('refreshPresentation');
                socket.emit('leavePresentation')
            };
        }
    }, []);

    const handleAddUserToBlackList = (userItem) => {
        socket.emit('addUserToBlacklist', userItem, presentation._id)
    };

    const handleRemoveUserFromBlackList = (userItem) => {
        socket.emit('removeUserFromBlacklist', userItem, presentation._id)
    };

    return (
        <div>

            {/*users online*/}
            <div className='mb-12'>
                <h2 className="text-lg font-bold mb-4">Users in Presentation</h2>
                {
                    presentation?.activeUsers.map(userItem => (
                        <div key={userItem}
                             className={"p-4 mb-2 rounded-lg shadow-md flex justify-between items-center border-gray-100 border-[1px] "+(user===userItem&&'bg-primaryBG')}>
                            <p>{userItem}</p>
                            {
                                (user === presentation.author) && (user !== userItem) && (
                                    presentation.blackListUsers.includes(userItem) ?
                                        <button
                                            onClick={() => handleRemoveUserFromBlackList(userItem)}
                                            className="bg-green-500 text-white p-2 rounded-lg">
                                            Unblock
                                        </button>
                                        :
                                        <button
                                            onClick={() => handleAddUserToBlackList(userItem)}
                                            className="alterBtn">
                                            Block
                                        </button>
                                )
                            }
                        </div>
                    ))
                }
            </div>



            {/*black list users*/}
            <div>
                {
                    user === presentation.author && (
                        <>
                            <h2 className="text-lg font-bold mb-4">Users in Blacklist</h2>
                            {presentation.blackListUsers.map(userItem => (
                                <div key={userItem}
                                     className="p-4 mb-2 rounded-lg shadow-md flex justify-between items-center border-gray-100 border-[1px]">
                                    <p>{userItem}</p>
                                    <button
                                        onClick={() => handleRemoveUserFromBlackList(userItem)}
                                        className="bg-green-500 text-white p-2 rounded-lg">
                                        Unblock
                                    </button>
                                </div>
                            ))}
                        </>
                    )
                }
            </div>

        </div>
    );
};

export default UsersInPresentation;