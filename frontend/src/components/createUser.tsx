import { useCollection } from '@squidcloud/react';
import { useState } from 'react';
// Define your type
// type User = { id: string; email: string; age: number };
type comentarios = {comentario:string}

export default function CreateUser() {
  const [text, setText] = useState<string>('');

  const userCollection = useCollection<comentarios>('comentarios','modulardb_id')
  const insert = () => {
    userCollection.doc().insert({
      comentario:text,

    });
  };

  // const userCollection = useCollection<User>('users', 'modulardb_id');
  
  // const insert = () => {
  //   const userId = crypto.randomUUID();
  //   const email = `${userId}@email.com`;
    
  //   userCollection.doc(userId).insert({
  //     id: userId,
  //     email,
  //     age: Math.ceil(Math.random() * 100),
  //   }).then(() => {
  //     console.log('User inserted successfully');
  //   }).catch(error => {
  //     console.error('Error inserting user:', error);
  //   });
  // };
  
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
