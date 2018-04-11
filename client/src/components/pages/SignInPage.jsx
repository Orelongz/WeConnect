import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignInForm from './../forms/SignInForm';
import InfoMessage from './../messages/InfoMessage';
import { signin } from './../../actions/AuthAction';

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signin: PropTypes.func.isRequired
}

class SignInPage extends Component {
  constructor() {
    super();
    this.state = {
      error: ''
    }
    this.submit = this.submit.bind(this);
  }

  submit(data) {
    return this.props
      .signin(data)
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({
        error: err.response.data
      }));
  }

  render() {
    const { error } = this.state
    return (
      <div className="pb-main">
        {error.status === 'fail' && <InfoMessage text={error.error} type='danger' />}
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="card col-xs-10 col-sm-8 col-md-6 col-lg-4">
              <div className="container">
                <h2 className="text-center my-4">Signin</h2>
                  <SignInForm submit={this.submit}/>
                <div className="d-flex justify-content-between small pt-2">
                  <p className="d-inline-block">Not a member? <Link to='/signup'>Sign up </Link></p>
                  <p className="d-inline-block"><Link to='/'>Forgot Password?</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

SignInPage.propTypes = propTypes;

export default connect(null, { signin })(SignInPage);