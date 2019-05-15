import React from "react";
import PropTypes from "prop-types";

function Footer({ copyrights }) {
  return <footer className="c-footer">{copyrights}</footer>;
}

Footer.propTypes = {
  copyrights: PropTypes.string.isRequired
};

export default Footer;
