import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEnvelope, FaFacebook, FaGoogle, FaLinkedinIn, FaLock } from 'react-icons/fa';
import { SweetAlert } from "../../utils/sweetAlert";
import { loginInterface } from "../../types/UserInterface";
import Cookies from 'js-cookie';
import { authRepository } from "../../application/repository/authRepository";
import { useAppDispatch } from "../../redux/store";
import { getClientSender } from "../../domain/usecases/client/getClient";
import { getLevels } from "../../domain/usecases/data/getLevels";
import { getSubjects } from "../../domain/usecases/data/getSubjects";
import { getChapters } from "../../domain/usecases/data/getChapters";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<loginInterface>({
    email: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await authRepository.loginRepo(loginData.email, loginData.password);
      const status = result.success;

      if (!status) {
        SweetAlert.errorPage("Votre email ou mdp est incorrect ou compte etudiant");
      } else {
        dispatch(getClientSender(loginData.email, loginData.password));
        dispatch(getLevels());
        dispatch(getSubjects());
        dispatch(getChapters());

        const token = result.token;
        Cookies.set('___chat-token', token, { expires: 1, secure: false, sameSite: 'Strict' });
        navigate("/admin");
      }
    } catch (error: any) {
      console.log("error : ", error.response?.data?.message);
      SweetAlert.errorPage(error.response?.data?.message || "Erreur inconnue");
    }
  };

 return (
  <div
    className=" flex justify-center items-center px-4 bg-gradient-to-br"
    style={{ height: '80vh' }}
  >
    <div className="w-full max-w-md">
      <form onSubmit={handleLogin} className="flex flex-col gap-6 text-white">
        <h2 className="text-3xl font-bold text-center text-black">S'authentifier</h2>

        <div className="flex items-center gap-3  border border-gray-600 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
          <FaEnvelope className="text-xl text-gray-600" />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            value={loginData.email}
            className="bg-transparent w-full text-black placeholder-gray-600 outline-none"
            required
          />
        </div>

        <div className="flex items-center gap-3  border border-gray-600 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
          <FaLock className="text-xl text-gray-600" />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            value={loginData.password}
            className="bg-transparent w-full text-black placeholder-gray-600 outline-none"
            required
          />
        </div>

        <button type="submit" className="bg-green-800 cursor-pointer hover:bg-green-600 transition duration-200 text-white py-2 rounded-md font-semibold">
          Se connecter
        </button>

        <div className="flex justify-center gap-4 mt-2">
          <NavLink to="#" className="text-gray-600 hover:text-black text-lg">
            <FaFacebook />
          </NavLink>
          <NavLink to="#" className="text-gray-600 hover:text-black text-lg">
            <FaGoogle />
          </NavLink>
          <NavLink to="#" className="text-gray-600 hover:text-black text-lg">
            <FaLinkedinIn />
          </NavLink>
        </div>
      </form>
    </div>
  </div>
);

};

export default Login;
