import React,{useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import Listadoimagenes from './components/Listadoimagenes';

function App() {
  const [busqueda,guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  useEffect(() => {
    const consultarAPI = async () => {
      if(busqueda === '') return;
        const imagenesPorPagina = 30;
        const key = '16713189-7aa606c51c73355eca7dd4b9a';
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarImagenes(resultado.hits);
    } 
    consultarAPI();
  },[busqueda])
  return (
   <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className='row justify-content-center'>
        <Listadoimagenes 
          imagenes = {imagenes}
        />
      </div>
   </div>
  );
}

export default App;
