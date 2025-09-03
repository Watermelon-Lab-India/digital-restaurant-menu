/**
 * Fetches menu data from a public Google Sheet
 * @param {string} sheetId - The ID of your Google Sheet (from the URL)
 * @param {string} sheetName - The name of the sheet/tab in your Google Sheet
 * @returns {Promise<Array>} - Array of menu items
 */
export async function fetchMenuData(sheetId, sheetName = 'Sheet1') {
  try {
    const sheetNameForUrl = encodeURIComponent(sheetName);
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&tq&sheet=${sheetNameForUrl}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    // The response comes with some text we need to remove
    const jsonString = text.match(/(?<=\n\n).*$/s)[0];
    const data = JSON.parse(jsonString);
    
    // Transform the data into a more usable format
    const headers = data.table.cols
      .filter(col => col.label !== '')
      .map(col => col.label);
    
    const rows = data.table.rows.map(row => {
      const item = {};
      row.c.forEach((cell, index) => {
        if (headers[index]) {
          item[headers[index].toLowerCase()] = cell?.v || '';
        }
      });
      return item;
    });
    
    return rows;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    throw error;
  }
}
