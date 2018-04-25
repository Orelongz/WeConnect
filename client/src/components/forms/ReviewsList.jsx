import React from 'react';

export default function ReviewForm() {
  return (
    <form className="card form-group mt-5">
      <div className="container pt-3">

        <div className="media">
          <img src="https://i.stack.imgur.com/34AD2.jpg" className="img-thumbnail rounded-circle small-profile-pic mr-3" />
          <div className="media-body">
            <div>
              <label htmlFor="review">Write a review: </label>
              <textarea className="form-control" id="review"></textarea>
            </div>

            <div className="pt-3">
              <div className="d-inline">
                <span className="fa fa-star-o"></span>
                <span className="fa fa-star-o"></span>
                <span className="fa fa-star-o"></span>
                <span className="fa fa-star-o"></span>
                <span className="fa fa-star-o"></span>
              </div>
              <a href="#" className="btn btn-primary btn-sm pull-right">POST</a>
            </div>
          </div>
        </div>

        <ul className="list-unstyled">
          <li className="media border-top pt-3 mt-3">
            <img src="https://i.stack.imgur.com/34AD2.jpg" className="img-thumbnail rounded-circle small-profile-pic mr-3" />
            <div className="media-body">
              <div>
                <h5 className="d-inline">Hammed</h5>
                <div className="d-inline pull-right">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star-o"></span>
                  </div>
              </div>
              <p>They serve the best coffee ever.</p>
            </div>
          </li>
          <li className="media border-top pt-3 mt-3">
            <img src="https://i.stack.imgur.com/34AD2.jpg" className="img-thumbnail rounded-circle small-profile-pic mr-3" />
            <div className="media-body">
              <div>
                <h5 className="d-inline">Tobi</h5>
                <div className="d-inline pull-right">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star-o"></span>
                  <span className="fa fa-star-o"></span>
                  <span className="fa fa-star-o"></span>
                </div>
              </div>
              <p>They need to improve their service. I got in and spent over 5 mins waiting to get my coffee. Not cool.</p>
            </div>
          </li>
          <li className="media border-top pt-3 mt-3">
            <img src="https://i.stack.imgur.com/34AD2.jpg" className="img-thumbnail rounded-circle small-profile-pic mr-3" />
            <div className="media-body">
              <div>
                <h5 className="d-inline">Cynthia</h5>
                <div className="d-inline pull-right">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star-o"></span>
                </div>
              </div>
              <p>I kind of agree with Tobi, but they still make a very nice coffee though</p>
            </div>
          </li>
        </ul>
      </div>
    </form>
  );
}