import React from 'react';
import {addSlide, deleteSlide, setSelectedSlide} from "../store/features/PresentationSlice.js";
import {useDispatch} from "react-redux";

const PresentationSlides = ({presentation, selectedSlide}) => {

    const dispatch = useDispatch()
    const handleChangeSlide = (id) => {
        dispatch(setSelectedSlide(id))
    }

    const handleDeleteSlide = (slideId, id) => {
        if (id === selectedSlide) {
            dispatch(setSelectedSlide(0))
        }
        dispatch(deleteSlide({
            presentationId: presentation._id,
            slideId: slideId
        }))
        //handle websocket here
    }

    const handleAddSlide = () => {
        dispatch(addSlide(presentation._id))
    }

    return (
        <>
            {presentation?.slides.map((slide, id) => {
                return (
                    <button
                        key={slide._id}
                        onClick={() => handleChangeSlide(id)}
                        className={'text-black w-full flex justify-between gap-x-2 bg-white p-4 mb-4 rounded-lg shadow-md border-[1px] border-gray-100 ' + (selectedSlide === id ? "bg-green-100" : "")}>
                        <h2>Slide {id + 1}</h2>
                        <button onClick={() => handleDeleteSlide(slide._id, id)}
                                className='bg-red-500'>Delete
                        </button>

                    </button>
                )
            })}
            <button onClick={handleAddSlide}>Add slide</button>
        </>


    );
};

export default PresentationSlides;