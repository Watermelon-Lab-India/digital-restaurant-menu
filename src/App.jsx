import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { MenuProvider } from './context/MenuContext';

// Components
import Home from './components/Home';
import Menu from './components/Menu';
import About from './components/About';
import Location from './components/Location';
import BookTable from './components/BookTable';
import PdfViewer from './components/PdfViewer';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <MenuProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:category" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/location" element={<Location />} />
            <Route path="/booktable" element={<BookTable />} />
          </Route>
          <Route path="/party-hall-menu" element={<PdfViewer pdfUrl="https://drive.google.com/file/d/123uvjE15OQorD9saF2uPGBvBKqPzKXOY/preview" title="Party Hall Menu" />} />
          <Route path="/kitty-menu" element={<PdfViewer pdfUrl="https://drive.google.com/file/d/1bpvg8kq2nuyfZEQ5zGPI0r_5Gw8IffWq/preview" title="Kitty Menu" />} />
        </Routes>
      </Router>
    </MenuProvider>
  );
}

export default App;