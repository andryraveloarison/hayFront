import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminRouter from "./router/AdminRouter"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import CourseViewer from "./pages/page/CourseViewer"
import CoursePage from "./pages/page/CoursePage"
import Landing from "./pages/public/Landing"
import NavBar from "./ui/components/NavBar"

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<NavBar />}>
            <Route path="/*" element={<Landing/>}/> 
            <Route path="/login" element={<Login/>}/> 
            <Route path="/register" element={<Register/>}/> 
            <Route path="/view" element={<CourseViewer/>}/> 
            <Route path="/courses/:id" element={<CoursePage />} />
          </Route>
        <Route 
            path="/admin/*" 
            element={
                <AdminRouter/>
            }
        />  
      </Routes>
    </BrowserRouter>
  )
}

export default App
