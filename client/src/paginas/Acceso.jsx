import { Card, Message, Button, Input, Label} from "../componentes/ui";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../contexto/autenticacionContexto";

export const Acceso = () => {
  const { signin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit =  handleSubmit(async (data) => {
    await signin(data);
  })

  useEffect(() => {
    if (isAuthenticated)navigate("/Autenticado");
  }, [isAuthenticated]);


  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        <h1 className="text-2xl font-bold">Acceso</h1>
        <form onSubmit={(onSubmit)}>
            <Label htmlFor="username">Usuario:</Label>
            <Input
              name="username"
              placeholder="Ingresa nombre de usuario"
              {...register("username", {required:true})}
            />

           {errors.correo?.message && (
              <p className="text-red-500">{errors.correo?.message}</p>
            )}
           
            <Label htmlFor="password">Contraseña:</Label>
            <Input
              type="password"
              name="password"
              placeholder="********"
              {...register("password", {required:true})}
            />
          
            {errors.contraseña?.message && (
              <p className="text-red-500">{errors.contraseña?.message}</p>
            )}
  
          <Button >Acceder</Button>
          </form>

        <p className="flex gap-x-2 justify-between">
          ¿No tienes una cuenta? <Link to="/Registro" className="text-sky-500">Registrarse</Link>
        </p>
      </Card>
    </div>
  );
};

export default Acceso;
