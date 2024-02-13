import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const ApplyModal = ({ show, handleClose }) => {
  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className=" nav_custom-modal" // Apply custom CSS classes
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "1.5rem", color: "blue" }}>
          {t("apply")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className=" d-flex flex-column  justify-content-center align-items-center">
        <div className="navContent">
          <div className="shadow  d-flex p-4  flex-column justify-content-center align-items-center nav_apply_section">
            <FontAwesomeIcon
              icon={faRightToBracket}
              style={{ fontSize: "4rem", color: "blue" }}
            />
            {t("new_user")}
            <p style={{ fontSize: "1rem" }}>{t("first_timer")}</p>
            <hr />
            <Button variant="primary">{t("apply_for_loan")}</Button>
          </div>
          <div className="shadow-lg  d-flex p-4  flex-column justify-content-center align-items-center nav_apply_section">
            <FontAwesomeIcon
              icon={faUser}
              style={{ fontSize: "4rem", color: "blue" }}
            />
            {t("existing_user")}
            <p style={{ fontSize: "1rem" }}>{t("old_user")}</p>
            <hr />
            <Button variant="primary">{t("apply_for_loan")}</Button>
          </div>
        </div>
        <div className="shadow  d-flex p-4  flex-column justify-content-center align-items-center text-bg-secondary">
          <p style={{ fontSize: "1rem" }}>{t("max_lend")}</p>
          <h5 style={{ fontSize: "1rem" }}>
            <strong>{process.env.REACT_APP_NAME}</strong> {t("product")}
          </h5>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          style={{ fontSize: "1.5rem", color: "white" }}
        >
          {t("close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApplyModal;
