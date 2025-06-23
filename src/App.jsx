// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import About from "./pages/About";
import DMCA from "./pages/DMCA";
import GenrePage from "./pages/GenrePage";
import CategoryPage from "./pages/CategoryPage";
import Search from "./pages/Search";
import Preloader from "./components/Preloader";  // Import Preloader

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a page load
    setTimeout(() => {
      setLoading(false); // Hide preloader after 2 seconds
    }, 2000); // You can increase or decrease this based on your page load time
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-200">
        <Navbar />
        
        {loading && <Preloader />}  {/* Show preloader until loading is false */}

        {/* Main content wrapper */}
        <div className="flex-grow px-1 md:px-40">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:slug" element={<MovieDetail />} />
            <Route path="/genre/:genre" element={<GenrePage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/dmca" element={<DMCA />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
