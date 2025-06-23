import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);

  const handleNavClick = () => {
    closeDrawer();
    window.scrollTo(0, 0);
  };

  const linkClass =
    "uppercase tracking-wider font-medium hover:text-blue-600 transition";

  const navLinks = (
    <>
      <Link to="/" onClick={handleNavClick} className={linkClass}>
        Home
      </Link>
      <Link to="/category/bollywood" onClick={handleNavClick} className={linkClass}>
        Bollywood
      </Link>
      <Link to="/category/hollywood" onClick={handleNavClick} className={linkClass}>
        Hollywood
      </Link>
      <Link to="/category/k-drama" onClick={handleNavClick} className={linkClass}>
        K-Drama
      </Link>
      <Link to="/category/web-series" onClick={handleNavClick} className={linkClass}>
        Web Series
      </Link>
      <Link to="/about" onClick={handleNavClick} className={linkClass}>
        About
      </Link>
      <Link to="/dmca" onClick={handleNavClick} className={linkClass}>
        DMCA
      </Link>
    </>
  );

  return (
    <nav className="bg-white shadow p-1 flex justify-between items-center sticky top-0 z-50 md:px-40 px-5">
      {/* Logo */}
      <div className="font-bold tracking-wide">
        <Link to="/" onClick={handleNavClick}>
          <img
            src="/logo.png"
            alt="JKHub"
            className="w-30 h-auto"
          />
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-8">{navLinks}</div>

      {/* Mobile Hamburger */}
      <button className="md:hidden" onClick={toggleDrawer}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white text-black shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden flex flex-col p-6 gap-6 z-50`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold uppercase">Menu</h2>
          <button onClick={closeDrawer}>
            <X size={24} className="text-black" />
          </button>
        </div>
        <div className="flex flex-col gap-6">{navLinks}</div>
      </div>

      {/* Background Overlay */}
      {isOpen && (
        <div
          onClick={closeDrawer}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </nav>
  );
};

export default Navbar;
