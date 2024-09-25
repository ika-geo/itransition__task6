import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { setUser } from "../store/features/UserSlice.js";

const Login = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleSetName = (e) => {
        setName(e.target.value)
    };

    const handleSetUser = () => {
        if (!name) return alert('Please enter your name')
        if (name.toLowerCase() === 'anonymouse') return alert('Anonymouse is not allowed')
        dispatch(setUser(name))
    };

    const handleSetAnonymouseUser = ()=>{
        dispatch(setUser('Anonymouse'))
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div>
                <input value={name} onChange={handleSetName} type="text" />
                <button onClick={handleSetUser}>Log in</button>
                <p title='hello' className='my-2 text-center'>OR</p>
                <button onClick={handleSetAnonymouseUser} className='w-full' title='you can only view presentations'>Log in as Anonymouse</button>
            </div>
        </div>
    );
};

export default Login;
