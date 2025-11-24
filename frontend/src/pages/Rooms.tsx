import React, { useState } from "react";
import "./Rooms.css";

function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [bookingMessage, setBookingMessage] = useState("");

  const rooms = [
    {
      title: "Standard Room",
      img: "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg",
      short: "Cozy and comfortable for short stays.",
      details: `
        • Perfect for solo travelers or quick business trips.
        • Soft bedding, warm lighting, peaceful ambience.
        • Free Wi-Fi, TV, wardrobe, attached bath.
        • Affordable & comfortable option.
      `,
      price: 1500,
    },
    {
      title: "Medium Room",
      img: "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg",
      short: "More space and extra luxury features.",
      details: `
        • Ideal for couples & family stays.
        • Spacious interior and seating area.
        • Complimentary breakfast + toiletries.
        • Stylish + budget friendly.
      `,
      price: 2500,
    },
    {
      title: "Premium Suite",
      img: "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg",
      short: "Ultimate luxury with full premium amenities.",
      details: `
        • King-size bed, private balcony, jacuzzi, mini-bar.
        • Workspace area + premium bath accessories.
        • Personalized services available.
        • Perfect for long stays or luxury trips.
      `,
      price: 5000,
    },
  ];

  const handleBooking = async () => {
    if (!selectedRoom) return;

    try {
      const response = await fetch("http://localhost:4000/api/book-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomName: selectedRoom.title,
          price: selectedRoom.price,
          date: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setBookingMessage("Room booked successfully!");
      } else {
        setBookingMessage("Failed to book room.");
      }
    } catch (err) {
      setBookingMessage("Server error. Try again!");
    }
  };

  return (
    <>
      <section className="section fade-up">
        <h2 className="section-title">Our Rooms</h2>

        <div className="room-container">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="card room-card"
              onClick={() => {
                setSelectedRoom(room);
                setBookingMessage("");
              }}
              style={{ cursor: "pointer" }}
            >
              <img src={room.img} className="room-img" />
              <h3>{room.title}</h3>
              <p>{room.short}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedRoom && (
        <div className="modal-overlay" onClick={() => setSelectedRoom(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedRoom.img} className="modal-img" />
            <h2>{selectedRoom.title}</h2>
            <p style={{ whiteSpace: "pre-line" }}>{selectedRoom.details}</p>
            <h3 style={{ marginTop: "10px" }}>₹ {selectedRoom.price} / night</h3>

            <button className="book-btn" onClick={handleBooking}>
              Book Now
            </button>

            {bookingMessage && (
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                {bookingMessage}
              </p>
            )}

            <button className="close-btn" onClick={() => setSelectedRoom(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Rooms;
