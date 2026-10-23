import React, { useRef, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faStar,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";

const reviewsData = [
  {
    name: "Patricia Cowley",
    role: "Verified Borrower",
    message:
      "I found that the people are very helpful and understanding. The application was seamless and I would definitely recommend them.",
  },
  {
    name: "Bernard Knoll",
    role: "Small Business Owner",
    message:
      "They showed me respect as if I was getting a million dollar loan. Made me feel extremely comfortable throughout the process.",
  },
  {
    name: "Tanya Morgan",
    role: "Homeowner",
    message:
      "Absolutely on point! Followed up promptly with clear email updates. Courteous, fast, and explained everything transparently.",
  },
  {
    name: "Steve Rogers",
    role: "Personal Loan",
    message:
      "I would recommend dealing with them to help you get back on stable financial ground. Professional and dependable team.",
  },
  {
    name: "Brooke Adams",
    role: "Credit Builder",
    message:
      "Loan Swift makes rebuilding credit so easy. The advisor was extremely helpful and made it simple and straightforward to set up.",
  },
  {
    name: "Jenevy Hughes",
    role: "Verified Borrower",
    message:
      "The financial advisor was very knowledgeable and attentive. Witty, friendly, and approachable. Keep up the amazing work!",
  },
  {
    name: "Oluoha Fidelis",
    role: "Repeat Customer",
    message:
      "Loan Swift is a company with class. I have been using their service and there is no better place to access emergency funds.",
  },
  {
    name: "Aderowo Emmanuel",
    role: "Business Financing",
    message:
      "Loans are easily and quickly disbursed. What impressed me most was the speed and ease with which money arrived.",
  },
];

export default function Reviews() {
  const [cards] = useState(reviewsData);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="container_review">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
          <div>
            <span className="badge-chip bg-primary bg-opacity-10 text-primary mb-2">
              Testimonials
            </span>
            <h2 className="display-6 fw-bold text-dark mb-1">Trusted by Real Borrowers</h2>
            <p className="text-muted mb-0">See what our customers have to say about their experience</p>
          </div>
          <div className="d-flex gap-2 mt-3 mt-md-0">
            <Button
              variant="outline-secondary"
              className="rounded-circle p-2"
              style={{ width: "42px", height: "42px" }}
              onClick={() => scroll("left")}
              aria-label="Previous review"
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
            <Button
              variant="outline-secondary"
              className="rounded-circle p-2"
              style={{ width: "42px", height: "42px" }}
              onClick={() => scroll("right")}
              aria-label="Next review"
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </Button>
          </div>
        </div>

        <div className="review-slider-wrapper">
          <div className="review-scroll-container" ref={scrollRef}>
            {cards.map((card, index) => (
              <div className="review-card-item" key={index}>
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="text-warning small d-flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon icon={faStar} key={i} />
                      ))}
                    </div>
                    <FontAwesomeIcon icon={faQuoteLeft} className="text-muted opacity-25 fs-4" />
                  </div>
                  <p className="text-dark small mb-4" style={{ minHeight: "72px" }}>
                    "{card.message}"
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3 pt-3 border-top">
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: "38px", height: "38px", minWidth: "38px", fontSize: "0.85rem" }}
                  >
                    {card.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="fs-6 fw-bold mb-0 text-dark">{card.name}</h5>
                    <span className="text-muted small">{card.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
