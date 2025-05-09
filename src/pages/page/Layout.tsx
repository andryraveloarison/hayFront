
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../ui/components/Sidebar';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const Layout = () => {
    const navigate = useNavigate();
    const token = Cookies.get('___chat-token');

    useEffect(() => {
            if(!token){
                navigate("/");
            }
       }, [token,navigate])

    return (
        <div className='flex flex-row h-screen gap-[30px]' >
            <div className='border-r border-[#ffffff17]  mt-[5vh] px-5 '>
                <Sidebar />
            </div>
            <div className='px-5 w-full mt-[5vh] ml-[5vh]'>
                <Outlet/>
            </div>
           
        </div>
    );
}

export default Layout;
