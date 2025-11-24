import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [preview, setPreview] = useState<{ img: string; text: string } | null>(
    null
  );

  return (
    <div className="home">
      {/* ================= HERO SECTION ================= */}
      <section
        className="hero"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
            url("https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=80")
            center/cover no-repeat`,
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Royal Spice Restaurant</h1>
          <p className="hero-subtitle">
            Authentic flavors • Premium ambiance • Memorable dining
          </p>

          <Link to="/contact">
            <button className="hero-btn">Reserve a Table</button>
          </Link>
        </div>
      </section>

      {/* ================= SPECIAL DISHES ================= */}
      <section className="specials-section">
        <h2 className="section-title">Our Specials</h2>

        <div className="specials-container">

          {/* Butter Chicken */}
          <div
            className="special-card"
            onClick={() =>
              setPreview({
                img: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=800",
                text: "Butter Chicken – Creamy, rich, and loaded with authentic spices.",
              })
            }
          >
            <img
              src="https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Butter Chicken"
            />
            <h3>Butter Chicken</h3>
            <p>Creamy, rich, and loaded with authentic spices.</p>
          </div>

          {/* Tandoori Paneer */}
          <div
            className="special-card"
            onClick={() =>
              setPreview({
                img: "https://images.pexels.com/photos/33430556/pexels-photo-33430556.jpeg",
                text: "Tandoori Paneer – Char-grilled smoky paneer with bold flavors.",
              })
            }
          >
            <img
              src="https://images.pexels.com/photos/33430556/pexels-photo-33430556.jpeg"
              alt="Tandoori Paneer"
            />
            <h3>Tandoori Paneer</h3>
            <p>Char-grilled smoky paneer with bold flavors.</p>
          </div>

          {/* Veg Biryani */}
          <div
            className="special-card"
            onClick={() =>
              setPreview({
                img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=1000&q=80",
                text: "Veg Biryani – Fragrant long-grain rice cooked with aromatic spices.",
              })
            }
          >
            <img
              src="https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=1000&q=80"
              alt="Veg Biryani"
            />
            <h3>Veg Biryani</h3>
            <p>Fragrant long-grain rice cooked with aromatic spices.</p>
          </div>
        </div>
      </section>

      {/* ================= GALLERY SECTION ================= */}
      <section className="gallery-section">
        <h2 className="section-title">Gallery</h2>

        <div className="gallery-container">

          {/* Gallery 1 */}
          <div
            className="gallery-item"
            onClick={() =>
              setPreview({
                img: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
                text: "Elegant fine-dining setup with warm lighting.",
              })
            }
          >
            <img
              src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Gallery 1"
            />
            <p className="gallery-caption">
              Elegant fine-dining setup with warm lighting.
            </p>
          </div>

          {/* Gallery 2 */}
          <div
            className="gallery-item"
            onClick={() =>
              setPreview({
                img: "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=800",
                text: "Vintage-style restaurant table with classic décor.",
              })
            }
          >
            <img
              src="https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=800"
              alt="Gallery 2"
            />
            <p className="gallery-caption">
              Vintage-style restaurant table with classic décor.
            </p>
          </div>

          {/* Gallery 3 */}
          <div
            className="gallery-item"
            onClick={() =>
              setPreview({
                img: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800",
                text: "Cozy dining ambience with beautifully arranged seating.",
              })
            }
          >
            <img
              src="https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Gallery 3"
            />
            <p className="gallery-caption">
              Cozy dining ambience with beautifully arranged seating.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Customers Say</h2>

        <div className="testimonials-container">
          <div className="testimonial-card">
            “Amazing food and wonderful hospitality!”
            <span>- Rahul</span>
          </div>

          <div className="testimonial-card">
            “Beautiful ambience. Totally worth visiting.”
            <span>- Anjali</span>
          </div>

          <div className="testimonial-card">
            “Delicious dishes and great service. Highly recommend!”
            <span>- Kiran</span>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        © 2025 Royal Spice Restaurant. All rights reserved.
      </footer>

      {/* ================= FULLSCREEN PREVIEW MODAL ================= */}
      {preview && (
        <div
          className="img-preview-overlay"
          onClick={() => setPreview(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 2000,
          }}
        >
          <img
            src={preview.img}
            alt="Preview"
            style={{
              width: "50%",
              maxWidth: "700px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          />

          <p
            style={{
              color: "white",
              fontSize: "1.8rem",
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            {preview.text}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
