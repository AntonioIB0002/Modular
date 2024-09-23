import { useCollection, useQuery } from '@squidcloud/react';

type user = { 
  id: number; 
  comentario: string; 
  devise: string; 
  fecha_hora: Date; 
  lenguaje: string; 
  rating: number; 
  comentario_analizado: string;
};

export default function ReadUsers() {
  const collection = useCollection<user>('comentarios', 'modulardb_id');
  /** La lista de comentarios se mantendrá actualizada y se transmitirá al cliente */
  const comentarios = useQuery(collection.query());

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '8px' }}>Comentario</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Comentario Analizado</th>
        </tr>
      </thead>
      <tbody>
        {comentarios.data.map((user, index) => (
          <tr key={user.data.id || index}>
            <td style={{ border: '1px solid black', padding: '8px' }}>
              {user.data.comentario}
            </td>
            <td style={{ border: '1px solid black', padding: '8px' }}>
              {user.data.comentario_analizado || 'Sin análisis'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
