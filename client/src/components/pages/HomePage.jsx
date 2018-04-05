import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const HomePage = () => (
  <div>
    <SearchBar />
    <main className="pb-main">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-2"></div>
          <div className="col-md-12 col-lg-8 text-center">

            <section id="about" className="mt-4 border-bottom pb-4">
              <h3 className="text-center pt-3">About Us</h3>
              <article className="lead">At WeConnect, we are all about giving people easy access to businesses and services just in one click</article>
              <div className="row">
                <div className="col-sm-12 col-md-4 mt-3">
                  <div className="card">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/61M2ls4U%2BiL.png" className="compact-pic p-3" />
                    <div className="card-body">
                      <p className="card-text">View/ Register a business</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-4 mt-3">
                  <div className="card">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWW0d9IQvzsJzyZx9uLDlHrITTqMLwRElLQjxM5IA9mpu2tf3_5w" className="compact-pic" />
                    <div className="card-body">
                      <p className="card-text">Get in touch with a business</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-4 mt-3">
                  <div className="card">
                    <img src="http://api.ning.com/files/VrpMXk5gFE1k0TaxhueybvE2t7Tx-16c1X613sfzTmbw0C9XszGtbyhhVdmkQ8OEPlJ97IBlxxK9jI9HQncabc9sn8rwZGgt/walmartsmiley.jpg" className="compact-pic" />
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
                    <img src="https://www.eurweb.com/wp-content/uploads/2017/11/jenifer-lewis.jpg" className="img-thumbnail small-profile-pic align-self-center" />
                    <blockquote className="media-body blockquote text-center">
                      <p className="mb-0">I joined a few days back and already seeing results in my resturant</p>
                      <footer className="blockquote-footer">Favor</footer>
                    </blockquote>
                  </div>

                  <div className="media carousel-item">
                    <img src="https://hairstyleonpoint.com/wp-content/uploads/2014/11/e7bba04af85ea21708bbdcdcd3414bc1-e1416520592212.jpg" className="img-thumbnail small-profile-pic align-self-center" />
                    <blockquote className="media-body blockquote text-center">
                      <p className="mb-0">Thanks a lot guys. On joining weconnect my business went from being relatively unknown to getting orders in other states of the country.</p>
                      <footer className="blockquote-footer">Joshua</footer>
                    </blockquote>
                  </div>

                  <div className="media carousel-item">
                    <img src="http://brianmushimba.com/images/brian_index_1.png" className="img-thumbnail small-profile-pic align-self-center" />
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
                  <form>
                    <div className="form-row">
                      <div className="col">
                        <label for="name">Name</label>
                        <input type="text" className="form-control" placeholder="Name" id="name" />
                      </div>
                      <div className="col">
                        <label for="email">Email</label>
                        <input type="email" className="form-control" placeholder="email" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="name">Message</label>
                      <textarea type="text" className="form-control" placeholder="Message" id="message" rows="4"></textarea>
                    </div>
                    <a href="#" type="submit" className="btn btn-primary">Send</a>
                  </form>
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

export default HomePage;