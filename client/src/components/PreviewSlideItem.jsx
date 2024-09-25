import React from 'react';
import {Link} from "react-router-dom";
import {MdDelete} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {deletePresentation} from "../store/features/PresentationSlice.js";


const PreviewSlideItem = ({presentation}) => {

    let author = useSelector(state=>state.user.name)
    let dispatch = useDispatch()

    const handleDeletePresentation = ()=>{
        dispatch(deletePresentation(presentation._id))
    }

    return (
        <div className="bg-white border-[1px] border-gray-100 p-6 rounded-lg shadow-md">

            <div className='flex justify-between gap-x-2'>

                <h3 className="text-xl font-bold">{presentation.title}</h3>
                {
                    author===presentation.author &&
                    <MdDelete
                        onClick={handleDeletePresentation}
                        className='text-red-500 text-3xl cursor-pointer hover:opacity-60' />
                }

            </div>


            <p className="text-lg text-gray-600 mb-4">Author: {presentation.author}</p>
            <Link
                to={'/presentation/' + presentation._id}
                className="block bg-primary text-white text-center rounded-lg p-2 w-full hover:opacity-60">Join Presentation</Link>
        </div>

    )
};

export default PreviewSlideItem;