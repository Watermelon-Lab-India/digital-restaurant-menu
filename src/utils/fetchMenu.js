import config from './config';

export const fetchMenu = async () => {
  const sheetId = config.googleSheetId;
  const sheetName = config.googleSheetName;
  const url = `https://opensheet.elk.sh/${sheetId}/${sheetName}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    
    // Transform the JSON data to match the expected menu item structure
    const menu = jsonData.map((item, index) => ({
      id: `${item.Category}-${item['Sub-Category']}-${item.Name}-${index}`.replace(/\s+/g, '-').toLowerCase(), // Unique ID for React keys
      category: item.Category || '',
      subCategory: item['Sub-Category'] || '',
      name: item.Name || '',
      price: item['Price (INR)'] || '',
      tags: item.Tags || '',
      description: item.Description || '',
      mood: item.Mood || '',
      imageUrl: item['Image Url'] || '',
    }));

    return menu;
  } catch (error) {
    console.error("Failed to fetch menu:", error);
    return [];
  }
};