import React from 'react';
import shortid from 'shortid';

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

export {
  stateArray,
  businessHours,
  populateOptions
};