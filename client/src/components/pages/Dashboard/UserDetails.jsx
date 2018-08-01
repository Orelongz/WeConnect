// import required modules
import React from 'react';
import PropTypes from 'prop-types';
import EditUserDetails from './../../forms/EditUserDetails.jsx';

// define proptypes for UserDetails component
const propTypes = {
  toggleEditStatus: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  User: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
  displayImage: PropTypes.string.isRequired
};

/**
 * UserDetails()
 * @desc renders the UserDetails of the app
 * @return {void}
 */
function UserDetails({
  User, data, isEditing, errors, onSubmit,
  onChange, toggleEditStatus, displayImage
}) {
  const { firstname, lastname, email } = User;
  return (
    <div className="card mt-4 py-5 pr-5">
      {
        isEditing ? (
          <EditUserDetails
            toggleEditStatus={toggleEditStatus}
            displayImage={displayImage}
            onChange={onChange}
            onSubmit={onSubmit}
            errors={errors}
            data={data}
          />
        ) : (
          <div className="row">
            <div className="d-flex justify-content-center align-content-center col-sm-12 col-md-6">
              <div style={{ width: '300px', height: '300px' }}>
                <img src={displayImage} alt="" className="w-100 h-100 rounded-circle" />
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="form-group">
                <label>Name</label>
                <h3 id="userName">{firstname} {lastname}</h3>
              </div>
              <div className="form-group">
                <label>Email</label>
                <h3>{email}</h3>
              </div>
              <button onClick={toggleEditStatus} id="editUserDetails" className="btn btn-primary">Edit</button>
            </div>
          </div>
        )
      }
      </div>
  );
}

UserDetails.propTypes = propTypes;

export default UserDetails;
