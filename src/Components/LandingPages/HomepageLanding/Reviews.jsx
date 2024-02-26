import React, { useRef, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const Reviews = () => {
  const [cards, setCards] = useState([
    {
      name: "Patricia Cowley",
      message:
        "I found that the people are very helpful and understanding, I would definitely recommend them.",
    },
    {
      name: "Bernard Knoll",
      message:
        "She showed me respect as if I was getting a million dollar loan or a $10 loan she made me feel extremely comfortable ",
    },
    {
      name: "Tanya Morgan",
      message:
        "Absolutely on point and followed up promptly with emails and phone calls as email is my preferred method of contact. Prompt, courteous and explained everything.",
    },
    {
      name: "Steve",
      message:
        "I would recommend dealing with them to help you get back on stable financial ground. Thanks for all your help.",
    },
    {
      name: "Brooke",
      message:
        "easyfinancial makes building credit back up literally so easy. Joel was extremely helpful and made it all so simple and straight forward to set up my loan, very happy! Thanks again!",
    },
    {
      name: "Jenevy Hughes",
      message:
        "Jolyn the financial advisor here at Grande Praire is very helpful. She knows what she is doing. Witty, friendly and approachable person. Keep up the good work!",
    },
    {
      name: "Oluoha Fidelis",
      message:
        "EasyLoan is a company with class. I have been dealing with these guys for years and I must confess that there is no better place to loan money than with EasyLoan. Tested, Trusted and Reliable.",
    },
    {
      name: "Aderowo Emmanuel",
      message:
        "At EasyLoan, loans are easily and quickly disbursed. What impressed me was the ease with which money was loaned out to me to meet my pressing need",
    },
  ]);
  const containerRef = useRef(null);

  const handlePrev = () => {
    containerRef.current.scrollBy({
      left: -200, // Assuming each card has a width of 200px
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    containerRef.current.scrollBy({
      left: 200, // Assuming each card has a width of 200px
      behavior: "smooth",
    });
  };

  return (
    <div className="container_review">
      <Container>
        <div className="d-flex  ">
          {/* Image (display:none on extra small and large screens) */}
          <img
            src="/landing/Homepage/reviews.avif"
            className="img-fluid d-none d-xl-block d-lg-block d-md-block"
            alt="Review"
          />
          <Row className="carasel w-100 ">
            <Col
              xs={12}
              sm={12}
              className="d-flex align-items-center justify-content-center "
            >
              <FontAwesomeIcon
                icon={faAngleLeft}
                style={{ fontSize: "2rem" }}
                onClick={handlePrev}
              />
              <div className="cards d-flex p-3 m-3  ">
                {/* place all cards here */}
                <div className="card_content" ref={containerRef}>
                  {cards.map((card, index) => {
                    return (
                      <Card key={index} border="primary" className="">
                        <Card.Header>{card.name}</Card.Header>
                        <Card.Body>
                          <Card.Title>
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "blue" }}
                            />
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "blue" }}
                            />
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "blue" }}
                            />
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "blue" }}
                            />
                          </Card.Title>
                          <Card.Text>{card.message}</Card.Text>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </div>
              </div>
              <FontAwesomeIcon
                icon={faAngleRight}
                style={{ fontSize: "2rem" }}
                onClick={handleNext}
              />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Reviews;
