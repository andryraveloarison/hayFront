import { useState } from 'react';
import { Video, Eye, Users, Upload, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/icone2.png'

export default function Landing() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20 ">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Apprenez avec HAY depuis chez vous</h1>
              <p className="text-xl mb-8">Accédez à des cours en ligne de la 6ème à la Terminale avec vidéos explicatives, documents de leçons, exercices et corrections</p>
              <div className="flex flex-col sm:flex-row gap-4">
              
                <button className="px-6 py-3 bg-transparent cursor-pointer border border-white text-white font-medium rounded-md hover:bg-white hover:text-green-600 hover:bg-opacity-10"
                onClick={() => navigate('/view')}>
                  Découvrir les cours
                </button>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-xl">
              <div
                className="aspect-video rounded flex items-center justify-center rounded-lg "
                style={{ backgroundColor: '#f6f4f0' }}
              >
                <div className="text-center">
                  <img
                    src={logo} // Replace with your HAY logo path
                    alt="Logo HAY"
                    className="h-45 w-auto cursor-pointer"
                    onClick={() => navigate('/')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Tout ce dont vous avez besoin pour réussir</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">HAY offre des ressources complètes pour les élèves de Madagascar de la 6ème à la Terminale</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-green-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Upload size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Ressources accessibles</h3>
              <p className="text-gray-600">Téléchargez facilement des leçons, exercices et corrections</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-green-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Video size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Vidéos explicatives</h3>
              <p className="text-gray-600">Apprenez à votre rythme avec des vidéos détaillées pour chaque niveau</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-green-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Suivi et progrès</h3>
              <p className="text-gray-600">Vérifiez vos connaissances avec des exercices et leurs corrections.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Comment ça fonctionne</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Un processus simple en trois étapes pour apprendre efficacement</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Inscrivez-vous</h3>
              <p className="text-gray-600">Créez un compte pour accéder à tous les cours de la 6ème à la Terminale</p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Choisissez votre niveau</h3>
              <p className="text-gray-600">Sélectionnez votre classe et commencez avec les ressources adaptées</p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Apprenez et pratiquez</h3>
              <p className="text-gray-600">Regardez les vidéos, étudiez les leçons et entraînez-vous avec les exercices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Pour qui ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">HAY s’adresse à tous les élèves et enseignants de Madagascar</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md flex">
              <div className="mr-6">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <Users size={20} className="text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Élèves de 6ème à Terminale</h3>
                <p className="text-gray-600 mb-4">Accédez à des ressources adaptées à chaque niveau scolaire</p>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <ArrowRight size={16} className="text-green-600 mr-2" />
                    <span>Cours interactifs</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight size={16} className="text-green-600 mr-2" />
                    <span>Exercices pratiques</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight size={16} className="text-green-600 mr-2" />
                    <span>Corrections détaillées</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md flex">
              <div className="mr-6">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <Eye size={20} className="text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Enseignants et tuteurs</h3>
                <p className="text-gray-600 mb-4">Utilisez HAY pour préparer vos leçons et suivre les progrès</p>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <ArrowRight size={16} className="text-green-600 mr-2" />
                    <span>Vidéos pédagogiques</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight size={16} className="text-green-600 mr-2" />
                    <span>Documents imprimables</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight size={16} className="text-green-600 mr-2" />
                    <span>Outils d’évaluation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Tarifs accessibles</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choisissez un plan adapté à vos besoins d’apprentissage</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden relative min-h-[500px] px-8 pt-8 pb-20">
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Étudiant</h3>
                <p className="text-gray-600 mb-6">Pour les élèves individuels</p>
                <div className="flex items-end mb-6">
                  <span className="text-4xl font-bold text-gray-800">5 000 Ar</span>
                  <span className="text-gray-600 ml-2">/mois</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600">
                    <ArrowRight size={16} className="text-green-600 mr-2" />
                    <span>10 vidéos/mois</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <ArrowRight size={16} className="text-green-600 mr-2" />
                    <span>Documents et exercices</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <ArrowRight size={16} className="text-green-600 mr-2" />
                    <span>Support de base</span>
                  </li>
                </ul>
              </div>
              <div className="absolute bottom-[20px] left-0 right-0 px-8">
                <button className="w-full py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700">
                  Commencer
                </button>
              </div>
            </div>

            <div className="bg-white border-2 border-green-600 rounded-lg shadow-lg overflow-hidden relative">
              <div className="bg-green-600 text-white text-center py-1 absolute top-0 left-0 right-0">
                <span className="text-sm font-medium">Recommandé</span>
              </div>
              <div className="p-8 pt-12">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Famille</h3>
                <p className="text-gray-600 mb-6">Pour plusieurs élèves d’une même famille</p>
                <div className="flex items-end mb-6">
                  <span className="text-4xl font-bold text-gray-800">15 000 Ar</span>
                  <span className="text-gray-600 ml-2">/mois</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600">
                    <ArrowRight size={16} className="text-green-600 mr-2" />
                    <span>50 vidéos/mois</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <ArrowRight size={16} className="text-green-600 mr-2" />
                    <span>Accès multi-utilisateurs</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <ArrowRight size={16} className="text-green-600 mr-2" />
                    <span>Support prioritaire</span>
                  </li>
                </ul>
              </div>
              <div className="absolute bottom-[20px] left-0 right-0 px-8">
                <button className="w-full py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700">
                  Commencer
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden relative min-h-[500px] px-8 pt-8 pb-20">
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">École</h3>
                <p className="text-gray-600 mb-6">Pour les établissements scolaires</p>
                <div className="flex items-end mb-6">
                  <span className="text-4xl font-bold text-gray-800">50 000 Ar</span>
                  <span className="text-gray-600 ml-2">/mois</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600">
                    <ArrowRight size={16} className="text-green-600 mr-2" />
                    <span>200 vidéos/mois</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <ArrowRight size={16} className="text-green-600 mr-2" />
                    <span>Accès pour tous les élèves</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <ArrowRight size={16} className="text-green-600 mr-2" />
                    <span>Support dédié</span>
                  </li>
                </ul>
              </div>
              <div className="absolute bottom-[20px] left-0 right-0 px-8">
                <button className="w-full py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700">
                  Commencer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-black">Prêt à booster vos études avec HAY ?</h2>
          <p className="text-xl text-gray-800 mb-8">Rejoignez des milliers d’élèves malgaches pour réussir vos examens</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="px-6 py-3 rounded-md text-gray-800 border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="px-6 py-3 bg-teal-800 cursor-pointer text-white font-medium rounded-md hover:text-grey-400 hover:bg-green-600">
              Essai gratuit de 14 jours
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#103928] text-white py-12">        
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">HAY</h3>
              <p className="text-gray-200">Plateforme d’apprentissage en ligne pour les élèves de Madagascar, de la 6ème à la Terminale.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Cours</h4>
              <ul className="space-y-2 text-gray-200">
                <li><a href="#" className="hover:text-white">Niveaux</a></li>
                <li><a href="#" className="hover:text-white">Ressources</a></li>
                <li><a href="#" className="hover:text-white">Tutoriels</a></li>
                <li><a href="#" className="hover:text-white">Exercices</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">À propos</h4>
              <ul className="space-y-2 text-gray-200">
                <li><a href="#" className="hover:text-white">Notre mission</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Équipe</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-gray-200">
                <li><a href="#" className="hover:text-white">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:text-white">Accessibilité</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-200">© {new Date().getFullYear()} HAY. Tous droits réservés.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-200 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
          
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}