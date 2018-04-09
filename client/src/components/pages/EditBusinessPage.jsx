import React from 'react';
import { Link } from 'react-router-dom';

const EditBusiness = () => (
  <main className="pb-main">
    <div className="container">
      <div className="row justify-content-center">
        <div className="card py-3 col-xs-12 col-sm-10">
          <div className="container">
            <h2 className="text-center">Edit Business Profile</h2>
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="companyName">Company Name</label>
                  <input type="text" className="form-control" id="companyName" value="Coffee Shop" />
                </div>
                <div className="col-md-6">
                  <label>Change profile picture</label>
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="company-picture" />
                    <label className="custom-file-label" for="company-picture">Choose file</label>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="company-address">Address</label>
                  <input type="text" className="form-control" id="company-address" value="Street" />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="company-city">City</label>
                  <input type="text" className="form-control" id="company-city" value="City" />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="company-state">State</label>
                  <select id="company-state" className="form-control">
                    <option value="0">Choose...</option>
                    <option value="1" selected>Lagos</option>
                    <option value="2">Abuja</option>
                    <option value="3">Calabar</option>
                    <option value="4">Enugu</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="company-phoneNo">Phone Number</label>
                  <input type="text" className="form-control" id="company-phoneNo" vlaue="0907879879" />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="company-postalAddress">Postal Address</label>
                  <input type="text" className="form-control" id="company-postalAddress" placeholder="Postal Address" />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="company-workingHours">Working hours</label>
                  <input type="text" className="form-control" id="company-workingHours" value="9am  to  4:30pm" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="company-summary">About your business</label>
                <textarea type="text" className="form-control" id="company-summary" rows="5">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor. in reprehenderit in voluptate velit esse llum dolore eu fugiat nulla pariatur. epteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</textarea>
              </div>
              <a href="business-profile.html" type="submit" className="btn btn-danger">Cancel</a>
              <a href="#" type="submit" className="btn btn-primary pull-right">Save</a>
            </form>
            <hr />
            <h4 className="text-center">Transfer Business</h4>
            <form>
              <div className="form-row">
                <label className="col-xs-12 col-md-2" for="changeOwnership">Email: </label>
                <div  className="col-xs-12 col-md-6">
                  <input type="text" className="form-control" id="changeOwnership" placeholder="example@domain.com" />
                </div>
                <div  className="col-xs-12 col-md-4">
                  <a href="#" type="submit" className="btn btn-primary form-control">Transfer</a>
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default EditBusiness;