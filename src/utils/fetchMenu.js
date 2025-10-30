import { getGoogleDriveDirectLink } from './googleDriveUtils';

// src/utils/fetchMenu.js
export async function fetchMenu(sheetId, sheetName = 'menu') {
  try {
    // console.log("Attempting to fetch menu from Google Sheets...");
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Sheets');
    }

    const csvText = await response.text();
    const parsedData = parseCSV(csvText);
    // console.log("Successfully fetched and parsed menu data.", parsedData);
    return parsedData;
    
  } catch (error) {
    console.error('Error fetching menu. Using fallback data:', error);
    // Return fallback data if the fetch fails
    return [
      { category: 'Starters', name: 'Paneer Tikka', price: 120, imageUrl: '' },
      { category: 'Starters', name: 'Hara Bhara Kabab', price: 180, imageUrl: '' },
      { category: 'Main Course', name: 'Paneer Butter Masala', price: 260, imageUrl: '' },
      { category: 'Breads', name: 'Butter Naan', price: 30, imageUrl: '' },
      { category: 'Beverages', name: 'Lassi', price: 60, imageUrl: '' },
      { category: 'Desserts', name: 'Gulab Jamun', price: 70, imageUrl: '' }
    ];
  }
}

function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  
  const data = [];
  
  // Skip header row (index 0) and process each line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') continue;
    
    // Handle quoted values that might contain commas
    const columns = line.match(/"(.*?)"|([^,\s]+)(?=\s*,|\s*$)/g) || [];
    const cleanColumns = columns.map(col => 
      col.replace(/^"|"$/g, '').trim()
    );

    if (cleanColumns.length >= 3 && cleanColumns[0] && cleanColumns[1] && cleanColumns[2]) {
      const item = {
        category: cleanColumns[0],
        name: cleanColumns[1],
        price: cleanColumns[2],
        description: cleanColumns[4] || '',
        imageUrl: getGoogleDriveDirectLink(cleanColumns[5]) || '' // Convert Google Drive link
      };
      data.push(item);
    }
  }
  
  return data;
}