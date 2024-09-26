import {connect} from "socket.io-client";

export const editPresentationSocket = (socket, fetchPresentation) => {
    socket?.on('editPresentation', (presentationId) => {
        console.log('start socketing')
        console.log(presentationId)
        fetchPresentation(presentationId);
    });
}