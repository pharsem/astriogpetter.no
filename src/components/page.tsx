import React from "react";
import Header from "./header";
import Footer from "./footer";

type PageProps = {
  children: React.ReactNode;
  headerImageNumber?: number;
};

const Page: React.FC<PageProps> = ({ children, headerImageNumber }) => {
  const headerImageClass = headerImageNumber
    ? "expand-header-image-" + headerImageNumber
    : "";

  return (
    <div className="d-flex flex-column min-vh-100">
      <div
        className={`container-fluid main-container d-flex flex-column ${headerImageClass}`}
      >
        <Header />
        <div className="flex-grow-1">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
