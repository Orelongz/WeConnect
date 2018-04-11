import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignUpForm from './../forms/SignUpForm';
import InfoMessage from './../messages/InfoMessage';
import { signup } from './../../actions/AuthAction';
import handleErrorCatch from './../../helpers/handleErrorCatch';

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
}

class SignUpPage extends Component {
  constructor() {
    super();
    this.state = {
      error: null
    }
    this.submit = this.submit.bind(this);
  }

  submit(data) {
    return this.props
      .signup(data)
      .then(() => this.props.history.push('/'))
      .catch(err => {
        this.setState({
          error: handleErrorCatch(err.response.data)
        })
      });
  }

  render() {
    const { error } = this.state
    return (
      <div className="pb-main">
        {error && <InfoMessage text={error} type='danger' />}
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="card col-xs-10 col-sm-8 col-md-6 col-lg-4">
              <div className="container">
                <h2 className="text-center my-4">Create your account</h2>
                <SignUpForm submit={this.submit}/>
                <div className="d-inline-block pull-right small pt-2">
                  <p>Already a member? <Link to='/signin'>Sign in</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

SignUpPage.propTypes = propTypes;

export default connect(null, { signup })(SignUpPage);