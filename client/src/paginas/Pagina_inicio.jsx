import { Link } from "react-router-dom";

function Pagina_inicio() {
  return (
  <section className="flex justify-center items-center">
    <header className="bg-zinc-800 p-6 rounded-lg bg-opacity-50 w-4/5 max-w-2xl text-center mt-8">
    <h1 className="text-2xl py-4 font-bold">Prueba de desarollo web - Lambda Analytics</h1>
    <p className="text-sm text-slate-400">
    
    A continuacion, podran observar la prueba desginada para ingresar a este trabajo,
    se podra registrar, iniciar sesion, y descargar un archivo de la pagina del Dane,
    se implentaron tokes y Djangop Rest Framework, con el front-end en Vite + React.
  </p>

  <Link
    className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
    to="/Registro"
  >
    Get Started
  </Link>
</header>
  </section>
  );
}

export default Pagina_inicio;
