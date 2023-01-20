import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import {Home} from './pages/Home'
import { Page404 } from './pages/Page404'
import './App.css';


function App () {
  return (
    <Routes>
      <Route
        path={'/'}
        element={<Home />}
      >
      </Route>
      <Route
        path={'*'}
        element={
          <Navigate
            replace
            to={'/404'}
          />}
      />
      <Route
        path={'/404'}
        element={<Page404 />}
      >
      </Route>
    </Routes>
  )
}

export default App
