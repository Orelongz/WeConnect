import React from 'react';
import shortid from 'shortid';

const businessHours = (str) => {
  const workHours = [];
  for (let i = 1; i <= 12; i += 1) {
    workHours.push(`${i}${str}`);
  }
  return (
    workHours.map((time) => {
      return (
        <option key={shortid.generate()} value={time}>{time}</option>
      );
    })
  );
};

const populateStates = (stateArray) => {
  return (
    stateArray.map((eachState) => {
      return (
        <option key={shortid.generate()} value={eachState.name}>{eachState.name}</option>
      );
    })
  )
};

export {
  businessHours,
  populateStates
};