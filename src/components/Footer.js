import React from "react";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#A9A9A9",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
    // position: "fixed",
    bottom: "0px", // You should use a string value for 'bottom'
    width: "100%",
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Your Website Name</p>
    </footer>
  );
};

export default Footer;


