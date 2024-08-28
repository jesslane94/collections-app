import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Outlet } from 'react-router'
import { Auth } from './pages/auth/index'
import { SignOut } from './pages/auth/signOut'
import { Collections } from './pages/collections-manager/index'
import { ViewItems } from './pages/collections-manager/viewItems'
import { UpdateItems } from './pages/collections-manager/updateItems'
import { AddItems } from './pages/collections-manager/addItems'
import { Navbar } from './components/Navbar.js'

function App () {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route
            element={
              <>
                <Navbar />
                <Outlet />
              </>
            }
          >
            <Route path='/collections' element={<Collections />}></Route>
            <Route path='/viewItems' element={<ViewItems />} />
            <Route path='/addItems' element={<AddItems />} />
            <Route path='updateItem/:id' element={<UpdateItems />} />
            <Route path='/signOut' element={<SignOut />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
