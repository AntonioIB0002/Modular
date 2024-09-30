import React, { useState } from 'react';
import './App.css';
import CreateUser from './components/createUser';
import ReadUsers from './components/readUsers';
import ExportExcel from './components/ExportExcel';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

const App: React.FC = () => {
  const [fileData, setFileData] = useState<any[]>([]);

  
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    // Imprimir el nombre y la extensión del archivo en consola
    console.log('Nombre del archivo:', file.name);
    const extension = file.name.split('.').pop(); // Extrae la extensión del nombre del archivo
    console.log('Extensión del archivo:', extension);
    
    if (extension != "xlsx"){
      window.alert("Archivo no valido")
    }else{
      const reader = new FileReader();
    
      reader.onload = async (e) => {
        if (e.target?.result) {
          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
          console.log(jsonData)
          // Realizar la solicitud POST al servidor para analizar el archivo Excel
          try {
            const response = await fetch('https://mature-visually-mole.ngrok-free.app/analizarExcel', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(jsonData), // Enviar los datos del archivo Excel directamente
            });
    
            const result = await response.json();
            console.log('Response from server:', result);
            
            // Actualizar el estado con los datos analizados
            setFileData(result);
          } catch (error) {
            console.error('Error fetching analyzed data:', error);
          }
        }
      };
      
      reader.readAsArrayBuffer(file);
    };
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  
  return (
    <>
      <h1>Bienvenidos a FeelFinder</h1>
      <CreateUser />
      <ReadUsers />

      
      <div {...getRootProps()} style={{ border: '2px dashed #cccccc', padding: '20px', marginTop: '20px' }}>
        <input {...getInputProps()} />
        <p>Arrastra y suelta un archivo ".xlsx" aquí , o haz clic para seleccionar</p>
      </div>

      {fileData.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Datos del Archivo:</h3>
          <table style={{ border: '1px solid black', padding: '10px' }}>
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
      <div>
        <h3>Exportar datos</h3>
        <ExportExcel data={fileData} />
    </div>
    </>
  );
};

export default App;
