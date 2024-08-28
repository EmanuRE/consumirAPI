import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/Estudiantes.css';
import logo from '../assets/logo.png'; // Asegúrate de que la ruta sea correcta

const Estudiantes = () => {
  // Estado para almacenar la lista de estudiantes
  const [data, setData] = useState([]);
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para el estudiante seleccionado
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);

  useEffect(() => {
    // Realizar la solicitud a la API
    axios.get('/api/estudiantes')
      .then(response => {
        // Ajusta esto según la estructura real de los datos
        setData(response.data); // Asume que response.data es la lista de estudiantes
      })
      .catch(error => {
        console.error("Hubo un error al obtener los datos:", error);
      });
  }, []);

  const handleSearch = () => {
    // Busca el estudiante cuyo carnet coincida con el término de búsqueda
    const estudiante = data.find(est => est.Carnet.includes(searchTerm.trim()));
    setSelectedEstudiante(estudiante);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedEstudiante(null);
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

export default Estudiantes;
