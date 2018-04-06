import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignInForm from './../forms/SignInForm';

class SignIn extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  submit(data) {
    console.log(data);
  }

  render() {
    return (
      <main className="pb-main mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="card col-xs-10 col-sm-8 col-md-6 col-lg-4">
              <div className="container">
                <h2 className="text-center my-4">Login</h2>
                  <SignInForm submit={this.submit}/>
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
  }
};

export default SignIn;