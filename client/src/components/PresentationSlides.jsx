import React, {useEffect} from 'react';
import {
    addPresentationSlideLocally,
    deletePresentationSlideLocally,
    setSelectedSlide
} from "../store/features/PresentationSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const PresentationSlides = ({presentation, selectedSlide, socket, handlegetPresentationByIdForSocket}) => {
    const user = useSelector(state=>state.user.name)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (socket){
            socket.on('refreshPresentation', handlegetPresentationByIdForSocket);
            socket.on("deletePresentation", ()=>navigate('/'))

            return () => {
                socket.off('refreshPresentation');
                socket.off("deletePresentation");
            };
        }
    }, []);

    const handleChangeSlide = (id) => {
        dispatch(setSelectedSlide(id))
    }

    const handleDeleteSlide = () => {
        if (socket){
            dispatch(deletePresentationSlideLocally(selectedSlide))
            socket.emit("deletePresentationSlide", presentation._id, selectedSlide)
        }
    }

    const handleAddSlide = () => {
        if (socket){
            dispatch(addPresentationSlideLocally())
            socket.emit("addPresentationSlide", presentation._id)
        }
    }

    const handleDeletePresentaion = ()=>{
        if (socket){
            socket.emit("deletePresentation", presentation._id)
            navigate('/')
        }
    }

    return (
        <>
            {presentation?.author===user &&
                <button
                    onClick={handleDeletePresentaion}
                    className='alterBtn mb-4'>Delete Presentation</button>
            }

            {presentation.slides.map((slide, id) => {
                return (
                    <div
                        key={slide._id}
                        className={'text-black w-full flex justify-between gap-x-2 p-4 mb-4 rounded-lg shadow-md border-[1px] border-gray-100 ' + (selectedSlide === id ? "bg-primaryBG" : "")}>

                        <button
                            onClick={() => handleChangeSlide(id)}
                            className='bg-transparent w-full text-black'>
                            Slide {id + 1}</button>

                        {user===presentation.author &&
                            <button onClick={() => handleDeleteSlide(slide._id, id)}
                                    className='alterBtn'>Delete
                            </button>
                        }


                    </div>
                )
            })}
            {user === presentation.author &&
                < button onClick={handleAddSlide}>Add slide</button>
            }

        </>


    );
};

export default PresentationSlides;