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
        dispatch(setUser(name))
    };

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div>
                <input value={name} onChange={handleSetName} type="text" />
                <button onClick={handleSetUser}>Log in</button>
            </div>
        </div>
    );
};

export default Login;
