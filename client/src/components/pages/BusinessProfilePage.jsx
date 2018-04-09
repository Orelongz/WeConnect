import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => (
  <main class="pb-main">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-4 mt-4">
            <div class="card">
              <div class="card-header font-weight-bold bg-secondary text-white">
                Coffee Shop
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <i class="fa fa-home fa-lg" aria-hidden="true"></i>
                    No 3, Street, City, Lagos
                </li>
                <li class="list-group-item">
                    <i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>
                    9am to 5pm
                </li>
                <li class="list-group-item">
                    <i class="fa fa-mobile fa-lg" aria-hidden="true"></i>
                    0907879879
                </li>
              </ul>
            </div>

            <div id="map"></div>
          </div>
          <div class="col-md-12 col-lg-8 mt-4">
            <div class="card">
              <img src="https://static1.squarespace.com/static/5081d50c84ae11269e707c6d/t/57db6063ebbd1a04788888ca/1473994861037/?format=500w" alt="coffee shop" class="card-img-top" />
              <div class="card-body">
                <div>
                  <h1>About Coffee shop</h1>
                  <article class="text-justify">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <p>
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
                    </p>
                    <p>
                      in reprehenderit in voluptate velit esse llum dolore eu fugiat nulla pariatur. epteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </article>
                </div>
                <div>
                  <Link to='/edit-business' class="btn btn-primary">Edit</Link>
                  <Link to='/' class="btn btn-danger pull-right">Delete</Link>
                </div>
              </div>
            </div>

            <form class="card form-group mt-5">
              <div class="container pt-3">

                <div class="media">
                  <img src="https://i.stack.imgur.com/34AD2.jpg" class="img-thumbnail rounded-circle small-profile-pic mr-3" />
                  <div class="media-body">
                    <div>
                      <label htmlFor="review">Write a review: </label>
                      <textarea class="form-control" id="review"></textarea>
                    </div>

                    <div class="pt-3">
                      <div class="d-inline">
                        <span class="fa fa-star-o"></span>
                        <span class="fa fa-star-o"></span>
                        <span class="fa fa-star-o"></span>
                        <span class="fa fa-star-o"></span>
                        <span class="fa fa-star-o"></span>
                      </div>
                      <a href="#" class="btn btn-primary btn-sm pull-right">POST</a>
                    </div>
                  </div>
                </div>

                <ul class="list-unstyled">
                  <li class="media border-top pt-3 mt-3">
                    <img src="https://i.stack.imgur.com/34AD2.jpg" class="img-thumbnail rounded-circle small-profile-pic mr-3" />
                    <div class="media-body">
                      <div>
                        <h5 class="d-inline">Hammed</h5>
                        <div class="d-inline pull-right">
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star-o"></span>
                          </div>
                      </div>
                      <p>They serve the best coffee ever.</p>
                    </div>
                  </li>
                  <li class="media border-top pt-3 mt-3">
                    <img src="https://i.stack.imgur.com/34AD2.jpg" class="img-thumbnail rounded-circle small-profile-pic mr-3" />
                    <div class="media-body">
                      <div>
                        <h5 class="d-inline">Tobi</h5>
                        <div class="d-inline pull-right">
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star-o"></span>
                          <span class="fa fa-star-o"></span>
                          <span class="fa fa-star-o"></span>
                        </div>
                      </div>
                      <p>They need to improve their service. I got in and spent over 5 mins waiting to get my coffee. Not cool.</p>
                    </div>
                  </li>
                  <li class="media border-top pt-3 mt-3">
                    <img src="https://i.stack.imgur.com/34AD2.jpg" class="img-thumbnail rounded-circle small-profile-pic mr-3" />
                    <div class="media-body">
                      <div>
                        <h5 class="d-inline">Cynthia</h5>
                        <div class="d-inline pull-right">
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star-o"></span>
                        </div>
                      </div>
                      <p>I kind of agree with Tobi, but they still make a very nice coffee though</p>
                    </div>
                  </li>
                </ul>

              </div>
            </form>

          </div>
        </div>

      </div>
    </main>
);

export default SignIn;