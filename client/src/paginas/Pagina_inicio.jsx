import { Link } from "react-router-dom";

function Pagina_inicio() {
  return (
  <section className="flex justify-center items-center">
    <header className="bg-zinc-800 p-6 rounded-lg bg-opacity-50 w-4/5 max-w-2xl text-center mt-8">
    <h1 className="text-2xl py-4 font-bold">Prueba de desarollo web - Lambda Analytics</h1>
    <p className="text-sm text-slate-400">
    
    A continuacion, podran observar la prueba desginada para ingresar a este trabajo,
    se podra registrar, iniciar sesion, y descargar un archivo de la pagina del Dane.

    El backend de la aplicación está construido utilizando Django REST Framework, lo que garantiza
    una gestión segura y eficiente de las solicitudes y respuestas API. Además, se ha implementado
    un sistema de autenticación basado en tokens, lo que permite a los usuarios autenticarse y 
    mantener sesiones seguras a lo largo de su interacción con la aplicación.

    El frontend, desarrollado con Vite y React, ofrece una interfaz moderna y responsiva que facilita 
    la interacción del usuario. React se encarga de la gestión del estado de la aplicación y la representación 
    dinámica de componentes, mientras que Vite proporciona un entorno de desarrollo rápido y optimizado.
  </p>

  <Link
    className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
    to="/Registro"
  >
    Registrate ya
  </Link>
</header>
  </section>
  );
}

export default Pagina_inicio;
