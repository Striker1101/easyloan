import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CustomerCareButton from "../CustomerCareButton";

export default function IndexFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const appName = process.env.REACT_APP_NAME || "Loan Swift";

  const faqs = [
    {
      title: `What is ${appName}?`,
      content:
        "Loan Swift is an innovative digital lending platform created to connect individuals and business owners with fast, flexible, and affordable financing to meet their obligations and seize new opportunities.",
    },
    {
      title: "How do I apply for a loan?",
      content:
        "Simply calculate your preferred loan amount and term using our online calculator, review terms, complete the quick digital application form, and submit required verification documents.",
    },
    {
      title: `What conditions do I need to meet to be eligible for ${appName}?`,
      content:
        "You must be at least 21 years of age, have active verifiable employment or business income, have a valid government-issued ID, and hold an active bank account.",
    },
    {
      title: "What document(s) do I need to submit for my application?",
      children: true,
      childrenDatas: [
        "Recent passport-style photograph",
        "Valid government ID (National ID, International Passport, or Driver's License)",
        "Proof of employment or business registration",
        "Last 3–6 months bank statements showing regular income deposits",
      ],
    },
    {
      title: "What is the maximum amount I can borrow?",
      content:
        "Borrowing limits depend on your verifiable income, credit history, and current obligations. Generally, eligible applicants can borrow up to 200% of their gross monthly earnings.",
    },
    {
      title: "What interest rate do you charge?",
      content:
        "Rates are competitive and personalized according to your credit score, risk profile, and chosen loan duration. All charges and interest are presented clearly before you accept.",
    },
    {
      title: "What is the repayment tenure?",
      content:
        "First-time borrowers can choose repayment periods between 3 and 12 months. Returning borrowers with positive track records can unlock terms up to 36 months.",
    },
    {
      title: "How do I repay my loan?",
      content:
        "Repayments are made seamlessly through automated direct debit, bank card tokenization, or direct bank transfer into your assigned dedicated account.",
    },
    {
      title: "Can I pay off my outstanding balance early?",
      content:
        "Yes! You are free to settle your entire remaining balance at any time with zero early payoff penalties.",
    },
    {
      title: "When can I apply for another loan after repaying?",
      content:
        "Immediately upon successful settlement of your active facility, you can apply for a renewed or increased loan with expedited processing.",
    },
  ];

  return (
    <div>
      <div className="faq-header-banner">
        <Container>
          <span className="badge-chip bg-primary text-white mb-2">Help & Answers</span>
          <h1 className="display-5 fw-extrabold mb-2 text-white">Frequently Asked Questions</h1>
          <p className="text-white-50 fs-5 mb-0">Everything you need to know about our loans and process</p>
        </Container>
      </div>

      <Container className="py-5" style={{ maxWidth: "860px" }}>
        <div className="faq-accordion-list">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div className="faq-accordion-item" key={i}>
                <button
                  type="button"
                  className={`faq-question-btn ${isOpen ? "open" : ""}`}
                  onClick={() => toggleItem(i)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.title}</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`faq-chevron ${isOpen ? "open" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="faq-answer-content">
                    {faq.content && <p className="mb-2">{faq.content}</p>}
                    {faq.children && (
                      <ul className="mb-0 ps-3">
                        {faq.childrenDatas.map((item, cIdx) => (
                          <li key={cIdx} className="mb-1">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-5">
          <CustomerCareButton />
        </div>
      </Container>
    </div>
  );
}
