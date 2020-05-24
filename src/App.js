import React from 'react';
import Formulario from './components/Formulario';

function App() {
  return (
   <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario />
      </div>
   </div>
  );
}

export default App;
