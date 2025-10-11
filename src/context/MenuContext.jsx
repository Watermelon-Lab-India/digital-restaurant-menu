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
        const data = await fetchMenu('1PQvbr6ogK89_GsAI2r3N9JPWZihoUpAP8PPjS8RA44g', config.googleSheetName);
        setMenuItems(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
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
