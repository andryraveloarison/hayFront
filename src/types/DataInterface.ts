import { Level } from "../pages/page/admin/LevelManager";

export interface DataInterface {
    levels: LevelInterface[]; 
    subjects: SubjectInterface[];
    chapters: ChapterInterface[];
}


export interface LevelInterface {
    id: string;
    name: string;
    description?: string;
    serie?: string;
}
  

export interface SubjectInterface {
    id: string;
    name: string;
    level: LevelInterface;            // ID du niveau (Level._id)
    chapters: ChapterInterface[]; // Liste des chapitres liés à la matière
  }

  export interface ChapterInterface {
    order: string;
    id: string;
    title: string;
    description: string;
    subject: SubjectInterface;        // ID de la matière
    course: CourseInterface[];         // Liste des cours dans le chapitre
  }

  
  export interface CourseInterface {
    id: string;
    title: string;
    content: string;
    chapter: string;
    author: string;
    lessonPdfUrl?: string;
    correctionPdfUrl?: string;
    videoUrl?: string;
    order?: number; // Position du cours dans la partie
    createdAt?: Date;
  }
  
  