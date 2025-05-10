import { useEffect, useState } from "react";
import { addSubject, fetchLevels, fetchSubjects } from "../../../infrastructure/api/dataApi";

interface Level {
  id?: string;
  name: string;
  description: string;
  serie?: string;
}

interface Subject {
  _id?: string;
  name: string;
  level: Level | string;
}

const SubjectManager = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState<{ name: string; level: string }>({
    name: "",
    level: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const handleFetchSubjects = async () => {
    try {
      const res = await fetchSubjects();
      setSubjects(res);
    } catch (error) {
      console.error("Erreur lors du chargement des sujets", error);
    }finally{
      setLoading(false)
    }
  };

  const handleFetchLevels = async () => {
    try {
      const res = await fetchLevels();
      setLevels(res);
    } catch (error) {
      console.error("Erreur lors du chargement des niveaux", error);
    }
  };

  const handleAddSubject = async () => {
    try {
      //await axios.post("http://127.0.0.1:8000/api/subjects/create", newSubject);
      await addSubject(newSubject)
      setNewSubject({ name: "", level: "" });
      setIsModalOpen(false);
      handleFetchSubjects();
    } catch (error) {
      console.error("Erreur lors de l'ajout du sujet", error);
    }
  };

  useEffect(() => {
    handleFetchLevels();
    handleFetchSubjects();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-black">Gestion des Matières</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Champ de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher une matière..."
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
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Matière
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Niveau
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Série
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {subjects
        .filter((subject) =>
          subject.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((subject) => (
          <tr key={subject._id} className="hover:bg-gray-50 text-black">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              {subject.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              {typeof subject.level === "object" ? subject.level.name : "—"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              {typeof subject.level === "object" && subject.level.serie ? subject.level.serie : "—"}
            </td>
          </tr>
        ))}
    </tbody>
  </table>

</div>)}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative space-y-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 cursor-pointer text-black hover:text-red-500 text-xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-2 text-black">Ajouter une matière</h2>

            <input
              type="text"
              placeholder="Nom de la matière"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
              className="border p-2 w-full rounded text-black"
            />
            <select
              value={newSubject.level}
              onChange={(e) => setNewSubject({ ...newSubject, level: e.target.value })}
              className="border p-2 w-full rounded text-black"
            >
              <option value="">-- Choisir un niveau --</option>
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name} {level.serie && `- ${level.serie}`}
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={handleAddSubject}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectManager;
