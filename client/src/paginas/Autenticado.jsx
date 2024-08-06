import { Link } from "react-router-dom";
import { useAuth } from "../contexto/autenticacionContexto";

function Autenticado() {
 const {username} = useAuth();
  return (
  <section className="flex justify-center items-center">
    <header className="bg-zinc-800 p-6 rounded-lg bg-opacity-50 w-4/5 max-w-2xl text-center mt-8">
    <h1 className="text-2xl py-4 font-bold">Sesion abierta</h1>
    <p className="text-sm text-slate-400">
    
    Hola {username}, ya estas dentro de la aplicacion!
  </p>

  <Link
    className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
    to="/Autenticado"
  >
    Felicitaciones
  </Link>
</header>
  </section>
  );
}

export default Autenticado;
