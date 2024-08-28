import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import Boton from './assets/Button'
import Consulta from './assets/Getapi'
//import ConsultaTab from './assets/GetapiTable'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="App">
      <Consulta />
    </div>   
    </>
  )
}

export default App
