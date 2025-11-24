import  { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import "./App.css";

function App() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => setDark(!dark);

  return (
    <Router>
      <div className={dark ? "dark" : ""}>
        {/* NAVBAR */}
        <nav className={`navbar glass-nav fade-up`}>
          <div className="nav-logo">🏨 GrandStay Hotels</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/rooms">Rooms</Link>
            <Link to="/offers">Offers</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <button className="theme-btn" onClick={toggleTheme}>
            {dark ? "🌙" : "☀️"}
          </button>
        </nav>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
