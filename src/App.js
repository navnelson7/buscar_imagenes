import React,{useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import Listadoimagenes from './components/Listadoimagenes';

function App() {
  const [busqueda,guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactua,guargarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalpaginas] = useState(1);
  ///state
  useEffect(() => {
    const consultarAPI = async () => {
      if(busqueda === '') return;
        const imagenesPorPagina = 30;
        const key = '16713189-7aa606c51c73355eca7dd4b9a';
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarImagenes(resultado.hits);
        //calcular el total de paginas
        const calcularTotalPaingas = Math.ceil(resultado.totalHits / imagenesPorPagina);
        guardarTotalpaginas(calcularTotalPaingas);
    } 
    consultarAPI();
  },[busqueda])

  //definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactua -1;
    if(nuevaPaginaActual === 0) return;
    guargarPaginaActual(nuevaPaginaActual);
  }
  
  
  //definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactua +1;
    if(nuevaPaginaActual > totalpaginas) return;
    guargarPaginaActual(nuevaPaginaActual);
  }



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
        <button 
          type='button'
          className='btn btn-info mr-1'
          onClick={paginaAnterior}
        >&laquo; Anterior </button>
        <button 
          type='button'
          className='btn btn-info'
          onClick={paginaSiguiente}
        >Siguiente &raquo;</button>
      </div>
   </div>
  );
}

export default App;
