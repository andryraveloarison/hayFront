import { Student, Books, Note,Eye } from "phosphor-react";
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        document.cookie.split(";").forEach(cookie => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
        navigate("/");
    };

    const linkStyle = ({ isActive }: { isActive: boolean }) =>
        `p-2 rounded-full h-[50px] w-[50px] flex items-center justify-center cursor-pointer 
        ${isActive ? "bg-teal-800 text-white" : "hover:bg-[#aca8a82f] text-gray-800"}`;

    return (
        <div>
            <div className="h-[90vh] fixed flex rounded-[15px] p-2  flex-col justify-between border ">
                {/* haut */}
                <div className="flex flex-col items-center gap-1">
                    <NavLink to="/admin/level" className={linkStyle}>
                        <Student size={25} />
                    </NavLink>
                    <NavLink to="/admin/subject" className={linkStyle}>
                        <Books size={25} />
                    </NavLink>
                    <NavLink to="/admin/course" className={linkStyle}>
                        <Note size={25} />
                    </NavLink>
                    <NavLink to="/admin/view" className={linkStyle}>
                        <Eye size={25} />
                    </NavLink>
                </div>

                {/* bas */}
                <div className="flex flex-col items-center gap-1">
                    <div
                        onClick={handleLogout}
                        className="hover:bg-[#aca8a82f] text-gray-800 p-2 rounded-full h-[50px] w-[50px] flex items-center justify-center cursor-pointer"
                    >
                        <IoIosLogOut size={25} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
