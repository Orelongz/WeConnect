import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBusiness } from './../../actions/businessAction';

const propTypes = {
  getBusiness: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      businessId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

class BusinessProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      error: {}
    };
  }

  componentDidMount() {
    const { businessId } = this.props.match.params;
    return this.props
      .getBusiness(businessId)
      .then(() => {
        const { businessDetails } = this.props;
        this.setState({ data: businessDetails })
      })
      .catch(err => this.setState({
        error: handleErrorCatch(err.response.data)
      }));
  }

  render() {
    const {
      businessName, businessImage, category, address, city, state: businessState,
      phoneNumber, postalAddress, startTime, closeTime, about, id
    } = this.state.data;
    return (
      <main className="pb-main">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-4 mt-4">
              <div className="card">
                <div className="card-header font-weight-bold bg-secondary text-white">
                  {businessName}
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <i className="fa fa-home fa-lg" aria-hidden="true"></i>
                    &nbsp;{address}, {city}, {businessState} state.
                  </li>
                  <li className="list-group-item">
                    <i className="fa fa-clock-o fa-lg" aria-hidden="true"></i>
                    &nbsp;{startTime} to {closeTime}
                  </li>
                  <li className="list-group-item">
                    <i className="fa fa-mobile fa-lg" aria-hidden="true"></i>
                    &nbsp;{phoneNumber}
                  </li>
                </ul>
              </div>

              <div id="map"></div>
            </div>
            <div className="col-md-12 col-lg-8 mt-4">
              <div className="card">
                <img src={businessImage} alt={businessName} className="card-img-top" />
                <div className="card-body">
                  <div>
                    <h1>About {businessName}</h1>
                    <article className="text-justify">
                      {about}
                    </article>
                  </div>
                  <div>
                    <Link to={`/businesses/${id}/edit`} className="btn btn-primary">Edit</Link>
                    <Link to='/businesses' className="btn btn-danger pull-right">Delete</Link>
                  </div>
                </div>
              </div>

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

            </div>
          </div>

        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    businessDetails: { ...state.business.business }
  };
}

BusinessProfilePage.propTypes = propTypes;

export default connect(mapStateToProps, { getBusiness })(BusinessProfilePage);