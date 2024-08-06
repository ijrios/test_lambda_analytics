import { Link } from "react-router-dom";
import { useAuth } from "../contexto/autenticacionContexto";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, username} = useAuth();
  console.log(isAuthenticated, username)

  return (
    <nav className="bg-zinc-700 my-0 flex justify-between bg-opacity-50 py-5 px-10">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/Pagina_inicio" : "/"}>Lambda Analytics</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Bienvenido {username}
            </li>
            <li>
              <ButtonLink to="/SubirDocumento">Descarga</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/Adios" onClick={() => logout()}>
                Cerrar sesión
              </ButtonLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/Acceso">Acceso</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/Registro">Registrar</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
