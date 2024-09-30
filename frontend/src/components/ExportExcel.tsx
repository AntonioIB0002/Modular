import React from 'react';
import * as XLSX from 'xlsx';

// Definir el tipo de los datos (puedes ajustar esto según tu estructura de datos)
interface DataType {
    id: number; 
    comentario: string; 
    devise: string; 
    fecha_hora: Date; 
    lenguaje: string; 
    rating: number; 
    comentario_analizado: string;
}

interface ExportExcelProps {
  data: DataType[]; // El parámetro `data` es un array de objetos tipo `DataType`
}

const ExportExcel: React.FC<ExportExcelProps> = ({ data }) => {
  // Función para exportar el JSON a un archivo Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data_export.xlsx");
  };
const Template = () =>{
    const templateData = [
        ["Review Text", "Any type1", "Any type2"],
        ["Comentario a analizar", "Any type1", "Any type2"],
      ];
  
      const worksheet = XLSX.utils.aoa_to_sheet(templateData);
    
      // Crear un nuevo libro de trabajo y agregar la hoja de trabajo
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
  
      // Exportar el archivo Excel
      XLSX.writeFile(workbook, "template_export.xlsx");
}
  return (
    <div>
      <button onClick={exportToExcel}>Exportar a Excel</button>
      <button onClick={Template}> Template</button>
    </div>
  );
};

export default ExportExcel;
