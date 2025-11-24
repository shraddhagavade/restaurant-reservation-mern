import  { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Offers.css";

type Offer = {
  id: string;
  title: string;
  description: string;
  img: string;
  discount: number;
  details: string;
  expiresInHours: number;
};


function formatTimeLeft(ms: number): string {
  if (ms <= 0) return "Expired";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  return `${hours}h ${minutes}m ${seconds}s`;
}

function Offers() {
  const navigate = useNavigate();

  // define offers (each must have a stable id)
  const offerList: Offer[] = useMemo(
    () => [
      {
        id: "winter-special",
        title: "✨ Winter Special – 30% OFF",
        description:
          "Enjoy luxury at the best price this winter. Free breakfast + spa access included.",
        img:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        discount: 30,
        details: "Includes: Breakfast, Spa Access, Free WiFi, Late Checkout.",
        expiresInHours: 48,
      },
      {
        id: "romantic-couple",
        title: "💑 Romantic Couple Package",
        description:
          "A candlelight dinner, decorated room, and complimentary wine to celebrate your special day.",
        img:
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
        discount: 20,
        details:
          "Includes: Candlelight Dinner, Wine, Decorated Suite, Complimentary Photoshoot.",
        expiresInHours: 24,
      },
      {
        id: "weekend-getaway",
        title: "🏊 Weekend Getaway – 20% OFF",
        description:
          "Relax by the poolside with our exclusive weekend relaxation package.",
        img:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        discount: 20,
        details: "Includes: Pool Access, Breakfast Buffet, Welcome Drinks.",
        expiresInHours: 72,
      },
    ],
    []
  );

  // create expiry timestamps once (on mount) so countdowns are consistent
  const [expiries] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    const now = Date.now();
    offerList.forEach((o) => {
      // expiry timestamp in ms
      map[o.id] = now + o.expiresInHours * 3600 * 1000;
    });
    return map;
  });

  const [timeLeftMap, setTimeLeftMap] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    const now = Date.now();
    offerList.forEach((o) => {
      initial[o.id] = formatTimeLeft(expiries[o.id] - now);
    });
    return initial;
  });

  // update every second
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const next: Record<string, string> = {};
      offerList.forEach((o) => {
        next[o.id] = formatTimeLeft(expiries[o.id] - now);
      });
      setTimeLeftMap(next);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiries, offerList]);

  const handleBookNow = (offer: Offer) => {
    // navigate to /contact and pass the offer in state (optional prefill)
    navigate("/contact", { state: { fromOffer: offer } });
  };

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  return (
    <div className="offers-page">
      <h1 className="offers-title">Exclusive Offers Just for You</h1>

      <div className="offers-container">
        {offerList.map((offer) => (
          <div className="offer-card fade-up" key={offer.id}>
            <span className="badge">{offer.discount}% OFF</span>
            <img src={offer.img} alt={offer.title} />

            <div className="offer-content">
              <h2>{offer.title}</h2>
              <p>{offer.description}</p>

              <div className="timer">
                ⏳ Ends in:{" "}
                <strong>
                  {timeLeftMap[offer.id] ? timeLeftMap[offer.id] : "Loading..."}
                </strong>
              </div>

              <div className="btn-row">
                <button
                  className="book-btn"
                  onClick={() => handleBookNow(offer)}
                  disabled={timeLeftMap[offer.id] === "Expired"}
                >
                  Book Now
                </button>

                <button
                  className="details-btn"
                  onClick={() => setSelectedOffer(offer)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Popup Modal */}
      {selectedOffer && (
        <div className="modal-bg" onClick={() => setSelectedOffer(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedOffer.title}</h2>
            <img src={selectedOffer.img} alt="offer" />
            <p>{selectedOffer.details}</p>

            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <button
                className="book-btn"
                onClick={() => {
                  setSelectedOffer(null);
                  handleBookNow(selectedOffer);
                }}
              >
                Book This Offer
              </button>
              <button
                className="close-btn"
                onClick={() => setSelectedOffer(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Offers;
