import React from 'react';
import shortid from 'shortid';

// array holding all nigerian states
const stateArray = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Benue', 'Borno',
  'Bayelsa', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'Federal Capital Territory', 'Gombe', 'Jigawa', 'Imo', 'Kaduna', 'Kebbi',
  'Kano', 'Kogi', 'Lagos', 'Katsina', 'Kwara', 'Nasarawa', 'Niger', 'Ogun',
  'Ondo', 'Rivers', 'Oyo', 'Osun', 'Sokoto', 'Plateau', 'Taraba', 'Yobe', 'Zamfara'
];

/**
 * populateOptions()
 * @desc maps through an array
 * @param {Array} passedArray
 * @return {Array} mapped array
 */
const populateOptions = passedArray => (
  passedArray.map(item => (
    <option key={shortid.generate()} value={item}>{item}</option>
  ))
);


/**
 * businessHours()
 * @desc returns business hours
 * @param {String} str
 * @return {Array} business hours
 */
const businessHours = (str) => {
  const workHours = [];
  for (let i = 1; i <= 12; i += 1) {
    workHours.push(`${i}${str}`);
  }
  return populateOptions(workHours);
};

export {
  stateArray,
  businessHours,
  populateOptions
};
