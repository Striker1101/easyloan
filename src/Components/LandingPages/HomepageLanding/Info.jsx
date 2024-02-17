import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Info() {
  const [count, setCount] = useState(0);
  const [startDate, setStartDate] = useState("01/01/2024");
  const { t } = useTranslation();

  useEffect(() => {
    const startTimestamp = new Date(startDate).getTime();
    const currentDate = new Date().getTime();
    const daysDifference = Math.floor(
      (currentDate - startTimestamp) / (1000 * 60 * 60 * 24)
    );

    const minIncrease = 100; // Minimum increase per day
    const maxIncrease = 200; // Maximum increase per day
    const randomIncrease =
      Math.floor(Math.random() * (maxIncrease - minIncrease + 1)) + minIncrease;

    const increase = daysDifference * randomIncrease;

    const targetCount = Math.max(2000, count + increase); // Ensure count never goes below 2000

    let animationFrameId;
    const duration = 1000; // Animation duration in milliseconds
    const startTime = Date.now();
    const increment = Math.ceil((targetCount / duration) * 10); // Adjust the multiplier as needed

    const animateCount = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = elapsedTime / duration;

      if (progress < 1) {
        const newValue = Math.min(
          Math.ceil(progress * targetCount),
          targetCount
        );
        setCount(newValue);
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCount(targetCount);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [startDate]);

  return (
    <div className="infoBackground d-flex justify-content-center">
      <div className=" homepageInfo text-light w-75  ">
        <div className="d-flex p-3  justify-content-center flex-column   align-items-center ">
          <p className=" display-1 fw-bolder">{t("Homepage:easiest_way")}</p>
          <p className="display-3 fw-bold text-primary ">
            {t("Homepage:laon_money")}
          </p>
          <p>
            {process.env.REACT_APP_NAME}™{t("Homepage:about")}
          </p>
          <Link to={"/how"}>
            <Button variant="primary">
              {" "}
              {t("how_it_works").toUpperCase()}
            </Button>
          </Link>
        </div>
        <div className="d-flex p-3 gap-2  flex-column  justify-content-center  align-items-center ">
          <FontAwesomeIcon
            icon={faUser}
            style={{ fontSize: "2rem", color: "blue" }}
          />
          <strong className="display-4 ">{count.toLocaleString()}</strong>
          <p>{t("Homepage:cutomer_and_counting")}</p>
        </div>
      </div>
    </div>
  );
}
