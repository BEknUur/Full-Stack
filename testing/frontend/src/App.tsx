
import ResetPasswordForm from './components/ResetPasswordForm';
import RegisterForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import HomePage from './components/HomePage';
import MainDashboard from './components/MainDashboard';



function App() {
  return (
    <body>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/register' element={<RegisterForm/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/reset-password' element={<ResetPasswordForm/>}/>
        <Route path='/profile-page' element={<ProfilePage/>}/>
        <Route path='/main/*' element={<MainDashboard/>}/>
     
      </Routes>
      </BrowserRouter>
      
   
    
    </body>
  )
}

export default App
