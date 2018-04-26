import React from 'react';

function dateTime(str) {
  const date = str.split('T')[0];
  const time = str.split('T')[1].split('.')[0];
  return {date, time};
};

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
                  {dateTime(review.createdAt).date}
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