import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { MenuProvider } from './context/MenuContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Menu from './components/Menu';
import About from './components/About';
import Location from './components/Location';
import BookTable from './components/BookTable'; // Import the new BookTable component

function App() {
  return (
    <MenuProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/:category" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/location" element={<Location />} />
              <Route path="/booktable" element={<BookTable />} /> {/* New route for BookTable */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </MenuProvider>
  );
}

// https://drive.google.com/file/d/1fu2ado-0WrJEqDC6qPL71qlJbOg8amur/view?usp=drive_link
export default App;