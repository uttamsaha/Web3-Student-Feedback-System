import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import ProtectedAdmin from './Pages/ProtectedRoute/ProtectedAdmin';
import ProtectedFaculty from './Pages/ProtectedRoute/ProtectedFaculty';
import ProtectedStudent from './Pages/ProtectedRoute/ProtectedStudent';
import AdminLayout from './Pages/Roles/AdminRole/Layout/AdminLayout';
import AdminDashboard from './Pages/Roles/AdminRole/components/AdminDashboard';
import Account from './Pages/Roles/AdminRole/components/Account';
import StudentLayout from './Pages/Roles/StudentRole/Layout/StudentLayout';
import StudentDashboard from './Pages/Roles/StudentRole/components/StudentDashboard';
import FacultyLayout from './Pages/Roles/FacultyRole/Layout/FacultyLayout';
import FacultyDashboard from './Pages/Roles/FacultyRole/components/FacultyDashboard';
import ViewFeedbacks from './Pages/Roles/FacultyRole/components/ViewFeedbacks';
import { FeedbackContext } from './Pages/Context/Context';
import NotFound from './Pages/Shared/NotFound';
import ViewAllFeedbacks from './Pages/Roles/AdminRole/components/ViewAllFeedbacks';
import SubmitFeedback from './Pages/Roles/StudentRole/components/SubmitFeedback';
import CourseEnroll from './Pages/Roles/StudentRole/components/CourseEnroll';
import AddCourses from './Pages/Roles/AdminRole/components/AddCourses';
import AllCourses from './Pages/Roles/AdminRole/components/AllCourses';
import ViewFacultyFeedbacks from './Pages/Roles/FacultyRole/components/ViewFeedbacks';


const App = () => {
  const {signIn, wallet} = useContext(FeedbackContext);
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/admin' element={<ProtectedAdmin signIn={signIn} wallet={wallet}><AdminLayout><AdminDashboard></AdminDashboard></AdminLayout></ProtectedAdmin>}></Route>
        <Route path='/admin/view-all-feedbacks' element={<ProtectedAdmin signIn={signIn} wallet={wallet}><AdminLayout><ViewAllFeedbacks></ViewAllFeedbacks></AdminLayout></ProtectedAdmin>}></Route>
        <Route path='/admin/create-account' element={<ProtectedAdmin signIn={signIn} wallet={wallet}><AdminLayout><Account></Account></AdminLayout></ProtectedAdmin>}></Route>
        <Route path='/admin/add-courses' element={<ProtectedAdmin signIn={signIn}wallet={wallet}><AdminLayout><AddCourses></AddCourses></AdminLayout></ProtectedAdmin>}></Route>
        <Route path='/admin/all-courses' element={<ProtectedAdmin signIn={signIn} wallet={wallet}><AdminLayout><AllCourses></AllCourses></AdminLayout></ProtectedAdmin>}></Route>
        <Route path='/faculty' element={<ProtectedFaculty signIn={signIn} wallet={wallet}><FacultyLayout><FacultyDashboard></FacultyDashboard></FacultyLayout></ProtectedFaculty>}></Route>
        <Route path='/faculty/view-feedbacks' element={<ProtectedFaculty signIn={signIn} wallet={wallet}><FacultyLayout><ViewFacultyFeedbacks></ViewFacultyFeedbacks></FacultyLayout></ProtectedFaculty>}></Route>
        <Route path='/student' element={<ProtectedStudent signIn={signIn} wallet={wallet}><StudentLayout><StudentDashboard></StudentDashboard></StudentLayout></ProtectedStudent>}></Route>
        <Route path='/student/submit-feedback' element={<ProtectedStudent signIn={signIn} wallet={wallet}><StudentLayout><SubmitFeedback></SubmitFeedback></StudentLayout></ProtectedStudent>}></Route>
        <Route path='/student/course-enroll' element={<ProtectedStudent signIn={signIn} wallet={wallet}><StudentLayout><CourseEnroll></CourseEnroll></StudentLayout></ProtectedStudent>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  )
}

export default App;