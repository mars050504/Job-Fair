import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './components/shared/navbar.jsx'
import SignUp from './components/auth/Signup.jsx'
import Login from './components/auth/Login.jsx'
import Home from './components/Home.jsx'
import Jobs from './components/Jobs.jsx'
import Browse from './components/Browse.jsx'
import Profile from './components/Profile.jsx'
import JobDescription from './components/JobDescription.jsx'



const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<SignUp/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  }
])
function App() {
  

  return (
    <>
      <RouterProvider router = {appRouter}/>
    </>
  )
}

export default App