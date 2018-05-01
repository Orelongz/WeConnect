import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validate } from './../../utils';
import InlineError from './../messages/InLineError';

const propTypes = {
  User: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired
};

class UserDetails extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      errors: {},
      isEditing: false
    };
    this.toggleEditStatus = this.toggleEditStatus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChange(e) {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }

  toggleEditStatus() {
    const { id, ...rest } = this.props.User;
    this.setState({
      isEditing: true,
      data: { ...this.state.data, ...rest }
    });
  }

  submit(e) {
    e.preventDefault();
    const errors = validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.editUserDetails(this.state.data);
      this.setState({
        isEditing: false
      });
    }

  }

  renderDetailsOrEdit() {
    const { firstname, lastname, email } = this.props.User;
    const { data, isEditing, errors } = this.state;
    if (isEditing) {
      return (
        <form onSubmit={this.submit}>
          <div className="row">
            <label className="col-3">Firstname</label>
            <input
              className="form-control col-9"
              type="text"
              name="firstname"
              value={data.firstname}
              onChange={this.onChange}
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
              onChange={this.onChange}
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
              onChange={this.onChange}
            />
            {errors.email && <InlineError text={errors.email} />}
          </div>
          <button className="btn btn-primary pull-right">Save</button>
      </form>
      )
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
        <button onClick={this.toggleEditStatus} className="btn btn-primary pull-right">Edit</button>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        {this.renderDetailsOrEdit()}
      </div>
    );
  }
}

UserDetails.propTypes = propTypes;

export default UserDetails;