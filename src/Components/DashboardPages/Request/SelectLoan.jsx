import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSchool } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
export default function SelectLoan({
  setLoan,
  datas,
  submit,
  setInfo,
  selectLoan,
}) {
  const [toggle, setToggle] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setInfo((prev) => ({
      ...prev,
      details: "Product Details",
      status: false,
    }));
  }, [selectLoan.status]);

  useEffect(() => {
    toggle
      ? setInfo((prev) => ({
          ...prev,
          details: "Product Details",
          status: false,
        }))
      : setInfo((prev) => ({
          ...prev,
          details: "Select a Loan Product.",
          status: false,
        }));
  }, [toggle]);

  function handleToggle(index) {
    setIndex(index);
    setToggle(!toggle);
  }
  return (
    <div>
      {selectLoan.status && (
        <div>
          {!toggle ? (
            <div>
              {selectLoan.status && (
                <div className="">
                  {datas.map((data, index) => {
                    return (
                      <div
                        className="selectLoanCard"
                        onClick={() => {
                          handleToggle(index);
                        }}
                        key={index}
                      >
                        <div className="d-flex justify-content-between w-100 align-items-center gap-4    ">
                          <div>
                            <div className="shadow">
                              {index === 0 && (
                                <FontAwesomeIcon
                                  icon={faUser}
                                  style={{ color: "blue" }}
                                />
                              )}
                            </div>
                            <div className="shadow">
                              {index === 1 && (
                                <FontAwesomeIcon
                                  icon={faSchool}
                                  style={{ color: "blue" }}
                                />
                              )}
                            </div>
                            <div className="shadow">
                              {index === 2 && (
                                <FontAwesomeIcon
                                  icon={faUser}
                                  style={{ color: "blue" }}
                                />
                              )}
                            </div>
                          </div>
                          <div>
                            <strong>{data.name}</strong>
                            <div>
                              <p>{data.type}</p>
                            </div>
                          </div>
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            style={{ color: "blue" }}
                          />
                        </div>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="d-flex g-3 align-items-center  ">
                <div>
                  <div className="shadow">
                    {index === 0 && (
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ color: "blue" }}
                      />
                    )}
                  </div>
                  <div className="shadow">
                    {index === 1 && (
                      <FontAwesomeIcon
                        icon={faSchool}
                        style={{ color: "blue" }}
                      />
                    )}
                  </div>
                  <div className="shadow">
                    {index === 2 && (
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ color: "blue" }}
                      />
                    )}
                  </div>
                </div>

                <div className="m-3">
                  <strong>{datas[index].name}</strong>
                  <p className="text-dark-emphasis">{datas[index].type}</p>
                </div>
              </div>

              <div>{datas[index].details}</div>

              <Button
                className="p-3 w-75 m-3"
                variant="primary"
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                BACK
              </Button>
              <Button
                onClick={() => {
                  setLoan((prev) => ({
                    ...prev,
                    index: index,
                    status: false,
                  }));

                  submit();
                }}
                className="p-3 w-75 m-3"
                variant="primary"
              >
                NEXT
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
