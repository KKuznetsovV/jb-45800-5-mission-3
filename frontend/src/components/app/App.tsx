import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from '../layout/Layout'
import './App.css'

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </>
  )
}

export default App
