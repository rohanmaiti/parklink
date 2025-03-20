import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { Login } from './pages/Login'
import { Navbar } from './components/Navbar'
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Landingpage } from './pages/Landingpage'
import { useAuthStore } from './store/useAuthStore'
import BookSlot from './pages/BookSlot'
import { ParkingSpace } from './components/ParkingSpace'
import { Checkout } from './pages/Checkout'
import { ProfilePage } from './pages/ProfilePage'
import { Parking } from './components/Parking'
import { ProtectedRoute } from './pages/ProtectedRoute'
function App() {
  const {checkAuth, authUser} = useAuthStore();
  const [count, setCount] = useState(0)
  const [loginUser , setLoginuser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  return (
    <>
      <Routes> 
       <Route path="/" element={<Landingpage  setLoginuser={setLoginuser} />}/> 
        <Route path='/login' element={<Login  setLoginuser={setLoginuser} />}/>
        <Route path='/signup' element={<Signup  setLoginuser={setLoginuser} />}/>
       {/* <Route element={<ProtectedRoute/>}> */}
       <Route path="/bookslots" element={<BookSlot/>}/>
       <Route path="/parking/*" element={<ParkingSpace />} />
       <Route path="/checkout" element={<Checkout/>} />
       <Route path="/profile" element={<ProfilePage/>} />
       {/* </Route> */}
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
