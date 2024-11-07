import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import SignUp from './Pages/SignUp.tsx'
import SignIn from './Pages/SignIn.tsx'
import Blogs from './Pages/Blogs.tsx'
import Profile from './Pages/Profile.tsx'
import ReadBlog from './Pages/ReadBlog.tsx'
import WriteBlog from './Pages/WriteBlog.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/blog/:id' element={<ReadBlog/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/new-blog' element={<WriteBlog/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
