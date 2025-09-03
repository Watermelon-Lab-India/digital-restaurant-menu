// src/utils/fetchMenu.js
export async function fetchMenu(sheetId, sheetName = 'menu') {
  try {
    // Construct the CSV export URL
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Sheets');
    }

    const csvText = await response.text();
    console.log('Raw CSV data:', csvText); // Log raw CSV data
    const parsedData = parseCSV(csvText);
    console.log('Parsed data:', parsedData); // Log parsed data
    return parsedData;
    
  } catch (error) {
    console.error('Error fetching menu:', error);
    // Return fallback data if the fetch fails
    return [
      { category: 'Starters', name: 'Paneer Tikka', price: 120 },
      { category: 'Starters', name: 'Hara Bhara Kabab', price: 180 },
      { category: 'Main Course', name: 'Paneer Butter Masala', price: 260 },
      { category: 'Breads', name: 'Butter Naan', price: 30 },
      { category: 'Beverages', name: 'Lassi', price: 60 },
      { category: 'Desserts', name: 'Gulab Jamun', price: 70 }
    ];
  }
}

function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  console.log('CSV lines:', lines); // Log each line of the CSV
  
  const data = [];
  
  // Skip header row (index 0) and process each line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') continue;
    
    console.log('Processing line:', line); // Log the current line being processed
    
    // Handle quoted values that might contain commas
    const columns = line.match(/"(.*?)"|([^,\s]+)(?=\s*,|\s*$)/g) || [];
    const cleanColumns = columns.map(col => 
      col.replace(/^"|"$/g, '').trim()
    );
    
    console.log('Cleaned columns:', cleanColumns); // Log cleaned columns
    
    if (cleanColumns.length >= 3 && cleanColumns[0] && cleanColumns[1] && cleanColumns[2]) {
      const item = {
        category: cleanColumns[0],
        name: cleanColumns[1],
        price: parseInt(cleanColumns[2]) || 0
      };
      console.log('Adding item:', item); // Log each item being added
      data.push(item);
    }
  }
  
  return data;
}