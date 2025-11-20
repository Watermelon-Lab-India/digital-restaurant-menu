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
import OLPdfViewer from './components/OLPdfViewer';

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
            <Route path="/location" element="<Location />" />
            <Route path="/booktable" element={<BookTable />} />
          </Route>
          <Route path="/party-hall-menu" element={<PdfViewer pdfUrl="/pdfs/Party Hall Package_1.pdf" title="Party Hall Menu" />} />
          <Route path="/kitty-menu" element={<PdfViewer pdfUrl="/pdfs/kittymenu.pdf" title="Kitty Menu" />} />
          <Route path="/7cloud-wedding-package" element={<OLPdfViewer pdfUrl="https://storage.googleapis.com/cuco-images/7cloud/wedding.pdf" title="Wedding Package" />} />
        </Routes>
      </Router>
    </MenuProvider>
  );
}

export default App;