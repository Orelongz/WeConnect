import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RegisterBusinessForm from './../forms/RegisterBusinessForm';
import InfoMessage from './../messages/InfoMessage';
import { newBusiness } from './../../actions/businessAction';
import { handleErrorCatch } from './../../helpers';

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  newBusiness: PropTypes.func.isRequired
};

class RegisterBusinessPage extends Component {
  constructor() {
    super();
    this.state = {
      error: null
    };
    this.submit = this.submit.bind(this);
  }

  submit(data) {
    return this.props
      .newBusiness(data)
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({
        error: handleErrorCatch(err.response.data)
      }));
  }

  render() {
    const { error } = this.state;

    return (
      <main className="pb-main">
        {error && <InfoMessage text={error} type='danger' />}
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="card py-3 col-xs-12 col-sm-10">
              <div className="container">
                <h2 className="text-center">Register your new business</h2>
                <RegisterBusinessForm submit={this.submit}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

RegisterBusinessPage.propTypes = propTypes;

export default connect(null, { newBusiness })(RegisterBusinessPage);