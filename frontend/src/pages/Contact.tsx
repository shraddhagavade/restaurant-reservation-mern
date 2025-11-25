import React, { useState } from "react";
import "./Contact.css";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
};

function Contact() {
  const [formData, setFormData] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });

  const [toast, setToast] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 🌟 Sparkle animation on success
  const triggerSparkles = () => {
    for (let i = 0; i < 25; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";

      sparkle.style.left = Math.random() * 100 + "vw";
      sparkle.style.top = Math.random() * 100 + "vh";

      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1200);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/book-room`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setToast(data.message || "Reservation Successfully Submitted!");

      // ✨ Trigger sparkles
      triggerSparkles();

      setTimeout(() => setToast(""), 3000);

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        date: "",
        time: "",
      });
    } catch (error) {
      console.error(error);
      setToast("Error submitting reservation.");
      setTimeout(() => setToast(""), 3000);
    }
  };

  return (
    <section className="contact-section fade-up">
      <h2 className="contact-title">Hotel Reservation</h2>

      {/* FORM CARD */}
      <div className="contact-card form-card">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-grid">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <div className="form-grid">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn-premium full-btn" type="submit">
            Book Reservation
          </button>
        </form>
      </div>

      {/* CONTACT DETAILS & MAP */}
      <div className="contact-card fade-up" style={{ marginTop: "35px" }}>
        <h3 className="gold-text contact-subtitle">📞 Contact Information</h3>

        <div className="contact-details">
          <p>
            <strong>Owner:</strong> Shraddha Gavade
          </p>
          <p>
            <strong>Email:</strong> shraddhagavade920@gmail.com
          </p>
          <p>
            <strong>Phone:</strong> +91 6364549367
          </p>
          <p>
            <strong>Address:</strong> GrandStay Hotels, MG Road, Bengaluru
          </p>
        </div>

        <div className="map-container">
          <iframe
            title="GrandStay Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31170.19582074007!2d77.5569!3d12.9716"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "14px" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        <div className="contact-buttons">
          <a href="tel:+916364549367" className="btn-premium">
            📞 Call Now
          </a>
          <a
            href="https://wa.me/916364549367"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium"
          >
            💬 WhatsApp Now
          </a>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}

export default Contact;
