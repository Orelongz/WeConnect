// import required modules
import React from 'react';
import PropTypes from 'prop-types';
import InLineError from './../messages/InLineError.jsx';

// define proptypes for EditUserDetails component
const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleEditStatus: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  displayImage: PropTypes.string.isRequired,
};

/**
 * EditUserDetails()
 * @desc renders the EditUserDetails of the app
 * @return {void}
 */
function EditUserDetails({
  data, errors, onSubmit, onChange,
  toggleEditStatus, displayImage
}) {
  return (
    <form onSubmit={onSubmit} className="row">
      <div className="d-flex justify-content-center align-content-center col-sm-12 col-md-6">
        <div style={{ width: '300px', height: '300px' }}>
          <img src={displayImage} alt="" className="w-100 h-100 rounded-circle" />
        <input
          type="file"
          id="userImage"
          name="userImage"
          className="w-50"
          onChange={onChange}
          accept="image/*"
        />
        </div>
      </div>
      <div className="col-sm-12 col-md-6">
        <div className="form-group">
          <label>Name</label>
          <div className="form-row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                placeholder="*Firstname"
                value={data.firstname}
                onChange={onChange}
              />
              {errors.firstname && <InLineError text={errors.firstname} />}
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                placeholder="*Lastname"
                value={data.lastname}
                onChange={onChange}
              />
              {errors.lastname && <InLineError text={errors.lastname} />}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            placeholder="*example@domain.com"
            value={data.email}
            onChange={onChange}
          />
          {errors.email && <InLineError text={errors.email} />}
        </div>

        <div>
          <button onClick={toggleEditStatus} className="btn btn-danger">Cancel</button>
          <button className="btn btn-primary pull-right" id="saveUserDetails">Save</button>
        </div>
      </div>
    </form>
  );
}

EditUserDetails.propTypes = propTypes;

export default EditUserDetails;
