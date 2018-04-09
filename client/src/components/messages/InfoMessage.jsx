import React from 'react';
import PropTypes from 'prop-types';

const propTypes  = {
  text: PropTypes.string.isRequired
};

function InfoMessages({ text }) {
  return (
    <div className="alert alert-info" role="alert">
      {text}
    </div>
  );
};

InfoMessages.propTypes = propTypes;

export default InfoMessages;