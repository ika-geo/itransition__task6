import React from 'react';

const WindowBlock = ({ ChildComponent, onClose, ...childComponentParams }) => {
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-70'>
            <div className='relative bg-white rounded p-4'>

                <button
                    className='bg-none p-0 text-red-500 absolute top-2 right-2'
                    onClick={onClose}
                >
                    X
                </button>

                <ChildComponent {...childComponentParams} />
            </div>
        </div>
    );
};

export default WindowBlock;