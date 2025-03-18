import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { Login } from './pages/login'
import { Navbar } from './components/Navbar'
import { Routes, Route, Outlet } from 'react-router-dom'
import { Signup } from './pages/signup'
import { Landingpage } from './pages/Landingpage'
import { useAuthStore } from './store/useAuthStore'
import BookSlot from './pages/BookSlot'
import { ParkingSpace } from './components/ParkingSpace'
function App() {
  const {checkAuth} = useAuthStore();
  const [count, setCount] = useState(0)
  const [loginUser , setLoginuser] = useState(undefined);
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  return (
    <>
      <Routes> 
       <Route path="/" element={<Landingpage loginUser={loginUser} setLoginuser={setLoginuser} />}/> 
       <Route path='/login' element={<Login loginUser={loginUser} setLoginuser={setLoginuser} />}/>
       <Route path='/signup' element={<Signup loginUser={loginUser} setLoginuser={setLoginuser} />}/>
       <Route path="/bookslots" element={<BookSlot/>}/>
       <Route path="/parking/*" element={<ParkingSpace />} />
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
