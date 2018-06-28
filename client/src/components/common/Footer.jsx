// import required modules
import React from 'react';

/**
 * Footer
 * @desc renders the footer of the app
 * @return {Object} rendered Footer component
 */
function Footer() {
  return (
    <footer className="footer py-2 bg-dark">
      <div className="container text-center text-white">
        <p className="d-inline">Copyright &copy; 2018&nbsp;</p>
        <p className="d-inline border-left">&nbsp; Made with <span className="text-danger">&#9829;</span> by Longe Pelumi</p>
      </div>
    </footer>
  );
}

export default Footer;
