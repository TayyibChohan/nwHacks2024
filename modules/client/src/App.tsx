import 'reshaped/themes/reshaped/theme.css'
import 'reshaped/bundle.css'
import React from 'react'
import { Reshaped } from 'reshaped'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'

const App = () => {
  return (
    <Reshaped theme='reshaped'>
      <RouterProvider router={router} />
    </Reshaped>
  )
}

export default App
