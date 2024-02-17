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
      name: "Patrical",
      message: "this is the best",
    },
    {
      name: "Patrical",
      message: "this is the best",
    },
    {
      name: "Patrical",
      message: "this is the best",
    },
    {
      name: "Patrical",
      message: "this is the best",
    },
    {
      name: "Patrical",
      message: "this is the best",
    },
    {
      name: "Patrical",
      message: "this is the best",
    },
    {
      name: "Patrical",
      message: "this is the best",
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
