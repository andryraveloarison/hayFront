import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEnvelope, FaFacebook, FaGoogle, FaLinkedinIn, FaLock, FaTwitter, FaUser } from 'react-icons/fa';
import { SweetAlert } from "../../utils/sweetAlert";
import { registerInterface } from "../../types/UserInterface";
import Cookies from 'js-cookie';
import { authRepository } from "../../application/repository/authRepository";

const Register = () => {
  const [registerData, setRegisterData] = useState<registerInterface>({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();


  const [confirmPass, setConfirmPass] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (confirmPass === registerData.password) {
        const result = await authRepository.registerRepo(registerData.username, registerData.email, registerData.password);
        const status = result.success;

        if (!status) {
          SweetAlert.errorPage("Erreur lors de la création du compte");
        } else {
          const privateKey = result.privateKey;
          Cookies.set('___chat-key', privateKey, { expires: 1, secure: false, sameSite: 'Strict' });
          SweetAlert.sucessInfo("Votre compte est bien enregistré");
          navigate("/login")
        }
      } else {
        SweetAlert.errorPage("Veuillez bien confirmer votre mot de passe");
      }
    } catch (error: any) {
      console.log("error : ", error.response.data.message);
      SweetAlert.errorPage(error.response.data.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center px-4 "
      style={{ height: '80vh' }} // ajuste ici selon la hauteur réelle de ton navbar
    >
      <div className="w-full max-w-md">
        <form onSubmit={handleRegister} className="flex flex-col gap-6 text-white">
          <h2 className="text-3xl font-bold text-center text-black">S'inscrire</h2>

          <div className="flex items-center gap-3 border border-gray-600 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
            <FaUser className="text-xl text-gray-600" />
            <input
              type="text"
              placeholder="Pseudo"
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              value={registerData.username}
              className="bg-transparent w-full text-black placeholder-gray-600 outline-none"
              required
            />
          </div>

          <div className="flex items-center gap-3 border border-gray-600 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
            <FaEnvelope className="text-xl text-gray-600" />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              value={registerData.email}
              className="bg-transparent w-full text-black placeholder-gray-600 outline-none"
              required
            />
          </div>

          <div className="flex items-center gap-3 border border-gray-600 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
            <FaLock className="text-xl text-gray-600" />
            <input
              type="password"
              placeholder="Mot de passe"
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              value={registerData.password}
              className="bg-transparent w-full text-black placeholder-gray-600 outline-none"
              required
            />
          </div>

          <div className="flex items-center gap-3 border border-gray-600 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
            <FaLock className="text-xl text-gray-600" />
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              onChange={(e) => setConfirmPass(e.target.value)}
              value={confirmPass}
              className="bg-transparent w-full text-black placeholder-gray-600 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-800 cursor-pointer hover:bg-green-600 transition duration-200 text-white py-2 rounded-md font-semibold"
          >
            S'inscrire
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

export default Register;
