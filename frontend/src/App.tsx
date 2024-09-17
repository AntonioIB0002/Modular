import React, { useState, useEffect} from 'react';
import './App.css';
import CreateUser from './components/createUser';
import ReadUsers from './components/readUsers';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
// import axios from 'axios';
// import { Squid } from '@squidcloud/client';

const App: React.FC = () => {
  // const [text, setText] = useState<string>('');
  const [fileData, setFileData] = useState<any[]>([]);
  // const squid = new Squid({ appId: 'xt01fcyhd56kellr99', region: 'us-east-1.aws' });
  // const analizar = async () => {
  //   const result = await squid.executeFunction('concat', 'string1', 'string2');
  //   console.log(result);
  
  // };
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      // Realizar la solicitud POST al servidor Express
      fetch('http://localhost:3000/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }), // Enviar el mensaje al backend
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Response from server:', data);
          setResponse(`Sentiment Analysis: ${JSON.stringify(data.sentiment)}`);
        })
        .catch((error) => console.error('Error:', error));
    };
  
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setFileData(jsonData);
        console.log(jsonData);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  useEffect(() => {
    // Realizar la solicitud GET a Express
    fetch('http://localhost:3000/hello')
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error('Error:', error));
  }, []);
  return (
    <>
      <h1>Bienvenidos a feeling person</h1>
      <CreateUser />
      <ReadUsers />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here"
        />
        <button type="submit">Send</button>
      </form>
      <p>{response}</p>
      <div {...getRootProps()} style={{ border: '2px dashed #cccccc', padding: '20px', marginTop: '20px' }}>
        <input {...getInputProps()} />
        <p>Arrastra y suelta un archivo aquí, o haz clic para seleccionar un archivo</p>
      </div>

      {fileData.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Datos del Archivo:</h3>
          <table style = {{border:"1",padding:"10"}}>
            <thead>
              <tr>
                {Object.keys(fileData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fileData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>
                      {typeof value === 'string' || typeof value === 'number' 
                        ? value 
                        : JSON.stringify(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default App;
