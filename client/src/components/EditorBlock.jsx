import React, {useEffect, useState} from 'react';
import {editPresentationSlide} from "../store/features/PresentationSlice.js";
import {useDispatch} from "react-redux";

const EditorBlock = ({presentation, selectedSlide, setEditMode}) => {

    const [content, setContent] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        setContent(presentation?.slides[selectedSlide].content)
    }, [presentation?.slides[selectedSlide].content]);

    const handleEditorChange = (value)=>{
        setContent(value)
    }

    const handleSaveSlider = ()=>{
        setEditMode(false)
        dispatch(editPresentationSlide({
            presentationId: presentation._id,
            slideId: presentation?.slides[selectedSlide]._id,
            content: content,
        }))
    }

    return (
        <div>
            <input type='text' value={content} onChange={e => handleEditorChange(e.target.value)}></input>
            <button onClick={handleSaveSlider}>Save</button>
        </div>
    );
};

export default EditorBlock;