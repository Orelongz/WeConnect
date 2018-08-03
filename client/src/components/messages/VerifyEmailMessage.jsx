import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string
};

/**
 * VerifyEmailMessage
 * @param {Object} props
 * @return {Object} react component
 */
export default function VerifyEmailMessage({ name }) {
  return (
    <div className="text-center bg-info text-white lead py-2">
       Welcome {name}.
       Kindly check your email for the link to verify your account
    </div>
  );
}

VerifyEmailMessage.propTypes = propTypes;
