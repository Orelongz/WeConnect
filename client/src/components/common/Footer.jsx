// import required modules
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer
 * @desc renders the footer of the app
 * @return {Object} rendered Footer component
 */
function Footer() {
  return (
    <footer className="footer py-4 text-white text-center">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <Link to="/" className="navbar-brand">
              <h4>WeConnect</h4>
            </Link>
          </div>
          <div className="col-sm-12 col-md-4 text-center">
            <p>&copy; 2018. Made by Longe Pelumi</p>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="w-50 d-flex mx-auto justify-content-between">
              <div><i className="fa fa-facebook social" aria-hidden="true"></i></div>
              <div><i className="fa fa-instagram social" aria-hidden="true"></i></div>
              <div><i className="fa fa-twitter-square social" aria-hidden="true"></i></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
