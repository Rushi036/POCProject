import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-fluid">
        <Row>
          <Col sm={6}>
            {currentYear} &copy; All Rights Reserved,{" "}
            <a href="https://www.adityabirla.com/">
              Aditya Birla Management Corporation Pvt. Ltd.
            </a>
          </Col>

          <Col sm={6}>
            <div className="text-sm-end footer-links d-none d-sm-block">
              <Link to="https://www.adityabirla.com/about-us">About Us</Link>
              <Link to="#">Help</Link>
              <Link to="https://www.adityabirla.com/contact-us">
                Contact Us
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
