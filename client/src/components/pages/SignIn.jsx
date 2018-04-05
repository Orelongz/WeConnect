import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => (
  <main className="pb-main mt-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="card col-xs-10 col-sm-8 col-md-6 col-lg-4">
          <div className="container">
            <h2 className="text-center my-4">Login</h2>
            <form >
              <div className="form-group">
                <label for="email">Email</label>
                <input type="text" className="form-control" id="userEmail" placeholder="example@domain.com" />
              </div>
              <div className="form-group">
                <label for="userPassword">Password</label>
                <input type="password" className="form-control" id="userPassword" placeholder="Password" />
              </div>
              <button className="btn btn-primary w-100"><i className="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign In</button>
            </form>
            <div className="d-flex justify-content-between small pt-2">
              <p className="d-inline-block">Not a member? <Link to='/signup'>Sign up </Link></p>
              <p className="d-inline-block"><Link to='/'>Forgot Password?</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default SignIn;