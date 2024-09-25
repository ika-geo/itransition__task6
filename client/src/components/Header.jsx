import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../store/features/UserSlice.js";


const Header = () => {

    const dispatch = useDispatch()
    const user = useSelector(state=>state.user.name)

    const handleLogOut = ()=>{
        dispatch(logOut())
    }

    return (
        <div>
            <header className="bg-primary mb-8">
                <div className='container mx-auto text-white p-4 flex justify-between items-center'>
                    <Link className="text-2xl" to='/'>Presentations</Link>
                    <div className="flex items-center">
                        <span className="text-2xl mr-4">{user}</span>
                        <button onClick={handleLogOut} className="bg-red-500 p-2 rounded-lg text-white">Logout</button>
                    </div>
                </div>

            </header>
            <div className='container mx-auto'>
                {<Outlet/>}
            </div>


        </div>
    );
};

export default Header;