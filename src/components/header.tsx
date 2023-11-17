import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";

const Header = () => {
  const [shadow, setShadow] = useState(false);

  const addShadow = () => {
    if (window.scrollY >= 10) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", addShadow);
    return () => {
      window.removeEventListener("scroll", addShadow);
    };
  }, []);

  const router = useRouter();
  const logout = () => {
    Cookies.remove("guestIds");
    router.push("/login");
  };

  return (
    <header>
      <nav
        className={`${
          shadow ? "shadow" : ""
        } navbar fixed-top navbar-expand-lg p-3`}
      >
        <div className="container-fluid">
          <Link href="/" className="navbar-brand">
            <img
              src="/images/logo_horizontal.png"
              alt="Astri og Petter"
              className="logo"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav ml-auto gap-3">
              <li className="nav-item">
                <Link className="nav-link" href="/rsvp">
                  Svar på invitasjonen
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/info">
                  Praktisk info
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/tidsplan">
                  Tidsplan
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#" onClick={logout}>
                  Logg ut
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
