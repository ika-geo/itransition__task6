import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getPresentationById,
    getPresentationByIdForSocket,
    setSelectedSlide
} from "../store/features/PresentationSlice.js";
import PresentationSlides from "../components/PresentationSlides.jsx";
import SlideEditor from "../components/SlideEditor.jsx";
import UsersInPresentation from "../components/UsersInPresentation.jsx";
import io from "socket.io-client";

const PresentationPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch()

    const [socket, setSocket] = useState(null)
    const presentation = useSelector(state => state.presentation.selectedPresentation)
    const selectedSlide = useSelector(state => state.presentation.selectedSlice)
    const loading = useSelector(state => state.presentation.loading)
    const error = useSelector(state => state.presentation.error)


    useEffect(() => {
        dispatch(setSelectedSlide(0))
        dispatch(getPresentationById(id))
        const newSocket = io(import.meta.env.VITE_SERVER_SOCKET_URL, {
            transports: ['websocket', 'polling'],
            path: '/socket.io/',
            withCredentials: true,
        });
        setSocket(newSocket);
    }, []);

    function handlegetPresentationByIdForSocket() {
        dispatch(getPresentationByIdForSocket(id))
    }

    if (!presentation) return null
    if (error) return <div>Can't get presentation</div>
    if (loading) return <div>Loading...</div>

    return (
        <div className='flex justify-between'>

            <div
                className='w-1/5 p-2 overflow-y-auto'>
                <PresentationSlides
                    presentation={presentation}
                    selectedSlide={selectedSlide}
                    socket={socket}
                    handlegetPresentationByIdForSocket={handlegetPresentationByIdForSocket}
                />
            </div>

            <div className='w-3/5 p-2'>
                <SlideEditor
                    presentation={presentation}
                    selectedSlide={selectedSlide}
                    socket={socket}
                    handlegetPresentationByIdForSocket={handlegetPresentationByIdForSocket}
                />
            </div>

            <div className='w-1/5 p-2'>
                <UsersInPresentation
                    presentation={presentation}
                    socket={socket}
                    handlegetPresentationByIdForSocket={handlegetPresentationByIdForSocket}
                    presentationId={id}
                />
            </div>


        </div>
    );
};

export default PresentationPage;