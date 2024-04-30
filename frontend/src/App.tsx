import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { BlogPost } from './pages/BlogPost'
import { Landing } from './pages/Landing'
import { Draft } from './pages/Draft'
import { Delete } from './pages/Delete'
import { Publish } from './pages/Publish'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing /> }/>
        <Route path='/signup' element={<Signup /> }/>
        <Route path='/signin' element={<Signin /> }/>
        <Route path='/blog/:id' element={<Blog /> }/>
        <Route path='/blogs' element={<Blogs /> }/>
        <Route path='/draft' element={<Draft /> }/>
        <Route path='/blog/post' element={<BlogPost /> }/>
        <Route path='/delete' element={<Delete /> }/>
        <Route path='/publish' element={<Publish /> }/>
      </Routes>
    </BrowserRouter> 
  )
}

export default App
