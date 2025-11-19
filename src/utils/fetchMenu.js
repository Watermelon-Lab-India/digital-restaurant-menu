// import config from './config';

// export const fetchMenu = async () => {
//   const sheetId = config.googleSheetId;
//   const sheetName = config.googleSheetName;
//   const apiKey = "AIzaSyCzban_ZwE3ThljUYlqMfEkBrrEq3BdiKk";
//   // const url = `https://opensheet.elk.sh/${sheetId}/${sheetName}`;
//   const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const jsonData = await response.json();
//     console.log(jsonData);
//     // Transform the JSON data to match the expected menu item structure
//     const menu = jsonData.map((item, index) => ({
//       id: `${item.Category}-${item['Sub-Category']}-${item.Name}-${index}`.replace(/\s+/g, '-').toLowerCase(), // Unique ID for React keys
//       category: item.Category || '',
//       subCategory: item['Sub-Category'] || '',
//       name: item.Name || '',
//       price: item['Price (INR)'] || '',
//       tags: item.Tags || '',
//       description: item.Description || '',
//       mood: item.Mood || '',
//       imageUrl: item['Image Url'] || '',
//     }));

//     return menu;
//   } catch (error) {
//     console.error("Failed to fetch menu:", error);
//     return [];
//   }
// };


import config from './config';

export const fetchMenu = async () => {
  const sheetId = config.googleSheetId;
  const sheetName = config.googleSheetName;
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    

    if (!jsonData.values || jsonData.values.length < 2) {
      return [];
    }

    const rows = jsonData.values;

    // First row is headers
    const headers = rows[0];

    // Convert rows to objects
    const menu = rows.slice(1).map((row, index) => {
      const item = {};

      headers.forEach((header, i) => {
        item[header] = row[i] || "";
      });

      return {
        id: `${item.Category}-${item['Sub-Category']}-${item.Name}-${index}`
          .replace(/\s+/g, '-')
          .toLowerCase(),

        category: item.Category || "",
        subCategory: item['Sub-Category'] || "",
        name: item.Name || "",
        price: item['Price (INR)'] || "",
        tags: item.Tags || "",
        description: item.Description || "",
        mood: item.Mood || "",
        imageUrl: item['Image Url'] || "",
      };
    });

    // console.log("PARSED MENU:", menu);
    return menu;

  } catch (error) {
    console.error("Failed to fetch menu:", error);
    return [];
  }
};
