import React from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

const businessHours = (str) => {
  const workHours = [];
  for (let i = 1; i <= 12; i += 1) {
    workHours.push(`${i}${str}`);
  }
  return populateOptions(workHours);
};

const populateOptions = (passedArray) => {
  return (
    passedArray.map((item) => {
      return (
        <option key={shortid.generate()} value={item}>{item}</option>
      );
    })
  )
};

const populateBusinesses = (businesses) => {
  return (
    businesses.map((eachBusiness) => {
      const { businessImage, businessName, category, phoneNumber, id: businessId } = eachBusiness;
      const businessLink = `/businesses/${businessId}`;
      return (
        <div key={businessId} className="col-xs-12 col-sm-6 col-lg-4 mt-4">
          <Link to={businessLink} className="card" >
            {
              businessImage !== null ?
              (<div to={businessLink} className="overflow">
                <img src={businessImage} alt={businessName} />
              </div> ): null
            }
            <div className="card-body">
              <h5 className="card-title">{businessName}</h5>
              <div className="card-text">
                <p className="mb-0">Category: {category}</p>
                <p className="mb-0">Tel: {phoneNumber}</p>
              </div>
            </div>
          </Link>
        </div>
      )
    })
  );
}

export {
  businessHours,
  populateOptions,
  populateBusinesses
};