import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { getLevels } from "../../../domain/usecases/data/getLevels";
import { addLevel, fetchLevels } from "../../../infrastructure/api/dataApi";

export interface Level {
  _id?: string;
  name: string;
  description: string;
  serie?: string;
}

const LevelManager = () => {
  const dispatch = useAppDispatch();

  const [levels, setLevels] = useState<Level[]>([]);
  const [newLevel, setNewLevel] = useState<Level>({
    name: "",
    description: "",
    serie: "",
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handlefetchLevels = async () => {
    try {
      const res = await fetchLevels();
      setLevels(res);
    } catch (error) {
      console.error("Erreur lors du chargement des niveaux", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLevel = async () => {
    try {
      await addLevel( newLevel);
      setNewLevel({ name: "", description: "", serie: "" });
      setShowModal(false);
      handlefetchLevels();
      dispatch(getLevels());
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
    }
  };

  useEffect(() => {
    handlefetchLevels();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-black">Gestion des Niveaux</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Champ de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un niveau..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full rounded text-black"
        />
      </div>
              {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Série</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {levels
                  .filter((level) =>
                    level.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((level) => (
                    <tr key={level._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{level.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{level.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {level.serie || '—'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}


      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 cursor-pointer text-black hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-black">Ajouter un niveau</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nom"
                value={newLevel.name}
                onChange={(e) => setNewLevel({ ...newLevel, name: e.target.value })}
                className="border p-2 w-full rounded text-black"
              />
              <input
                type="text"
                placeholder="Description"
                value={newLevel.description}
                onChange={(e) =>
                  setNewLevel({ ...newLevel, description: e.target.value })
                }
                className="border p-2 w-full rounded text-black"
              />
              <input
                type="text"
                placeholder="Série (optionnel)"
                value={newLevel.serie}
                onChange={(e) => setNewLevel({ ...newLevel, serie: e.target.value })}
                className="border p-2 w-full rounded text-black"
              />

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddLevel}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelManager;
