

import { Route, Routes } from 'react-router'
import Employees from './Employees'
import Products from './Products'
function App() {



  return (
    <>
      <Routes>
        <Route path="/" element={<Employees></Employees>} />
        <Route path="/products" element={<Products></Products>} />
      </Routes>
    </>
  )
}

export default App
