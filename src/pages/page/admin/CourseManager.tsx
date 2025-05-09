import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { SubjectInterface } from "../../../types/DataInterface";
import Select from "react-select";
import { getChapters } from "../../../domain/usecases/data/getChapters";
import { supabase } from '../../../utils/supabaseClient';

interface Chapter {
  _id?: string;
  title: string;
  description: string;
  subject: string;
  order: number;
}

interface Course {
  _id?: string;
  chapter: string;
  author: string;
  lessonPdfUrl: string;
  exoPdfUrl: string;
  correctionPdfUrl: string;
  videoUrl: string;
}

const DEFAULT_AUTHOR_ID = "681883d6ea840eb0efa5f18d"; // ID d'Andry

const CourseManager = () => {
  const { subjects } = useSelector((state: RootState) => state.data);
  const dispatch = useAppDispatch();

  const [chapterData, setChapterData] = useState<Chapter>({
    title: "",
    description: "",
    subject: "",
    order: 1,
  });

  const [courseData, setCourseData] = useState<Omit<Course, "chapter">>({
    author: DEFAULT_AUTHOR_ID,
    lessonPdfUrl: "",
    exoPdfUrl: "",
    correctionPdfUrl: "",
    videoUrl: "",
  });

  const [uploading, setUploading] = useState({
    video: false,
    lesson: false,
    exo: false,
    correction: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coursesWithChapters, setCoursesWithChapters] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const subjectOptions = (subjects as SubjectInterface[]).map((subj) => ({
    value: subj.id,
    label: `${subj.name} ${subj.level ? "(" + subj.level.name + (subj.level.serie ? "  " + subj.level.serie : "") + ")" : ""}`,
  }));

  const allUploadsDone = Object.values(uploading).every((val) => val === false) &&
    courseData.videoUrl && courseData.lessonPdfUrl && courseData.exoPdfUrl && courseData.correctionPdfUrl;

  const uploadFile = async (
    file: File,
    type: 'video' | 'lesson' | 'exo' | 'correction'
  ) => {
    const filePath = `${type}/${Date.now()}-${file.name}`;
    const bucket = 'haydata';

    setUploading((prev) => ({ ...prev, [type]: true }));

    try {
      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      const fileUrl = `https://rlmdnigvpmtycwfbzlvp.supabase.co/storage/v1/object/public/${bucket}/${filePath}`;
      
      if (type === 'lesson') setCourseData((prev) => ({ ...prev, lessonPdfUrl: fileUrl }));
      if (type === 'exo') setCourseData((prev) => ({ ...prev, exoPdfUrl: fileUrl }));
      if (type === 'correction') setCourseData((prev) => ({ ...prev, correctionPdfUrl: fileUrl }));
      if (type === 'video') setCourseData((prev) => ({ ...prev, videoUrl: fileUrl }));

    } catch (err) {
      console.error(`Error uploading ${type}:`, err);
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleCreate = async () => {
    if (!allUploadsDone) return alert("Veuillez attendre la fin de tous les uploads.");

    try {
      const chapterRes = await axios.post("http://localhost:8000/api/chapters/create", chapterData);
      const chapterId = chapterRes.data.id;

      await axios.post("http://localhost:8000/api/courses/create", {
        ...courseData,
        chapter: chapterId,
      });

      alert("Chapitre et cours créés avec succès !");
      setIsModalOpen(false);
      resetForm();
      fetchCourses();
      dispatch(getChapters());
    } catch (error) {
      console.error("Erreur de création", error);
    }
  };

  const resetForm = () => {
    setChapterData({
      title: "",
      description: "",
      subject: "",
      order: 1,
    });
    setCourseData({
      author: DEFAULT_AUTHOR_ID,
      lessonPdfUrl: "",
      exoPdfUrl: "",
      correctionPdfUrl: "",
      videoUrl: "",
    });
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/courses/getAll");
      setCoursesWithChapters(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des cours", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = coursesWithChapters.filter(course => {
    const matchesSearch = course.chapter?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "incomplete") {
      return matchesSearch && (!course.lessonPdfUrl || !course.videoUrl || !course.exoPdfUrl || !course.correctionPdfUrl);
    }
    return matchesSearch;
  });

  const getCompletionStatus = (course: Course) => {
    const total = 4;
    let completed = 0;
    if (course.lessonPdfUrl) completed++;
    if (course.exoPdfUrl) completed++;
    if (course.correctionPdfUrl) completed++;
    if (course.videoUrl) completed++;
    return (completed / total) * 100;
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white  overflow-hidden">
          {/* Header */}
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-black">Gestion des cours</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
                >
                +
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className=" border-b px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Rechercher par titre de chapitre..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2">
                <button 
                  className={`px-4 py-2 rounded-lg ${activeTab === 'all' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                  onClick={() => setActiveTab('all')}
                >
                  Tous
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg ${activeTab === 'incomplete' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                  onClick={() => setActiveTab('incomplete')}
                >
                  Incomplets
                </button>
              </div>
            </div>
          </div>

          {/* Course Cards */}
          <div className="p-6">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M19 21a7 7 0 01-14 0V5a7 7 0 0114 0v16z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun cours trouvé</h3>
                <p className="mt-1 text-gray-500">Commencez par créer un nouveau cours.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <div key={course._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.chapter?.title || 'Sans titre'}</h3>
                      <p className="text-sm text-gray-600 mb-4">{course.chapter?.description || 'Aucune description'}</p>
                      
                      <div className="mb-4">
                        <div className="relative pt-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block text-blue-600">
                                Progression
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-semibold inline-block text-blue-600">
                                {Math.round(getCompletionStatus(course))}%
                              </span>
                            </div>
                          </div>
                          <div className="flex h-2 mt-1 overflow-hidden rounded bg-gray-200">
                            <div
                              style={{ width: `${getCompletionStatus(course)}%` }}
                              className="bg-blue-500"
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={course.lessonPdfUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center px-3 py-2 text-sm rounded-md ${course.lessonPdfUrl ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                          </svg>
                          Leçon
                        </a>
                        <a
                          href={course.exoPdfUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center px-3 py-2 text-sm rounded-md ${course.exoPdfUrl ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                          Exercices
                        </a>
                        <a
                          href={course.correctionPdfUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center px-3 py-2 text-sm rounded-md ${course.correctionPdfUrl ? 'bg-purple-50 text-purple-700 hover:bg-purple-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Correction
                        </a>
                        <a
                          href={course.videoUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center px-3 py-2 text-sm rounded-md ${course.videoUrl ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                          </svg>
                          Vidéo
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-screen overflow-auto">
            <div className="bg-[#103928] to-indigo-700 p-4 rounded-t-xl flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Créer un nouveau cours</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">

              <div className="grid md:grid-cols-2 gap-8">
                {/* Formulaire Chapitre */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Informations du chapitre
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Titre du chapitre</label>
                      <input
                        type="text"
                        placeholder="Ex: Introduction à l'algèbre"
                        value={chapterData.title}
                        onChange={(e) => setChapterData({ ...chapterData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        placeholder="Une brève description du chapitre..."
                        value={chapterData.description}
                        onChange={(e) => setChapterData({ ...chapterData, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Matière</label>
                      <Select
                        options={subjectOptions}
                        value={subjectOptions.find((opt) => opt.value === chapterData.subject)}
                        onChange={(opt) => setChapterData({ ...chapterData, subject: opt?.value || "" })}
                        placeholder="Sélectionner une matière"
                        classNamePrefix="select"
                        className="text-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ordre</label>
                      <input
                        type="number"
                        min={1}
                        value={chapterData.order}
                        onChange={(e) => setChapterData({ ...chapterData, order: Math.max(1, +e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Formulaire Cours */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Contenu du cours
                  </h3>
                  
                  <div className="grid gap-4">
                    {/* Upload cards with progress bars */}
                    <div className="p-4 border border-blue-200 rounded-lg shadow-sm bg-white relative hover:shadow-md transition-shadow">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                        PDF du cours
                      </label>
                      
                      <div className="flex items-center">
                        <div className="flex-1">
                          <input
                            id="lesson"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => e.target.files && uploadFile(e.target.files[0], "lesson")}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                        </div>
                        
                        {courseData.lessonPdfUrl && (
                          <svg className="h-5 w-5 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      
                      {uploading.lesson && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full w-full animate-pulse"></div>
                          </div>
                          <p className="mt-1 text-xs text-blue-600">Téléversement en cours...</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 border border-green-200 rounded-lg shadow-sm bg-white relative hover:shadow-md transition-shadow">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        PDF des exercices
                      </label>
                      
                      <div className="flex items-center">
                        <div className="flex-1">
                          <input
                            id="exo"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => e.target.files && uploadFile(e.target.files[0], "exo")}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                          />
                        </div>
                        
                        {courseData.exoPdfUrl && (
                          <svg className="h-5 w-5 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      
                      {uploading.exo && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full w-full animate-pulse"></div>
                          </div>
                          <p className="mt-1 text-xs text-green-600">Téléversement en cours...</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 border border-purple-200 rounded-lg shadow-sm bg-white relative hover:shadow-md transition-shadow">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        PDF de la correction
                      </label>
                      
                      <div className="flex items-center">
                        <div className="flex-1">
                          <input
                            id="correction"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => e.target.files && uploadFile(e.target.files[0], "correction")}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                          />
                        </div>
                        
                        {courseData.correctionPdfUrl && (
                          <svg className="h-5 w-5 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      
                      {uploading.correction && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full w-full animate-pulse"></div>
                          </div>
                          <p className="mt-1 text-xs text-purple-600">Téléversement en cours...</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 border border-red-200 rounded-lg shadow-sm bg-white relative hover:shadow-md transition-shadow">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        Vidéo du cours
                      </label>
                      
                      <div className="flex items-center">
                        <div className="flex-1">
                          <input
                            id="video"
                            type="file"
                            accept="video/*"
                            onChange={(e) => e.target.files && uploadFile(e.target.files[0], "video")}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                          />
                        </div>
                        
                        {courseData.videoUrl && (
                          <svg className="h-5 w-5 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      
                      {uploading.video && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-red-600 h-2 rounded-full w-full animate-pulse"></div>
                          </div>
                          <p className="mt-1 text-xs text-red-600">Téléversement en cours...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Upload status summary */}
              <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-3">Statut des fichiers</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className={`p-3 rounded-lg border ${courseData.lessonPdfUrl ? 'bg-green-50 border-green-200' : 'bg-gray-100 border-gray-200'}`}>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${courseData.lessonPdfUrl ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="text-sm font-medium">PDF Leçon</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${courseData.exoPdfUrl ? 'bg-green-50 border-green-200' : 'bg-gray-100 border-gray-200'}`}>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${courseData.exoPdfUrl ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="text-sm font-medium">PDF Exercices</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${courseData.correctionPdfUrl ? 'bg-green-50 border-green-200' : 'bg-gray-100 border-gray-200'}`}>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${courseData.correctionPdfUrl ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="text-sm font-medium">PDF Correction</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${courseData.videoUrl ? 'bg-green-50 border-green-200' : 'bg-gray-100 border-gray-200'}`}>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${courseData.videoUrl ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="text-sm font-medium">Vidéo</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex items-center justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!allUploadsDone}
                  className={`px-6 py-2 rounded-lg text-white font-medium flex items-center ${
                    allUploadsDone 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800' 
                      : 'bg-gradient-to-r from-blue-300 to-indigo-400 cursor-not-allowed'
                  }`}
                >
                  {allUploadsDone ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Créer le cours
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      En attente des fichiers...
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManager;