import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'

import Consulta from './assets/Getapi' //Hacer el llamado a consulta del GetApi


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  //LLamar a la consulta desde GetApi
  return (
    <>
    <div className="App"> 
      <Consulta /> 
    </div>   
    </>
  )
}

export default App
