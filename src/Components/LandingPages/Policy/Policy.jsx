import React from "react";
import { Container } from "react-bootstrap";
import { faRing } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IndexHow() {
  return (
    <div className="pt-5 ">
      <div className="header pt-5 d-flex justify-content-center flex-column align-items-center ">
        <h1>PRIVACY</h1>
        <p>BARING IT ALL</p>
      </div>

      <Container className="p-5 shadow-lg m-3">
        <div className="d-flex justify-content-center m-3  flex-column   align-items-center ">
          <div className="d-flex justify-content-between w-100  align-items-center">
            <h2>Terms & Conditions</h2>
            <FontAwesomeIcon
              icon={faRing}
              style={{
                color: "blue",
              }}
            />
          </div>
          <hr className="w-100 " />

          <p>
            {process.env.REACT_APP_NAME}® is a registered trademark of Casafina
            Credit Limited). We are committed to protecting and respecting your
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
              icon={faRing}
              style={{
                color: "orange",
              }}
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
              sites (including but not limited to Facebook, Twitter and
              LinkedIn) or by corresponding with us by phone, e-mail or
              otherwise. This includes information you provide when you register
              to use our site, apply for a loan, search for a feature (for
              example but not limited to, loan amounts, currency, loan
              duration), your activity levels on boards or other social media
              functions on the applicable social media sites, the applications
              you use on social media sites, and when you report a problem with
              our site. The information you give us may include your name,
              address, e-mail address and phone number, login information for
              social networking sites, financial and credit card information,
              personal description, current and former places of employment,
              education, names of colleagues, contacts and friends, photographs,
              and lists of family members.
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
                  address used to connect your computer to the Internet, your
                  login information, browser type and version, time zone
                  setting, browser plug-in types and versions, operating system
                  and platform
                </li>
                <li>
                  Information about your visit, including the full Uniform
                  Resource Locators (URL) clickstream to, through and from our
                  site (including date and time); products you viewed or
                  searched for; page response times, download errors, length of
                  visits to certain pages, page interaction information (such as
                  scrolling, clicks, and mouse-overs), and methods used to
                  browse away from the page and any phone number used to call
                  our customer service number.
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
              websites we operate, the other services we provide and/or the
              social media sites which you login to via our site. We are also
              working closely with third parties (including, for example,
              business partners, sub-contractors in technical, payment and
              delivery services, social media sites, advertising networks,
              analytics providers, search information providers, credit bureaus,
              and financial services and credit providers) and may receive
              information about you from them.
            </li>
          </ol>
        </div>

        <div className="d-flex justify-content-center m-3  flex-column   align-items-center ">
          <div className="d-flex justify-content-between w-100  align-items-center">
            <h2> Disclosure of your information</h2>
            <FontAwesomeIcon
              icon={faRing}
              style={{
                color: "green",
              }}
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
              performance of any contract we enter into with them or you.
            </li>{" "}
            <li>
              Advertisers and advertising networks that require the data to
              select and serve relevant adverts to you and others. We do not
              disclose information about identifiable individuals to our
              advertisers, but we may provide them with aggregate information
              about our users (for example, we may inform them that 500 men aged
              under 30 have clicked on their advertisement on any given day). We
              may also use such aggregate information to help advertisers reach
              the kind of audience they want to target (for example, women in
              Lagos State). We may make use of the personal data we have
              collected from you to enable us to comply with our advertisers'
              wishes by displaying their advertisement to that target audience.
            </li>{" "}
            <li>
              Analytics and search engine providers that assist us in the
              improvement and optimization of our site.
            </li>
          </ol>
        </div>

        <div className="d-flex justify-content-center m-3  flex-column   align-items-center ">
          <div className="d-flex justify-content-between w-100  align-items-center">
            <h2>Where we store your personal data</h2>
            <FontAwesomeIcon
              icon={faRing}
              style={{
                color: "blue",
              }}
            />
          </div>
          <hr className="w-100 " />
          <p>
            The data that we collect from you is stored on our secure servers.
            Where we have given you (or where you have chosen) a password which
            enables you to access certain parts of our site, you are responsible
            for keeping this password confidential. We ask you not to share a
            password with anyone. Unfortunately, the transmission of information
            via the internet is not completely secure. Although we will do our
            best to protect your personal data, we cannot guarantee the security
            of your data transmitted to our site; any transmission is at your
            own risk. Once we have received your information, we will use strict
            procedures and security features to try to prevent unauthorized
            access.
          </p>
        </div>

        <div className="d-flex justify-content-center m-3  flex-column   align-items-center ">
          <div className="d-flex justify-content-between w-100  align-items-center">
            <h2>Your rights</h2>
            <FontAwesomeIcon
              icon={faRing}
              style={{
                color: "blue",
              }}
            />
          </div>
          <hr className="w-100 " />
          <p>
            You have the right to ask us not to process your personal data for
            marketing purposes. You can also exercise the right at any time by
            contacting us via email at helpdesk@easyloan.ng. Our site may, from
            time to time, contain links to and from the websites of our partner
            networks, advertisers and affiliates. If you follow a link to any of
            these websites, please note that these websites have their own
            privacy policies and that we do not accept any responsibility or
            liability for these policies. Please check these policies before you
            submit any personal data to these websites.
          </p>
        </div>

        <div className="d-flex justify-content-center m-3  flex-column   align-items-center ">
          <div className="d-flex justify-content-between w-100  align-items-center">
            <h2>Access to information</h2>
            <FontAwesomeIcon
              icon={faRing}
              style={{
                color: "blue",
              }}
            />
          </div>
          <hr className="w-100 " />
          <p>
            The Act gives you the right to access information held about you.
            Your right of access can be exercised in accordance with the Act.
            Any access request may be subject to a fee in providing you with
            details of the information we hold about you.
          </p>
        </div>
      </Container>
    </div>
  );
}
