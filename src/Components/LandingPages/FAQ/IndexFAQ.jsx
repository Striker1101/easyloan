import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import CustomerCareButton from "../CustomerCareButton";
export default function IndexFAQ() {
  const datas = [
    {
      title: "What is " + process.env.REACT_APP_NAME + "",
      content:
        "It is an innovative lending platform created to connect people with their dreams by providing affordable finance to help them meet personal obligations.",
    },
    {
      title: "How do i Apply",
      content:
        "Simply review the product options, once you have a product that satisfies your need, asses the loan to be sure you are comfortable with the terms, fill the application form and submit all relevant documents online or physically.",
    },
    {
      title:
        "What contition do i need to meet to be eligible for " +
        process.env.REACT_APP_NAME,
      content:
        "You must be between the ages of 21-55 years.  You must have been in current employment for at least one year or provide a guarantor that meets this criteria. You must work and reside in Lagos. You must not have history of default on previous loan or history of returned Cheque(s).",
    },
    {
      title: " What document(s) do I need to submit for my application?",
      children: true,
      content: "",
      childrenDatas: [
        " Passport Photograph signed at the back.",

        "Letter of employment/confirmation or promotion",

        "   Valid Means of identification",

        " Employer ID Card",

        " 6 month bank statement showing at least the last six month salary credit including the last salary",
      ],
    },
    {
      title: "What is the maximum amount I can borrow?",
      content:
        " The Maximum amount you can borrow depends on your income and other loan obligation you have, generally, you can borrow up to 200% of your gross monthly income",
    },
    {
      title: "What rate do you charge for your loan?",
      content:
        "The rate charged is flexible depending on your credit score, the risk profile and the type of product you require. A fixed loan processing and management fee of 5000 is charged upfront",
    },

    {
      title: "  What is the maximum repayment tenure?",
      content:
        " First time customers can repay over a period of 3 - 6 months; and up to 12 months for returning customers.",
    },
    {
      title: "How do I repay my loan?",
      content:
        "Repayment will be through submitted repayment instrument(s) provided by you. Direct bank transfer is allowed but repayment instrument must be submitted as part of your application documentation.",
    },
    {
      title:
        "  Can I pay off my outstanding loan before the end of the tenure?",
      content:
        "Yes you can pay off your outstanding loan before the end of the tenure at no additional cost.",
    },
    {
      title: "  Can I extend the tenure of my loan?",
      content:
        "Yes, you can rollover or restructure your loan. Rollover or restructure fees apply.",
    },
    {
      title: "Can I pay any of my instalment partially?",
      content:
        "Partial instalment is not allowed. Penalty applies for outstanding payment on any instalment.",
    },
    {
      title: "What happen if I default in the payment of my loan?",
      content:
        "    Default on your loan payment has negative impact on your ability to get further credit across all financial institutions. We submit borrower data to credit bureau, your repayment history and default will be available to all financial institutions. We employ the service of collection agencies and all legal means to collect recalcitrant loan and will apply relevant penalties including daily late charges. This collection and legal action may affect your guarantor.",
    },
    {
      title: "When can I apply for another loan after I finish paying one?",
      content: "You can apply immediately for a new loan facility.",
    },
  ];

  useEffect(() => {
    const listItems = document.querySelectorAll(".contents li");
    listItems.forEach((item, index) => {
      const delay = index * 100; // Adjust the delay as needed
      item.style.transitionDelay = `${delay}ms`;
      item.classList.add("slide-in");
    });
  }, []);

  const handleToggleMessage = (index) => {
    const message = document.getElementById(`message-${index}`);
    message.classList.toggle("show");
  };

  return (
    <div className="pt-5 FAQHolder">
      <div className="header  pt-5 d-flex justify-content-center flex-column align-items-center ">
        <h1>FAQ</h1>
        <p>FREQUENTLY ASKED QUESTIONS</p>
      </div>

      <Container className="p-5 ">
        <ul className="contents border border-gray">
          {datas.map((data, i) => {
            return (
              <li key={i}>
                <div
                  className="header d-flex justify-content-between align-items-center"
                  onClick={() => handleToggleMessage(i)}
                >
                  <div className="title text-success fs-5 fw-bold p-4 ">
                    {data.title}
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    style={{ color: "green", padding: "5px" }}
                  />
                </div>
                <div id={"message-" + i} className="message">
                  <p> {data.content}</p>

                  <ul className="p-3 ">
                    {data.children
                      ? data.childrenDatas.map(function (data, i) {
                          return <p key={i}>{data}</p>;
                        })
                      : ""}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>

      <CustomerCareButton />
    </div>
  );
}
