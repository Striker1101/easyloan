import React from "react";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import getCountry, { getState } from "../../international/GetCountry";
export default function FooterLanding() {
  const { t } = useTranslation();
  return (
    <div className="footerLanding">
      <div className="d-flex flex-column flex-lg-row justify-content-between ">
        <div>
          <h3 className="text-primary"> {process.env.REACT_APP_NAME}</h3>
          {/* <p>{t("Footer:owner_and_manager")}</p> */}
          Owned and managed by: Casafina Credit Limited a licensed credit
          provider incorporated by the corporate affairs commission of{" "}
          {getCountry()} and operating under money lending License granted by{" "}
          {getState()} state government.
        </div>

        <div className="m-4">
          <p>
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ fontSize: "2rem", color: "grey" }}
            />
            {process.env.REACT_APP_MAIL}
          </p>

          <p>
            <FontAwesomeIcon
              icon={faPhone}
              style={{ fontSize: "2rem", color: "grey" }}
            />
            {process.env.REACT_APP_NUM}
          </p>

          <hr />

          <div className="foooterLandingLinks">
            <a href="#">
              <FontAwesomeIcon
                icon={faFacebook}
                style={{ fontSize: "2rem", color: "grey" }}
              />
            </a>

            <a href="#">
              <FontAwesomeIcon
                icon={faTwitter}
                style={{ fontSize: "2rem", color: "grey" }}
              />
            </a>

            <a href="#">
              <FontAwesomeIcon
                icon={faLinkedin}
                style={{ fontSize: "2rem", color: "grey" }}
              />
            </a>

            <a href="#">
              <FontAwesomeIcon
                icon={faInstagram}
                style={{ fontSize: "2rem", color: "grey" }}
              />
            </a>

            <a href="#">
              <FontAwesomeIcon
                icon={faWhatsapp}
                style={{ fontSize: "2rem", color: "grey" }}
              />
            </a>
          </div>
        </div>

        <div className="m-4">
          <h2 className="text-primary">{t("Footer:office")}</h2>
          <p>{t("Footer:address")}</p>
        </div>
      </div>
      <div className="d-flex flex-column ">
        <hr className="w-100 " />
        <div className="d-flex justify-content-between ">
          <p>
            2024 © {process.env.REACT_APP_NAME}™. {t("Footer:rights")}
          </p>
          <Link to={"/policy"}>
            <strong>{t("Footer:policy")}</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}
