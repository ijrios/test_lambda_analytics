import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexto/autenticacionContexto";

function Adios() {
    const {logout, isAuthenticated,username} = useAuth();

    const handleLogout = () => {
        logout();
    };

    useEffect(() => {
       if(!isAuthenticated) navigate("/Adios");
     }, [isAuthenticated]);
   
  return (
  <section className="flex justify-center items-center">
    <header className="bg-zinc-800 p-6 rounded-lg bg-opacity-50 w-4/5 max-w-2xl text-center mt-8">
    <h1 className="text-2xl py-4 font-bold">Sesion cerrada</h1>
    <p className="text-sm text-slate-400">
    
    Hasta luego {username}, te esperamos pronto!
  </p>

  <Link
    className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
    onClick={handleLogout}
  >
    Confirmar
  </Link>
</header>
  </section>
  );
}

export default Adios;
