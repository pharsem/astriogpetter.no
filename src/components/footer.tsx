import React from "react";

const Footer = () => {
  return (
    <footer className="fixed-bottom py-5 d-flex align-items-center justify-content-center" style={{ position: "sticky", bottom: 0 }}>
      <div className="container text-center">
        <img src="/images/footer_logo.png" alt="Astri og Petter" />
      </div>
    </footer>
  );
};

export default Footer;
