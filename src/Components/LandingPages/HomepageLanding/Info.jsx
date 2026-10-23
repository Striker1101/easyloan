import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { faUsers, faArrowRight, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Info() {
  const [count, setCount] = useState(25000);
  const { t } = useTranslation();

  useEffect(() => {
    const startTimestamp = new Date("01/01/2024").getTime();
    const currentDate = new Date().getTime();
    const daysDifference = Math.floor(
      (currentDate - startTimestamp) / (1000 * 60 * 60 * 24)
    );

    const targetCount = 20000 + daysDifference * 145;

    let animationFrameId;
    const duration = 1200;
    const startTime = Date.now();

    const animateCount = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * targetCount));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const appName = process.env.REACT_APP_NAME || "Loan Swift";

  return (
    <section className="infoBackground">
      <Container>
        <div className="homepageInfo">
          <Row className="align-items-center g-4">
            <Col lg={7} className="text-light">
              <span className="badge-chip bg-primary text-white mb-3">
                <FontAwesomeIcon icon={faShieldHalved} /> Trusted Nationwide
              </span>
              <h2 className="display-6 fw-extrabold mb-3 text-white">
                {t("Homepage:easiest_way") || "The easiest way to get"}{" "}
                <span className="text-primary">{t("Homepage:laon_money") || "the money you need"}</span>
              </h2>
              <p className="text-white-50 fs-6 mb-4 pe-lg-4">
                {appName}™ {t("Homepage:about") || "provides clear, rapid and secure financial loans to empower individuals and small businesses."}
              </p>
              <div>
                <Link to="/how">
                  <Button variant="primary" size="lg" className="d-inline-flex align-items-center gap-2">
                    <span>{t("how_it_works") || "How It Works"}</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Button>
                </Link>
              </div>
            </Col>

            <Col lg={5}>
              <div className="dark-glass-card p-4 text-center">
                <div className="d-inline-flex p-3 rounded-circle bg-primary bg-opacity-10 text-primary mb-3">
                  <FontAwesomeIcon icon={faUsers} size="2x" />
                </div>
                <div className="display-5 fw-extrabold text-white mb-1">
                  {count.toLocaleString()}+
                </div>
                <p className="text-white-50 mb-0">
                  {t("Homepage:cutomer_and_counting") || "Happy Customers & Growing Daily"}
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}
