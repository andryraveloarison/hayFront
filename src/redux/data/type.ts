import { ChapterInterface, LevelInterface, SubjectInterface } from "../../types/DataInterface";

export interface DataState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    levels: LevelInterface | [];
    subjects: SubjectInterface | [];
    chapters: ChapterInterface  | [];
}

