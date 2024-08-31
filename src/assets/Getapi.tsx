import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/vistaCarnet.css';
import logo from '../assets/logo.png'; // Ruta para el Logo UMG

const Estudiantes = () => {
  // Estado para la lista de estudiantes
  const [data, setData] = useState([]);
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para el estudiante seleccionado
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  // Estado para manejar mensajes de error
  const [errorMessage, setErrorMessage] = useState('');
  // Estado para manejar mensajes de información
  const [infoMessage, setInfoMessage] = useState('');

  useEffect(() => {
    // Solicitar datos a la API
    axios.get('/api/estudiantes')
      .then(response => {
        // Ajuste de la estructura de datos
        setData(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los datos:", error);
        setErrorMessage('Hubo un error al obtener los datos.'); // Mostrar mensaje de error
      });
  }, []);

  const handleSearch = () => {
    // Limpia los mensajes previos
    setErrorMessage('');
    setInfoMessage('');

    if (searchTerm.trim() === '') {
      setErrorMessage('Por favor ingrese un carnet válido.');
      return;
    }

    // Buscar el estudiante por carnet
    const estudiante = data.find(est => est.Carnet.includes(searchTerm.trim()));

    if (estudiante) {
      setSelectedEstudiante(estudiante);
    } else {
      setSelectedEstudiante(null);
      setInfoMessage('No se encontraron datos para el carnet ingresado.'); // Mostrar mensaje si no se encuentra el carnet
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedEstudiante(null);
    setErrorMessage('');
    setInfoMessage('');
  };

  return (
    <div className="form-container">
      <div className="header">
        <h1>Consulta de alumnos</h1>
        <img src={logo} alt="Logo de la universidad" className="logo" />
      </div>

      <div className="form-group">
        <label>Carnet:</label>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      {/* Mostrar mensajes de error e información */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {infoMessage && <div className="info-message">{infoMessage}</div>}

      <div className="form-group">
        <label>Nombres:</label>
        <input 
          type="text" 
          value={selectedEstudiante ? selectedEstudiante.Estudiante : ''} 
          disabled 
        />
      </div>
      <div className="form-group">
        <label>Correo Electrónico:</label>
        <input 
          type="text" 
          value={selectedEstudiante ? selectedEstudiante.Email : ''} 
          disabled 
        />
      </div>
      <div className="form-group">
        <label>Sección:</label>
        <input 
          type="text" 
          value={selectedEstudiante ? selectedEstudiante.Seccion : ''} 
          disabled 
        />
      </div>

      <div className="button-group">
        <button onClick={handleSearch}>Buscar</button>
        <button onClick={handleClear}>Limpiar</button>
        <button onClick={() => window.location.reload()}>Cancelar</button>
      </div>
    </div>
  );
};

export default Estudiantes; //Estudiantes
