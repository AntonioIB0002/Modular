import React, { useState } from 'react';
import './App.css';
import CreateUser from './components/createUser';
import ReadUsers from './components/readUsers';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import axios from 'axios';
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

  const handleSubmit = async () => {
    try {
      // Llama a la ruta '/test/submit' con el mensaje
      const result = await axios.post('https://xt01fcyhd56kellr99-dev.us-east-1.aws.squid.cloud/openapi/test/submit', { message });
      setResponse(result.data);
    } catch (error) {
      console.error('Error submitting data:', error);
      setResponse('Error submitting data');
    }
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

  return (
    <>
      <h1>Bienvenidos a feeling person</h1>
      <CreateUser />
      <ReadUsers />

      <div>
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ingresa el texto"
        />
        <button onClick={handleSubmit}>Analizar</button>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>

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
