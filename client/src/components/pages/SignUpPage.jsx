import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => (
  <main className='pb-main mt-5'>
    <div className="container">
      <div className="row justify-content-center">
        <div className="card col-xs-10 col-sm-8 col-md-6 col-lg-4">
          <div className="container">
            <h2 className="text-center my-4">Create your account</h2>
            <form >
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" placeholder="Firstname" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" placeholder="Lastname" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" />
              </div>
              <p className="text-center small">By clicking Join Now, you agree to WeConnect <a href="#">User Agreement</a> and <a href="#">Privacy Policy</a></p>
              <button className="btn btn-primary w-100"><i className="fa fa-user-plus" aria-hidden="true"></i>&nbsp;Join Now</button>
            </form>
            <div className="d-inline-block pull-right pt-2">
              <p className="small">Already a member? <a href="signin.html">Sign in</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default SignUp;