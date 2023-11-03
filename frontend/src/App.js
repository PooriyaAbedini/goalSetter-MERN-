import React from 'react';
import { BrowserRouter as Router, Routes, Route }
from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login'
import Register from './pages/register'
import Header from './components/Header'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
            <Header />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
