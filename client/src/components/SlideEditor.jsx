import React, {useEffect, useState} from 'react';
import EditorBlock from "./EditorBlock.jsx";
import {useDispatch} from "react-redux";
import {editPresentationSlide} from "../store/features/PresentationSlice.js";
import SlidePreview from "./SlidePreview.jsx";

const SlideEditor = ({presentation, selectedSlide, socket, handlegetPresentationByIdForSocket}) => {
    const dispatch = useDispatch()
    const [slideContent, setSlideContent] = useState(null);
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setEditMode(false)
    }, [selectedSlide]);

    useEffect(()=>{
        if(socket){
            socket.on('refreshPresentation', ()=>handlegetPresentationByIdForSocket(presentation?._id))
            return () => {
                socket.off('refreshPresentation')
            }
        }
    }, [])

    const handleStartEditingMode = ()=>{
        setEditMode(true)
    }

    const handleSaveChanges = async()=>{
        dispatch(editPresentationSlide(slideContent))
        setEditMode(false)
        await socket.emit('editPresentation', presentation._id, selectedSlide, slideContent)
        handlegetPresentationByIdForSocket()
    }

    const handleCancel = ()=>{
        setEditMode(false)
    }

    return (
        <div>
            <div className="flex justify-between gap-x-4">
                <h2 className="text-lg font-bold mb-4">Presentation Title: {presentation.title}</h2>

                {!editMode
                    ?
                    <button
                            onClick={handleStartEditingMode}>Start Editing
                    </button>
                    :
                    <div>
                        <button
                            className='bg-alter border-alter mr-4'
                            onClick={handleCancel}>Cancel
                        </button>
                        <button
                            onClick={handleSaveChanges}>Save changes
                        </button>
                    </div>

                }
            </div>

            {
                presentation?.slides?.length ?
                    <p className="text-sm text-gray-600">Slide {selectedSlide + 1} of {presentation.slides.length}</p>
                    :
                    <p className="text-sm text-gray-600">No slides available</p>
            }

            {
                presentation?.slides.length &&
                <>
                    {editMode ?
                        <EditorBlock
                            presentation={presentation}
                            selectedSlide={selectedSlide}
                            setSlideContent={setSlideContent}
                        />
                     :
                        presentation?.slides[selectedSlide] &&
                        <div className='h-[300px]'>
                            <SlidePreview slideData={presentation?.slides[selectedSlide]} />
                        </div>

                    }
                </>

            }
        </div>
    );
};

export default SlideEditor;