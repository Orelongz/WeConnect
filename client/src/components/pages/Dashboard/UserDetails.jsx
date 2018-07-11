// import required modules
import React from 'react';
import PropTypes from 'prop-types';
import InlineError from '../../messages/InLineError';

// define proptypes for UserDetails component
const propTypes = {
  toggleEditStatus: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  User: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

/**
 * UserDetails()
 * @desc renders the UserDetails of the app
 * @return {void}
 */
function UserDetails({
  User, data, isEditing, errors, onSubmit,
  onChange, toggleEditStatus
}) {
  const { firstname, lastname, email } = User;
  if (isEditing) {
    return (
      <form onSubmit={onSubmit}>
        <div className="row">
          <label className="col-3">Firstname</label>
          <input
            className="form-control col-9"
            type="text"
            name="firstname"
            value={data.firstname}
            onChange={onChange}
          />
          {errors.firstname && <InlineError text={errors.firstname} />}
        </div>
        <div className="row">
          <label className="col-3">Lastname</label>
          <input
            className="form-control col-9"
            type="text"
            name="lastname"
            value={data.lastname}
            onChange={onChange}
          />
          {errors.lastname && <InlineError text={errors.lastname} />}
        </div>
        <div className="row">
          <label className="col-3">Email</label>
          <input
            className="form-control col-9"
            type="text"
            name="email"
            value={data.email}
            onChange={onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </div>
        <div>
          <input
            type="file"
            id="userImage"
            name="userImage"
            onChange={onChange}
            accept="image/*"
          />
        </div>
        <button className="btn btn-primary pull-right">Save</button>
    </form>
    );
  }
  return (
    <div>
      <div className="row">
        <label className="col-3">Firstname</label>
        <div className="col-9">{firstname}</div>
      </div>
      <div className="row">
        <label className="col-3">Lastname</label>
        <div className="col-9">{lastname}</div>
      </div>
      <div className="row">
        <label className="col-3">Email</label>
        <div className="col-9">{email}</div>
      </div>
      <button onClick={toggleEditStatus} className="btn btn-primary pull-right">Edit</button>
    </div>
  );
}

UserDetails.propTypes = propTypes;

export default UserDetails;
