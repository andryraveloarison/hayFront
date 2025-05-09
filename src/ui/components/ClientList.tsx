import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectClients } from "../../redux/client/clientSelectors";
import { getClient } from "../../domain/usecases/client/getClient";
import { useAppDispatch } from "../../redux/store";
import { NavLink } from "react-router-dom";

const ClientList = () => {
  const dispatch = useAppDispatch();
  const clients = useSelector(selectClients);


  useEffect(() => {
    dispatch(getClient());
  }, [dispatch]);

  return (
    <div className="px-5">
      <ul className="list bg-base-100 rounded-box">
        <li className="p-4 pb-2 text-3xl opacity-60 tracking-wide">I'Resak</li> 
        <div className="mt-5">
          <label className="input">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" className="grow" placeholder="Search" />
          </label>
        </div>
        <div className="h-[80vh] overflow-hidden overflow-y-scroll mt-5">
          {
            clients.map((client, index) => (
              <NavLink to={`/admin/${client._id}`} key={index}>
                <li className="list-row">
                  <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div>
                  <div>
                    <div>{client.username}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">{client.email}</div>
                  </div>
                  <div className="flex flex-row items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </li>
              </NavLink>
          
            ))
          }
        </div> 
      </ul>
    </div>
  );
};

export default ClientList;
