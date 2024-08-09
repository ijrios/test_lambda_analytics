import { z } from "zod";

export const Acceso_esquema = z.object({
  username: z.string().email({
    message: "Ingresa un usuario válido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe ser mayor a 6 caracteres",
  }),
});

export const Registro_esquema = z.object({

  
  correo: z.string().email({
    message: "Por favor ingresa el correo",
  }),
  pass: z.string().min(6, {
    message: "La contraseña debe ser mayor a 6 caracteres",
  }),
   nombre: z
      .string({
        required_error: "Nombre completo es requerido",
      })
      .min(3, {
        message: "El nombre debe tener mas de 3 caracteres",
      }),
    username: z
      .string({
        required_error: "Usuario es requerido",
      })
      .min(3, {
        message: "El usuario debe tener mas de 3 caracteres",
      }),
    edad: z.string().min(1, {
      message: "Plan es requerido",
    }),
    cedula: z.string().min(1, {
      message: "Plan es requerido",
    }),
    telefono: z.string().min(1, {
      message: "Plan es requerido",
    }),
  });
