import { createContext, useContext, useState, useEffect } from 'react';
import { fetchMenu } from '../utils/fetchMenu';
import config from '../utils/config';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await fetchMenu(config.googleSheetId, config.googleSheetName);
        setMenuItems(data);
        
        // Extract unique categories with their image URLs
        const uniqueCategoriesMap = new Map();
        data.forEach(item => {
          if (!uniqueCategoriesMap.has(item.category)) {
            uniqueCategoriesMap.set(item.category, { name: item.category, imageUrl: item.imageUrl });
          }
        });
        setCategories(Array.from(uniqueCategoriesMap.values()));
      } catch (err) {
        setError('Failed to load menu. Using sample data instead.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  return (
    <MenuContext.Provider value={{ menuItems, categories, loading, error }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
