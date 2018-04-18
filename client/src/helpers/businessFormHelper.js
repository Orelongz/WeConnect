import React from 'react';
import shortid from 'shortid';

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
  businessHours,
  populateOptions
};