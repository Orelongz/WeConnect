// import required modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { validate } from './../../../utils';
import ContactForm from './../../forms/ContactForm.jsx';
import { contactUs } from './../../../actions/AuthAction';
import InfoMessage from './../../messages/InfoMessage.jsx';

const propTypes = {
  contactUs: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

/**
 * HomePage
 * @desc renders the homepage of the app
 * @return {*} void
 */
export class HomePage extends Component {
  /**
   * constructor
   * @desc constructor for the ContactForm component
   * @return {*} void
   */
  constructor() {
    super();
    this.state = {
      data: {
        name: '',
        email: '',
        message: ''
      },
      messageSent: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * onChange
   * @desc handles state change when value of input fields change
   * @param {Object} event DOM event
   * @return {func} new state object
   */
  onChange(event) {
    return this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value }
    });
  }

  /**
   * onSubmit
   * @desc handles submit of the contact form
   * @param {Object} event DOM event
   * @return {func} submit
   */
  onSubmit(event) {
    event.preventDefault();
    const { name, email, message } = this.state.data;
    const errors = validate({ name, email, message });
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.contactUs({ name, email, message });
      this.setState({
        data: { name: '', email: '', message: '' },
        messageSent: true
      });
    }
  }

  /**
   * render
   * @desc renders the Homepage component
   * @return {Object} the Homepage component
   */
  render() {
    const { data, errors, messageSent } = this.state;
    const { isLoading } = this.props;

    return (
      <div>
        <main className="pb-home">
          <section className="header d-flex justify-content-center">
            <div className="col-sm-12 col-md-8 col-lg-6 align-self-center text-white">
              <div className="jumbotron" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <div className="text-center" style={{ color: '#1d2252' }}>
                  <h1>Welcome to WeConnect</h1>
                  <p>The wonderful platform that connects businesses with individuals</p>
                </div>
              </div>
            </div>
          </section>

          { messageSent && <InfoMessage text="Thank you for contacting us. We sure would get back to you soon." type="info"/>}

          <section id="about" className="text-center">
            <div className="container">
              <h2 className="header-title">About WeConnect</h2>
              <article className="lead header-title-text">At WeConnect, we are all about giving people easy access to businesses and services just in one click</article>
              <div className="row mt-3 text-white">
                <div className="col-sm-12 col-md-6 col-lg-3 py-4 mt-3" style={{ backgroundColor: '#1d2252' }}>
                  <div className="p-3 about-icon">
                    <img src="https://image.flaticon.com/icons/svg/483/483342.svg" alt="signup/signin" />
                  </div>
                  <div>
                    <h6 className="mt-4 font-weight-bold" style={{ color: '#dd3545' }} >Signup /Signin</h6>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 py-4 mt-3" style={{ backgroundColor: '#dd3545' }}>
                  <div className="p-3 about-icon">
                    <img src="https://image.flaticon.com/icons/svg/622/622666.svg" alt="contact the business" />
                  </div>
                  <div>
                    <h6 className="mt-4 font-weight-bold" style={{ color: '#1d2252' }}>View/ Register business</h6>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 py-4 mt-3" style={{ backgroundColor: '#1d2252' }}>
                  <div className="p-3 about-icon">
                    <img src="https://image.flaticon.com/icons/svg/76/76910.svg" alt="contact the business" />
                  </div>
                  <div>
                    <h6 className="mt-4 font-weight-bold" style={{ color: '#dd3545' }}>Get in touch</h6>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 py-4 mt-3" style={{ backgroundColor: '#dd3545' }}>
                  <div className="p-3 about-icon">
                    <img src="https://image.flaticon.com/icons/svg/90/90583.svg" alt="contact the business" />
                  </div>
                  <div>
                    <h6 className="mt-4 font-weight-bold" style={{ color: '#1d2252' }}>Happy customer</h6>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="feedback">
            <div className="container">
              <h2 className="header-title text-center">What People Say</h2>
              <article className="lead header-title-text text-center">With our sole aim of making business owners and customers happy, here are a few comments from business owners on the site</article>
              <div className="row text-center">
                <div className="col-sm-12 col-md-4 mt-3">
                  <div className="d-flex">
                    <img className="small-profile-pic rounded-circle" src="/images/feedback_1.jpg" alt="business owner" />
                    <div className="ml-2 align-items-center d-flex">
                      <p><strong>Favor</strong> ---- <i>Resturant owner</i></p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-0">I joined a few days back and already seeing results in my resturant</p>
                  </div>
                </div>

                <div className="col-sm-12 col-md-4 mt-3">
                  <div className="d-flex">
                    <img className="small-profile-pic rounded-circle" src="/images/feedback_2.jpg" alt="business owner" />
                    <div className="ml-2 align-items-center d-flex">
                      <p><strong>Joshua</strong> ---- <i>Resturant owner</i></p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-0">Thanks a lot guys. On joining weconnect my business went from being relatively unknown to getting orders in other states of the country.</p>
                    <footer className="div-footer"></footer>
                  </div>
                </div>

                <div className="col-sm-12 col-md-4 mt-3">
                  <div className="d-flex">
                    <img className="small-profile-pic rounded-circle" src="/images/feedback_3.png" alt="business owner" />
                    <div className="ml-2 align-items-center d-flex">
                      <p><strong>Levi</strong> ---- <i>Resturant owner</i></p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-0">WeConnect offered me a wonderful platform to showcase my business.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact">
            <div className="overlay">
              <div className="container">
                <h2 className="text-center header-title text-white">Contact Us</h2>
                <div className="row justify-content-center">
                <ContactForm
                  errors={errors}
                  data={data}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  isLoading={isLoading}
                />
                </div>
              </div>
            </div>
          </section>

          <section id="address" className="text-center">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-4">
                  <div className="w-50 mx-auto">
                    <div>
                      <i className="fa fa-map-marker fa-2x" aria-hidden="true"></i>
                    </div>
                    <p className="mt-3 mb-0">345, Gbajabiamila way, Ikorodu Road, Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="col-sm-12 col-md-4">
                  <div className="w-50 mx-auto">
                    <div>
                      <i className="fa fa-envelope-o fa-2x" aria-hidden="true"></i>
                    </div>
                    <p className="mt-3 mb-0">weconnect@domain.com</p>
                    <p className="mb-0">orelongz@gmail.con</p>
                  </div>
                </div>
                <div className="col-sm-12 col-md-4">
                  <div className="w-50 mx-auto">
                    <div>
                      <i className="fa fa-mobile fa-3x" aria-hidden="true"></i>
                    </div>
                    <p className="mt-3 mb-0"> +234-999-403-98</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

HomePage.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state redux state
 * @return {Object} BusinessesPage props
 */
function mapStateToProps(state) {
  return {
    isLoading: state.loadingReducer.isRequestLoading
  };
}

export default connect(mapStateToProps, {
  contactUs
})(HomePage);
