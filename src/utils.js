export function getColumnWidth(tableKey, columnId, defaultSize) {
    // Obtener los anchos de las columnas de la tabla especificada en localStorage
    const savedWidths = JSON.parse(localStorage.getItem(tableKey) || '{}');
  
    // Devuelve el tamaño guardado o el tamaño predeterminado si no existe
    return savedWidths[columnId]?.size || defaultSize;
  }