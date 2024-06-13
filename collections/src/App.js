import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Auth } from './pages/auth/index'
import { SignOut } from './pages/auth/signOut'
import { Collections } from './pages/collections-manager/index'
import { ViewItems } from './pages/collections-manager/viewItems'
import { Navbar } from './Navbar.js'

function App () {
  return (
    <div className='App'>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' exact element={<Auth />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='/viewItems' element={<ViewItems />} />
          <Route path='/signOut' element={<SignOut />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
