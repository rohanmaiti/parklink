import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import toast, { Toaster } from 'react-hot-toast'
import { Login } from './pages/Login'
import { Navbar } from './components/Navbar'
import { Routes, Route, Outlet, useNavigate, Navigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Landingpage } from './pages/Landingpage'
import { useAuthStore } from './store/useAuthStore'
import BookSlot from './pages/BookSlot'
import { ParkingSpace } from './components/ParkingSpace'
import { Checkout } from './pages/Checkout'
import { ProfilePage } from './pages/ProfilePage'
import { Parking } from './components/Parking'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'
import { LoadingSkeleton } from './components/LoadingSkeleton'
import { YouTubeVideosPage } from './pages/YouTubeVideosPage'
function App() {
  const {checkAuth, authUser, isCheckingAuth} = useAuthStore();
  const [count, setCount] = useState(0)
  const [loginUser , setLoginuser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  return (
    <>
      {isCheckingAuth ? <LoadingSkeleton/> : <>
      <Routes> 
        <Route path="/" element={<Landingpage />}/> 
        <Route path="/" element={<ProtectedRoute/>}>
        <Route path='login' element={<Login />}/>
        <Route path='signup' element={<Signup />}/>
        <Route path='forgotpassword' element={<ForgotPasswordPage  setLoginuser={setLoginuser} />}/>
        </Route>
        
        <Route path="/" element={<AuthRoutes/>} >
       <Route path="locate" element={<div>locate page</div>} />
       <Route path="bookslots" element={<BookSlot/>}/>
       <Route path="parking/*" element={<ParkingSpace />} />
       <Route path="checkout" element={<Checkout/>} />
       <Route path="profile" element={<ProfilePage/>} />
       </Route>

       <Route path="/showVideo" element={<YouTubeVideosPage/>}/>
      
      </Routes>
      <Toaster/>
      </>
      }
    </>
  )
}

export default App

function ProtectedRoute(){
  const {authUser} = useAuthStore();
  return (
    <>
    {!authUser ? <Outlet/> : <Navigate to="/" /> }
    </>
  )
}

function AuthRoutes(){
  const {authUser} = useAuthStore();
  return (
    <>
    {authUser ? <Outlet/> : <Navigate to="/login" /> }
    </>
  )
}
