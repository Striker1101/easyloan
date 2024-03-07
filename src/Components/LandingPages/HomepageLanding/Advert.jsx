import React from "react";
import getCountry from "../../../international/GetCountry";
export default function Advert() {
  return (
    <div className="dub_advert advert pt-4">
      <div className="container ">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <div className=" ">
              <h2>
                Putting {getCountry()}ns on a path to a better financial future
              </h2>
              <p>
                When banks aren’t an option, we can help you get approved for
                the loan you need today.
              </p>
              <div className="d-flex p-2 ">
                <div className="w-100 ">
                  <h2>400+</h2>
                  <p>location in {getCountry()}</p>
                </div>
                <div className="circle_line"></div>
                <div className="w-100 ">
                  <h2>758k</h2>
                  <p>customers served</p>
                </div>
                <div className="circle_line"></div>
                <div className="w-100 ">
                  <h2>95%</h2>
                  <p>satisfaction rate</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <div className=" circle_holder   position-relative w-100 ">
              <div className="advert_circle circle_one">
                <h1>60%</h1>
                <p>of customers improve their credit score</p>
              </div>
              <div className="advert_circle circle_two">
                <h1>1 in 3</h1>
                <p>customers graduate to prime rates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
