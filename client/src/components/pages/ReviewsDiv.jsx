import React, { Component } from 'react';
import ReviewForm from './../forms/ReviewForm';

class ReviewDiv extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  submit(data) {
    return this.props.postReview(data);
  }

  render() {
    return (
      <div className="card form-group mt-5">
        <div className="container pt-3">

          <div className="media">
            <img src="https://i.stack.imgur.com/34AD2.jpg" className="img-thumbnail rounded-circle small-profile-pic mr-3" />
            <ReviewForm submit={this.submit} />
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewDiv;