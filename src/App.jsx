import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Homepage } from './pages/Homepage'

import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import { Main } from './Layout/Main'
import { ProductDetail } from './pages/ProductDetail'
import { Users } from './pages/Users'
import { Posts } from './pages/UserPosts'
// import 'primeicons/primeicons.css'; 
// import 'primeflex/primeflex.css'; 




function App() {

  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route element={<Main />}>
          <Route index path='/' element={<Navigate to="/products" />} />
          <Route  path='/home' element={<Navigate to="/products" />} />
          <Route  path='/products' element={<Homepage />} />
          <Route path='/product/:id' element={<ProductDetail />}/>
          <Route path='/users' element={<Users />} />
          <Route path='/user/:id' element={<Posts />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
