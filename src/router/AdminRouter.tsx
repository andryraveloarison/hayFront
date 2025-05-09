import {Routes, Route} from 'react-router-dom'
import Layout from '../pages/page/Layout';
import Dash from '../pages/page/Dash';
import LevelManager from '../pages/page/admin/LevelManager';
import SubjectManager from '../pages/page/admin/SubjectManager';
import CourseManager from '../pages/page/admin/CourseManager';
import CourseExplorer from '../pages/page/CourseViewer';
import CoursePage from '../pages/page/CoursePage';

const AdminRouter = () => {
    return (
        <Routes>
          <Route element={<Layout/>}>
            <Route index element={<Dash/>}/>
            <Route path="/level" element={<LevelManager/>}/> 
            <Route path="/subject" element={<SubjectManager/>}/> 
            <Route path="/course" element={<CourseManager/>}/> 
            <Route path="/view" element={<CourseExplorer/>}/> 
            <Route path="/courses/:id" element={<CoursePage />} />
          </Route>
        </Routes>
    );
}

export default AdminRouter;
