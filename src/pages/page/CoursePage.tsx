import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChapterInterface } from "../../types/DataInterface";

interface Course {
  id: string;
  title: string;
  content: string;
  chapter: ChapterInterface;
  author: string;
  lessonPdfUrl?: string;
  exoPdfUrl?:string;
  correctionPdfUrl?: string;
  videoUrl?: string;
  order: number;
  createdAt: string;
}

const CoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/courses/getByChapterId/${id}`)
        .then((res) => {
          setCourse(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Erreur lors du chargement du cours.");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!course) return <div className="p-4 text-gray-500">Cours non trouvé.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-[30px] p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.chapter.title}</h1>

        {course.videoUrl && (
          <div className="mb-6">
            <video controls className="w-full rounded-md">
              <source src={course.videoUrl} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
        )}

        <p className="text-sm text-gray-500 text-right">
          Publié le {new Date(course.createdAt).toLocaleDateString()}
        </p>

<p className="text-gray-700 text-lg mb-6">{course.chapter.description}</p>

<div className="mb-6">
  <h2 className="text-xl font-semibold text-gray-800 mb-3">Ressources disponibles</h2>
  <div className="flex flex-wrap gap-4">
    {course.lessonPdfUrl && (
      <a
        href={course.lessonPdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg shadow transition"
      >
        📘 Cours (PDF)
      </a>
    )}
    {course.exoPdfUrl && (
      <a
        href={course.exoPdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow transition"
      >
        🧠 Exercices (PDF)
      </a>
    )}
    {course.correctionPdfUrl && (
      <a
        href={course.correctionPdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg shadow transition"
      >
        📝 Correction (PDF)
      </a>
    )}
    </div>
  </div>
       
      </div>
    </div>
  );
};

export default CoursePage;
