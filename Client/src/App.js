import React from 'react'
import Header from "./components/Header"
import { Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import Blog from './components/Blog'
import UserBlogs from './components/UserBlogs'
import AddBlog from './components/AddBlog'
import BlogDetails from './components/BlogDetails'

const App = () => {
  
  return (
    <>
    <header>
    <Header/>
    </header>
    <main>
      <Routes>
<Route path="/auth" element={<Login/>}/>
<Route path="/blogs" element={<Blog/>}/>
<Route path="/myBlogs" element={<UserBlogs/>}/>
<Route path="/blogs/:id" element={<BlogDetails/>}/>
<Route path="/blogs/add" element={<AddBlog/>}/>
</Routes>
</main>
     
    </>
  )
}

export default App
