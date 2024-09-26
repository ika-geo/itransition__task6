import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import EditorBlock from "./EditorBlock.jsx";

const SlideEditor = ({presentation, selectedSlide}) => {

    const [editMode, setEditMode] = useState(false)

    const handleSetEditMode = () => {
        setEditMode(true)
    }

    return (
        <div>

            <div className="flex justify-between gap-x-4">
                <h2 className="text-lg font-bold mb-4">Presentation Title: {presentation.title}</h2>

                <button className="bg-green-500 text-white p-2 rounded-lg"
                        onClick="document.getElementById('slideEditor').classList.remove('hidden')">Start Editing
                </button>
            </div>

            <p className="text-sm text-gray-600">Slide {selectedSlide+1} of {presentation.slides.length}</p>

            {
                presentation?.slides.length ?

                    <>
                        {
                            !editMode && <button onClick={handleSetEditMode}>Edit slide</button>
                        }


                        {
                            editMode &&
                            <EditorBlock
                                presentation={presentation}
                                selectedSlide={selectedSlide}
                                setEditMode={setEditMode}
                            />
                        }

                        <div>
                            <p>{presentation.slides[selectedSlide].content}</p>
                        </div>
                    </>

                    : null

            }
        </div>
    );
};

export default SlideEditor;