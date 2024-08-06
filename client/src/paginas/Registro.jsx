/*

import { zodResolver } from "@hookform/resolvers/zod";
*/
import { Card, Message, Button, Input, Label} from "../componentes/ui";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useState } from 'react';
import { useAuth } from "../contexto/autenticacionContexto";
import { registerRequest } from "../api/autenticacion";


function Registro() {
    const {signup, isAuthenticated, errors: registerErrors} = useAuth();
    //console.log(usuario)
    const {register, handleSubmit, formState:{ errors}} = useForm();
    const navigate = useNavigate();
    
    const onSubmit = async (value) => {
      await signup(value);
    };
  
    useEffect(() => {
      if (isAuthenticated) navigate("/Pagina_inicio");
    }, [isAuthenticated]);
    

    return (
      <div className="h-[calc(100vh-100px)] flex items-center justify-center">
        <Card>
          <h1 className="text-3xl font-bold">Registro</h1>
          <form onSubmit = {handleSubmit(onSubmit)}>
            <Label htmlFor="nombre">Nombre completo :</Label>
            <Input
              type="text"
              name="nombre"
              placeholder="Escribe tu nombre completo"
              {...register("nombre", {required:true})}

            />
           

            <Label htmlFor="username">Usuario:</Label>
            <Input
              type="text"
              name="username"
              placeholder="Escribe tu usuario de acceso"
              {...register("username", {required:true})}
            
  
            />
              
            <Label htmlFor="email">Correo Electrónico:</Label>
            <Input
              type= "mail"
              name="email"
              placeholder="tucorreo@dominio.com"
              {...register("email", {required:true})}
             
            />
           
            <Label htmlFor="password">Contraseña:</Label>
            <Input
              type="password"
              name="password"
              placeholder="********"
              {...register("password", {required:true})}
              autoFocus
            />

           <Label htmlFor="username">Edad:</Label>
            <Input
              type="text"
              name="edad"
              placeholder="Escribe tu edad actual"
              {...register("edad", {required:true})}
            
  
            />

         <Label htmlFor="genero">Genero:</Label>
          <select
            name="genero"
            className="w-80 bg-zinc-700 text-white px-2 py-2 rounded-md"
            style={{ fontSize: "14px" }} // Ajusta el tamaño de la fuente según sea necesario
            {...register("genero", { required: true })}
            
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>

          <Label htmlFor="cedula">Cedula:</Label>
            <Input
              type="text"
              name="cedula"
              placeholder="Escribe tu documento de identidad"
              {...register("cedula", {required:true})}
            />

           <Label htmlFor="telefono">Telefono:</Label>
            <Input
              type="text"
              name="telefono"
              placeholder="Escribe tu telefono"
              {...register("telefono", {required:true})}
            />
        
          <Button>Enviar</Button>
          </form>
          <p>
            ¿Ya tienes una cuenta? &nbsp;
            <Link className="text-sky-500" to="/Acceso">
            Acceder
            </Link>
          </p>
       </Card>
      </div>
    );
  }

export default Registro
