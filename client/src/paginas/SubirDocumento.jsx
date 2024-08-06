import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexto/autenticacionContexto";

function SubirDocumento() {
    const [archivo, setArchivo] = useState(null);
    const { token } = useAuth();

    const handleFileChange = (event) => {
        setArchivo(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('archivo', archivo);

        try {
            const response = await axios.post('/api/subir-documento/', formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Documento subido con éxito:', response.data);
        } catch (error) {
            console.error('Error al subir el documento:', error);
        }
    };

    return (
        <section className="flex justify-center items-center">
            <form 
                onSubmit={handleSubmit} 
                className="p-6 rounded-lg bg-zinc-800 bg-opacity-50 w-4/5 max-w-2xl text-center mt-8"
            >
                <input type="file" onChange={handleFileChange} />
                
                <br /> 
                
                <button 
                    type="submit" 
                    className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4"
                >
                    Subir Documento
                </button>
            </form>
        </section>
    );
}

export default SubirDocumento;