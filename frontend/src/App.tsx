import { useCollection,useQuery  } from '@squidcloud/react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type User = { id: number; comentario: string; devise: string; fecha_hora: string; lenguaje: string; rating: number  };

function App() {
  const [count, setCount] = useState(0)
  const collection = useCollection<User>('comentarios');
  const users = useQuery(collection.query());
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ul className="read-the-docs">
      {users.data.map((user) => (
        <li key={user.data.id}>
          {user.data.fecha_hora} - {user.data.comentario}
        </li>
      ))}
    </ul>
    </>
  )
}

export default App
