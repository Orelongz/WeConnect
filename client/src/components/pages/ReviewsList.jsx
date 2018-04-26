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
            <div className="d-flex justify-content-between">
              <h5>{review.User.firstname} {review.User.lastname}</h5>
              <div>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star-o"></span>
                </div>
                <div>
                  {review.createdAt.split('T')[0]}
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