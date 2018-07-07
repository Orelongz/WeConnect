// import required modules
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { validate } from './../../../utils';
import ContactForm from './../../forms/ContactForm.jsx';
import {
  searchImage,
  happyFace,
  contactImage,
  feedBack1,
  feedBack2,
  feedBack3
} from './../../../../public/images';

/**
 * HomePage
 * @desc renders the homepage of the app
 * @return {*} void
 */
class HomePage extends Component {
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
      alert(`Dear ${name}, ${email}, ${message}, your message has been sent`);
      this.setState({
        data: { name: '', email: '', message: '' }
      });
    }
  }

  /**
   * render
   * @desc renders the Homepage component
   * @return {Object} the Homepage component
   */
  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <main className="pb-main">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-2"></div>
              <div className="col-md-12 col-lg-8 text-center">

                <section id="about" className="mt-4 border-bottom pb-4">
                  <h3 className="text-center pt-3">About Us</h3>
                  <article className="lead">WeConnect, we are all about giving people easy access to businesses and services just in one click</article>
                  <div className="row">
                    <div className="col-sm-12 col-md-4 mt-3">
                      <div className="card">
                        <img className="compact-pic p-3" src={searchImage} alt="view a business"/>
                        <div className="card-body">
                          <p className="card-text">View/ Register a business</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-4 mt-3">
                      <div className="card">
                        <img className="compact-pic" src={contactImage} alt="contact the business" />
                        <div className="card-body">
                          <p className="card-text">Get in touch with a business</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-4 mt-3">
                      <div className="card">
                        <img className="compact-pic" src={happyFace} alt="customer satisfaction" />
                        <div className="card-body">
                          <p className="card-text">Happy customer/ business owner</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="feedback" className="mt-4 border-bottom">
                  <h3 className="text-center pt-3">What Our People Think</h3>
                  <article className="lead">With our sole aim of making business owners and customers happy, here are a few comments from business owners on the site</article>
                  <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner mt-3 h200">

                      <div className="media carousel-item active">
                        <img className="img-thumbnail small-profile-pic align-self-center" src={feedBack1} alt="business owner" />
                        <blockquote className="media-body blockquote text-center">
                          <p className="mb-0">I joined a few days back and already seeing results in my resturant</p>
                          <footer className="blockquote-footer">Favor</footer>
                        </blockquote>
                      </div>

                      <div className="media carousel-item">
                        <img className="img-thumbnail small-profile-pic align-self-center" src={feedBack2} alt="business owner" />
                        <blockquote className="media-body blockquote text-center">
                          <p className="mb-0">Thanks a lot guys. On joining weconnect my business went from being relatively unknown to getting orders in other states of the country.</p>
                          <footer className="blockquote-footer">Joshua</footer>
                        </blockquote>
                      </div>

                      <div className="media carousel-item">
                        <img className="img-thumbnail small-profile-pic align-self-center" src={feedBack3} alt="business owner" />
                        <blockquote className="media-body blockquote text-center">
                          <p className="mb-0">WeConnect offered me a wonderful platform to showcase my business.</p>
                          <footer className="blockquote-footer">Levi</footer>
                        </blockquote>
                      </div>

                    </div>
                  </div>
                </section>

              </div>
              <div className="col-md-12 col-lg-2"></div>
            </div>

            <section id="contact" className="mt-4">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-md-6 col-lg-7">
                    <div className="container card mt-5 py-3">
                      <h3 className="text-center">Contact Us</h3>
                      <ContactForm
                        errors={errors}
                        data={data}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                      />
                    </div>
                    </div>

                  <div className="col-xs-12 col-md-6 col-lg-5">
                    <div className="container card mt-5 py-3">
                      <div id="address">
                        <h3 className="text-center">Our Address</h3>
                        <div className="mt-4">
                          <i className="fa fa-home fa-2x" aria-hidden="true"></i>&nbsp; 345, heart closed, Kenturky Road, Nigeria
                        </div>
                        <div className="mt-3">
                          <i className="fa fa-envelope-o fa-lg" aria-hidden="true"></i>&nbsp; weconnect@domain.com
                        </div>
                        <div className="mt-3">
                          <i className="fa fa-mobile fa-2x" aria-hidden="true"></i>&nbsp; +234-999-403-98
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

export default HomePage;
