import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { LevelInterface, SubjectInterface, ChapterInterface } from "../../types/DataInterface";
import { useLocation, useNavigate } from 'react-router-dom';

export const CourseExplorer = () => {
  const { levels, subjects, chapters } = useSelector((state: RootState) => state.data);

  const [selectedLevelName, setSelectedLevelName] = useState<string | null>(null);
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const levelsByName: Record<string, LevelInterface[]> = (levels as LevelInterface[]).reduce((acc, level) => {
    if (!acc[level.name]) acc[level.name] = [];
    acc[level.name].push(level);
    return acc;
  }, {} as Record<string, LevelInterface[]>);

  const filteredSubjects = (subjects as SubjectInterface[]).filter(
    (subject) => subject.level.id === selectedLevelId
  );

  const filteredChapters = (chapters as ChapterInterface[]).filter(
    (chapter) => chapter.subject.id === selectedSubjectId
  );

  const handleClick = (id: string) => {
    const basePath = location.pathname.includes('/admin') ? '/admin/courses' : '/courses';
    navigate(`${basePath}/${id}`);
  };

  return (
    <div className="p-4 space-y-6 bg-white">

      <h1 className="text-3xl font-bold mb-4 text-gray-800">Rechercher vos cours</h1>
      {/* Étapes dans une ligne */}
      <div className="flex flex-wrap gap-4">
        {/* Niveau */}
        <div className="min-w-[220px] max-w-[300px] w-full">
          <label className="block text-sm font-bold mb-1 text-black">Niveau</label>
          <select
            className="border p-2 rounded w-full bg-white text-black"
            value={selectedLevelName ?? ""}
            onChange={(e) => {
              const name = e.target.value || null;
              setSelectedLevelName(name);
              setSelectedSubjectId(null);
              if (name) {
                const levelGroup = levelsByName[name];
                const allWithoutSerie = levelGroup.every((lvl) => !lvl.serie);
                if (allWithoutSerie && levelGroup.length > 0) {
                  setSelectedLevelId(levelGroup[0].id);
                } else {
                  setSelectedLevelId(null);
                }
              } else {
                setSelectedLevelId(null);
              }
            }}
          >
            <option value="">Sélectionnez un niveau</option>
            {Object.keys(levelsByName).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Série */}
        {selectedLevelName &&
          levelsByName[selectedLevelName].some((lvl) => lvl.serie) && (
            <div className="min-w-[220px] max-w-[300px] w-full">
              <label className="block text-sm font-bold mb-1 text-black">Série</label>
              <select
                className="border p-2 rounded w-full bg-white text-black"
                value={selectedLevelId ?? ""}
                onChange={(e) => {
                  const id = e.target.value || null;
                  setSelectedLevelId(id);
                  setSelectedSubjectId(null);
                }}
              >
                <option value="">Sélectionnez une série</option>
                {levelsByName[selectedLevelName]
                  .filter((level) => level.serie)
                  .map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.serie}
                    </option>
                  ))}
              </select>
            </div>
          )}

        {/* Matière */}
        {selectedLevelId && (
          <div className="min-w-[220px] max-w-[300px] w-full">
            <label className="block text-sm font-bold mb-1 text-black">Matière</label>
            <select
              className="border p-2 rounded w-full bg-white text-black"
              value={selectedSubjectId ?? ""}
              onChange={(e) => setSelectedSubjectId(e.target.value || null)}
            >
              <option value="">Sélectionnez une matière</option>
              {filteredSubjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Chapitres */}
      {selectedSubjectId && filteredChapters.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2 text-black">Chapitres</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredChapters.map((chapter) => (
              <div
                  key={chapter.id}
                  className="group border border-gray-500 rounded-[10px] p-4 hover:bg-green-800 hover:border-white cursor-pointer transition"
                  onClick={() => handleClick(chapter.id)}
                >

                <div className="flex gap-1">
                <h1 className="font-semibold text-black group-hover:text-white text-xl">{chapter.order}- </h1>
                <h3 className="font-semibold text-black group-hover:text-white text-xl"> {chapter.title}</h3>
                </div>

                <p className="text-sm text-gray-800 group-hover:text-gray-300">{chapter.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseExplorer;
