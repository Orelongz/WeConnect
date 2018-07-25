// import required modules
import React from 'react';
import PropTypes from 'prop-types';
import InLineError from './../messages/InLineError.jsx';
import {
  stateArray,
  businessHours,
  populateOptions
} from './../../utils/businessUtils';

// define proptypes for BusinessForm component
const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  displayPreview: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  FormAction: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  ImageHeader: PropTypes.string.isRequired,
  history: PropTypes.object
};

/**
 * BusinessForm()
 * @desc renders the BusinessForm component
 * @return {*} void
 */
function BusinessForm({
  errors, data, categories, FormAction, onChange, onSubmit,
  displayPreview, history, ImageHeader
}) {
  return (

    <form className="container" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="businessName">Business Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Business Name"
            id= "businessName"
            name= "businessName"
            value={data.businessName}
            onChange={onChange}
          />
          {errors.businessName && <InLineError text={errors.businessName} />}
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="category">Choose a category</label>
          <select
            name="category"
            className="form-control"
            id="category"
            onChange={onChange}
            value={data.category}
          >
            {populateOptions(categories)}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="business-address">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            id="business-address"
            name="address"
            value={data.address}
            onChange={onChange}
          />
          {errors.address && <InLineError text={errors.address} />}
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="city">City</label>
          <input
            className="form-control"
            type="text"
            id="city"
            placeholder="City"
            name="city"
            value={data.city}
            onChange={onChange}
          />
          {errors.city && <InLineError text={errors.city} />}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="state">State</label>
          <select
            name="businessState"
            className="form-control"
            id="businessState"
            value={data.businessState}
            onChange={onChange}
          >
            {populateOptions(stateArray)}
          </select>
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="postalAddress">Postal Address</label>
          <input
            type="text"
            className="form-control"
            id="postalAddress"
            name="postalAddress"
            placeholder="Postal Address"
            value={data.postalAddress}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            value={data.phoneNumber}
            onChange={onChange}
          />
          {errors.phoneNumber && <InLineError text={errors.phoneNumber} />}
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="businessHours">Business hours</label>
          <div className="form-row">
            <select
              name="startTime"
              className="form-control col-5"
              value={data.startTime}
              onChange={onChange}
            >
              {businessHours('am')}
            </select>
            <span className="col-2 text-center">to</span>
            <select
              name="closeTime"
              className="form-control col-5"
              value={data.closeTime}
              onChange={onChange}
            >
              {businessHours('pm')}
            </select>
          </div>
        </div>
      </div>

      <div className="form-row justify-content-center">
        <div className="col-sm-12 col-md-10 col-lg-8 text-center">
          <label htmlFor="businessImage"><strong>{ImageHeader}</strong></label>
          <div className="bg-secondary text-white">
            {displayPreview()}
            <input
              type="file"
              id="businessImage"
              name="businessImage"
              accept="image/*"
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="about">About your business</label>
        <textarea
          type="text"
          className="form-control"
          name="about"
          rows="5"
          value={data.about}
          onChange={onChange}
        />
        {errors.about && <InLineError text={errors.about} />}
      </div>

      <div>
        <button onClick={() => history.goBack()} className="btn btn-danger">Cancel</button>
        <button type="submit" className="btn btn-primary pull-right">{FormAction}</button>
      </div>
    </form>
  );
}

BusinessForm.propTypes = propTypes;

export default BusinessForm;
