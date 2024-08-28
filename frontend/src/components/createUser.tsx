import { useCollection } from '@squidcloud/react';

// Define your type
type User = { id: string; email: string; age: number };

export default function CreateUser() {
  const userCollection = useCollection<User>('users', 'modulardb_id');
  
  const insert = () => {
    const userId = crypto.randomUUID();
    const email = `${userId}@email.com`;
    
    userCollection.doc(userId).insert({
      id: userId,
      email,
      age: Math.ceil(Math.random() * 100),
    }).then(() => {
      console.log('User inserted successfully');
    }).catch(error => {
      console.error('Error inserting user:', error);
    });
  };
  
  return (
    <>
      <button onClick={insert}>Empiece la prueba aqui</button>
    </>
  );
}
