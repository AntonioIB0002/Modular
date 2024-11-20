import { useCollection } from '@squidcloud/react';
import { useState } from 'react';

type Comentarios = { 
  comentario: string; 
  comentario_analizado?: string; 
  comentario_incidencia?: string; // Agregar el tipo para la incidencia
};

export default function CreateUser() {
  const [text, setText] = useState<string>('');
  const userCollection = useCollection<Comentarios>('comentarios', 'modulardb_id');

  const insert = async () => {
    // Guardar el comentario en la colección
    const docRef = userCollection.doc(); // Referencia del nuevo documento
    await docRef.insert({ comentario: text });

    // Enviar el comentario al servidor local para análisis
    try {
      const response = await fetch('https://mature-visually-mole.ngrok-free.app/analizarcomentario', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain', // Enviar como texto plano
        },
        body: text, // Enviar el comentario directamente
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud al servidor');
      }

      const result = await response.json();
      console.log('Resultado del análisis:', result);

      
      await docRef.update({ 
        comentario_analizado: result.result[0], 
        comentario_incidencia: result.result[1] 
      });
      

    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }
  };

  return (
    <>
      <div>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Ingresa el texto"
        />
        <button onClick={insert}>Analizar</button>
      </div>
    </>
  );
}
