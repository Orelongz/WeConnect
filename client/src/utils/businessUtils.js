import React from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

const stateArray = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Benue", "Borno",
  "Bayelsa", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "Federal Capital Territory", "Gombe", "Jigawa", "Imo", "Kaduna", "Kebbi",
  "Kano", "Kogi", "Lagos", "Katsina", "Kwara", "Nasarawa", "Niger", "Ogun",
  "Ondo", "Rivers", "Oyo", "Osun", "Sokoto", "Plateau", "Taraba", "Yobe", "Zamfara"
];

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
      const showImage =  businessImage !== null ? businessImage : null;
      return (
        <div key={businessId} className="col-xs-12 col-sm-6 col-lg-4 mt-4">
          <div className="card" >
            <Link to={businessLink} className="overflow">
              <img src={businessImage} alt={businessName} />
            </Link>
            <div className="card-body">
              <h5 className="card-title">{businessName}</h5>
              <div className="card-text small">
                <p className="mb-0">Category: {category}</p>
                <p className="mb-0">Tel: {phoneNumber}</p>
              </div>
              <Link to={businessLink} className="btn btn-primary btn-sm">
                View
              </Link>
            </div>
          </div>
        </div>
      )
    })
  );
}

export {
  stateArray,
  businessHours,
  populateOptions,
  populateBusinesses
};