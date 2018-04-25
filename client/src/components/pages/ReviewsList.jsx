import React from 'react';

export default function ReviewList({ businessReviews }) {

  const generateReviews = () => {
    return businessReviews.length > 0 ? (
      businessReviews.map(review => (
        <li className="media border-top pt-3 mt-3" key={review.id}>
          <img
            src="https://i.stack.imgur.com/34AD2.jpg"
            className="img-thumbnail rounded-circle small-profile-pic mr-3"
          />
          <div className="media-body">
            <div>
              <h5 className="d-inline">{review.User.firstname} {review.User.lastname}</h5>
              <div className="d-inline pull-right">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star-o"></span>
                </div>
            </div>
            <p>{review.review}</p>
          </div>
        </li>
      ))
    ) : null;
  };

  return (
    <ul className="list-unstyled">
      {generateReviews()}
    </ul>
  );
}