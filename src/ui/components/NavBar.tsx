import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo2.png'


export default function NavBar() {

  const navigate = useNavigate();

    return (
    <>
      <div className="font-sans"
        style={{ height: '20vh' }}
        >
        {/* Navigation */}
        <nav className="bg-white shadow px-6 py-4 fixed top-0 left-0 w-full z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
            <img
              src={logo}
              alt="Logo MyMark"
              className="h-20 cursor-pointer"
              onClick={() => navigate('/')}
            />
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-green-600" onClick={() => navigate('/#features')}>
                Fonctionnalités</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-green-600" onClick={() => navigate('/#how-it-works')}>
                Utilisation</a>
              <a href="#pricing" className="text-gray-700 hover:text-green-600" onClick={() => navigate('/#pricing')}>
                Tarifs</a>
            </div>
            <div>
              <button className="px-4 py-2 text-teal-800 rounded-md border border-teal-800 mr-2 cursor-pointer" 
               onClick={() => navigate('/login')}>
                Se connecter
                </button>
              <button className="px-4 py-2 bg-teal-800 text-white rounded-md cursor-pointer" onClick={() => navigate('/register')}>Créer un compte</button>
            </div>
          </div>
        </nav>

    </div>

    <Outlet/>

</>
    

    );
}
