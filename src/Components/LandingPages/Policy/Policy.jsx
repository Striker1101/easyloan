import React from "react";
import { Container } from "react-bootstrap";
import {
  faShieldHalved,
  faUserShield,
  faShareNodes,
  faServer,
  faScaleBalanced,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCompany } from "../../../international/GetCountry";

export default function Policy() {
  const appName = process.env.REACT_APP_NAME || "Loan Swift";
  const appEmail =
    process.env.REACT_APP_MAIL && !process.env.REACT_APP_MAIL.includes("hotmail")
      ? process.env.REACT_APP_MAIL
      : "support@loanswift.com";

  return (
    <div className="pt-5 ">
      <div className="header pt-5 d-flex justify-content-center flex-column align-items-center text-center">
        <h1 className="fw-bold">PRIVACY & TERMS</h1>
        <p className="text-white-50">Transparent Lending & Comprehensive Data Protection</p>
      </div>

      <Container className="py-4 px-3 px-md-5 my-4 bg-white rounded-4 shadow-sm border">
        <div className="d-flex justify-content-center m-3  flex-column   align-items-center ">
          <div className="d-flex justify-content-between w-100  align-items-center">
            <h2>Terms & Conditions</h2>
            <FontAwesomeIcon
              icon={faFileContract}
              className="text-primary fs-4"
            />
          </div>
          <hr className="w-100 " />

          <p>
            {appName}® is a registered trademark of{" "}
            {getCompany()}. We are committed to protecting and respecting your
            privacy. This policy sets out the basis on which any personal data
            we collect from you, or that you provide to us, will be processed by
            us. Please read the following carefully to understand our views and
            practices regarding your personal data and how we will treat it. By
            visiting {process.env.REACT_APP_URL} (“our site”) you are accepting
            and consenting to the practices described in this policy or as maybe
            reviewed/amended with or without notification or approval from you,
            your legal estate or custodian
          </p>
        </div>

        <div className="d-flex justify-content-center m-3  flex-column   align-items-center ">
          <div className="d-flex justify-content-between w-100  align-items-center">
            <div>
              <h2>Information we may collect from you</h2>
              <strong>
                We may collect and process the following data about you:
              </strong>
            </div>
            <FontAwesomeIcon
              icon={faUserShield}
              className="text-info fs-4"
            />
          </div>
          <hr className="w-100 " />

          <ol>
            <li>
              <div>
                <strong style={{ color: "skyblue" }}>
                  Information you give us:
                </strong>
              </div>
              You may give us information about you by filling in forms via our
              site, by allowing us to access your information on social media
              sites or by corresponding with us by phone, e-mail or
              otherwise. This includes information you provide when you register
              to use our site, apply for a loan, search for a feature, and when you report a problem with
              our site. The information you give us may include your name,
              address, e-mail address and phone number, financial information,
              personal description, current and former places of employment,
              and identity verification documents.
            </li>

            <li>
              <div>
                <strong style={{ color: "skyblue" }}>
                  Information we collect about you:
                </strong>
              </div>
              <p>
                With regard to each of your visits to our site we may
                automatically collect the following information:
              </p>

              <ol type="a">
                <li>
                  Technical information, including the Internet protocol (IP)
                  address used to connect your computer or mobile device to the Internet, your
                  login information, browser type and version, time zone
                  setting, browser plug-in types and versions, operating system
                  and platform.
                </li>
                <li>
                  Information about your visit, including the full Uniform
                  Resource Locators (URL) clickstream to, through and from our
                  site (including date and time); products you viewed or
                  searched for; page response times, download errors, and methods used to
                  browse away from the page.
                </li>
              </ol>
            </li>

            <li>
              <div>
                <strong style={{ color: "skyblue" }}>
                  Information we receive from other sources:
                </strong>
              </div>
              We may receive information about you if you use any of the other
              services we provide. We are also working closely with third parties (including, for example,
              credit bureaus, payment processors, analytics providers, and banking partners) and may receive
              verifiable credit and account information about you from them.
            </li>
          </ol>
        </div>

        <div className="d-flex justify-content-center m-3  flex-column   align-items-center ">
          <div className="d-flex justify-content-between w-100  align-items-center">
            <h2> Disclosure of your information</h2>
            <FontAwesomeIcon
              icon={faShareNodes}
              className="text-success fs-4"
            />
          </div>
          <hr className="w-100 " />
          <p>
            We may share your personal information with any member of our group,
            which means our subsidiaries, our ultimate holding company and its
            subsidiaries. We may share your information with selected third
            parties including:
          </p>

          <ol type="a">
            <li>
              Business partners, suppliers and sub-contractors for the
              performance of any loan agreement or service contract we enter into with you.
            </li>{" "}
            <li>
              Credit reporting agencies and fraud prevention registries for the purpose
              of assessing your credit score and verifying your identity.
            </li>{" "}
            <li>
              Analytics and search engine providers that assist us in the
              improvement and optimization of our site and digital lending services.
            </li>
          </ol>
        </div>

        <div className="d-flex justify-content-center m-3  flex-column   align-items-center ">
          <div className="d-flex justify-content-between w-100  align-items-center">
            <h2>Where we store your personal data</h2>
            <FontAwesomeIcon
              icon={faServer}
              className="text-primary fs-4"
            />
          </div>
          <hr className="w-100 " />
          <p>
            The data that we collect from you is stored on high-security encrypted cloud servers.
            Where we have given you (or where you have chosen) credentials which
            enable you to access certain parts of our site, you are responsible
            for keeping this password confidential. We ask you not to share a
            password with anyone. We maintain 256-bit SSL encryption, strict role-based access
            controls, and regular security audits to protect your data from unauthorized access.
          </p>
        </div>

        <div className="d-flex justify-content-center m-3  flex-column   align-items-center ">
          <div className="d-flex justify-content-between w-100  align-items-center">
            <h2>Your rights</h2>
            <FontAwesomeIcon
              icon={faScaleBalanced}
              className="text-warning fs-4"
            />
          </div>
          <hr className="w-100 " />
          <p>
            You have the right to ask us not to process your personal data for
            marketing purposes. You can exercise this right at any time by
            contacting us via email at {appEmail}. Our site
            may contain links to external partners; please note that these services have
            their own independent privacy policies and terms.
          </p>
        </div>

        <div className="d-flex justify-content-center m-3  flex-column   align-items-center ">
          <div className="d-flex justify-content-between w-100  align-items-center">
            <h2>Access to information</h2>
            <FontAwesomeIcon
              icon={faShieldHalved}
              className="text-primary fs-4"
            />
          </div>
          <hr className="w-100 " />
          <p>
            Applicable consumer credit and data privacy regulations give you the right to access,
            review, and request corrections to personal information held about you.
            You may request an export of your account records at any time by contacting customer support.
          </p>
        </div>
      </Container>
    </div>
  );
}
