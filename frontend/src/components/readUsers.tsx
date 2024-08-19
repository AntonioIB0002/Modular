import { useCollection, useQuery } from '@squidcloud/react';

type user = { id: number; comentario: string; devise: string; fecha_hora: Date; lenguaje: string; rating: number; };

export default function ReadUsers() {
  const collection = useCollection<user>('comentarios','modulardb_id');
  /** The list of users will be streamed to the client and kept up-to-date */
  const comentarios = useQuery(collection.query());

  return (
    <ul style={{ listStyle: 'none', paddingLeft: '0px' }}>
      {comentarios.data.map((user) => (
        <li key={user.data.id}>
          {user.data.comentario}
        </li>
      ))}
    </ul>
  );
}