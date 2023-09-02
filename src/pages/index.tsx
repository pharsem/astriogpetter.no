import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Head } from 'next/document';
import { Guest } from '@/interfaces/guest';

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get guestIds from cookies
  let guestIds = context.req.cookies.guestIds as string;
  let guests = null;

  if (guestIds) {
    guestIds = JSON.parse(guestIds);

    console.log(guestIds);

    // get guests from database
    const res = await fetch(process.env.BASE_URL + '/api/getGuests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guestIds })
    });

    if (res.ok) {
      guests = (await res.json())?.payload;

      console.log(guests);
    } else {
      console.log('Error fetching guests');
    }

  }

  if (!guests) {
    // if no guests are found, but there is a cookie, the cookie is invalid and should be deleted
    if (guestIds) {
      context.res.setHeader('Set-Cookie', 'guestIds=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    }
  
    // redirect to login page
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {guests},
  };
}

type HomeProps = {
  guests: Guest[];
};

const Home: React.FC<HomeProps> = ({ guests }) => {
  const router = useRouter();

  // get guest display name from props
  const getGuestDisplayName = () => {
    if (guests.length === 1) {
      return guests[0].firstName;
    } else if (guests.length === 2) {
      return guests[0].firstName + ' og ' + guests[1].firstName;
    } else {
      let displayName = '';
      for (let i = 0; i < guests.length; i++) {
        if (i === guests.length - 1) {
          displayName += ' og ' + guests[i].firstName;
        } else {
          displayName += guests[i].firstName + ', ';
        }
      }
      return displayName;
    }
  }

  const logout = () => {
    Cookies.remove('guestIds');
    router.push('/login');
  }
  
  const [shadow, setShadow] = useState(false);
  
  const addShadow = () => {
    if (window.scrollY >= 10) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  }
  
  useEffect(() => {
    window.addEventListener('scroll', addShadow);
    return () => {
      window.removeEventListener('scroll', addShadow);
    }
  }, []);

  return (
    <div className='container-fluid main-container'>

      <header className={`${shadow ? 'shadow' : ''} navbar fixed-top navbar-expand-lg p-3`}>
        <div className="container-fluid">
          <a href="/" className="navbar-brand">
            <img src="/images/logo_horizontal.png" alt="Astri og Petter" className="logo" />
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav ml-auto gap-3">
              <li className="nav-item">
                <a className="nav-link" href="#link1">Svar på invitasjonen</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#link2">Praktisk info</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#link3">Tidsplan</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={logout}>Logg ut</a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main className='container-fluid mt-5 p-5 row-gap-3'>

        {/* Item 1 */}
        <div className="row align-items-center g-0 my-5">
          <div className='col-lg-7 mb-4 mb-lg-0 ps-lg-5'>
            <img src="/images/img1.png" alt="Wedding" className="img-fluid"/>
          </div>

          <div className="col-lg-5 ms-0 ms-lg-n10 mt-n10 mt-lg-0">
            <div className="card shadow-5">
              <div className='card-body'>
                <h4 className='text-body-secondary'>Hei, {getGuestDisplayName()}!</h4>
                <h1 className='my-5'>Vi skal gifte oss!</h1>
                <button className="btn btn-primary">Bli med på festen →</button>
              </div>
            </div>
          </div>

        </div>
        {/* Item 1 end */}

        <div className="py-5"></div>

        {/* Item 2 */}
        <div className="row align-items-center g-0 my-5 justify-content-end">
          <div className="col-lg-5 ms-0 mt-n10 mt-lg-0 pe-lg-5 order-2 order-lg-1 text-center text-lg-end">
            <h1 className='my-5'>Lørdag <br />6. juli 2024</h1>
            <h4 className='text-body-secondary'>
              Vielse: 15:00 - 15:30 <br />
              Middag og fest: 17:30 - sent
            </h4>
          </div>
          
          <div className='col-lg-7 mb-4 mb-lg-0 order-1 order-lg-2'>
            <img src="/images/img1.png" alt="Wedding" className="img-fluid"/>
          </div>
        </div>
        {/* Item 2 end */}

        <div className="py-5"></div>

        {/* Item 3 */}
        <div className="row align-items-center g-0 my-5 justify-content-end">
          
          <div className='col-lg-7 mb-4 mb-lg-0'>
            <img src="/images/img1.png" alt="Wedding" className="img-fluid"/>
          </div>
          
          <div className="col-lg-5 ms-0 mt-n10 mt-lg-0 ps-lg-5 text-center text-lg-start">
            <h1 className='my-5'>Solstua</h1>
            <h4 className='text-body-secondary'>
              Thorleif Haugs vei 14,<br />0791 Oslo 
            </h4>
          </div>
        </div>
        {/* Item 3 end */}

        <div className="py-5"></div>

        {/* Buttons for each of the menu items */}
        <div className="row justify-content-center button-cards">

          <div className="col-lg-4 col-12 mb-4 mb-lg-0">
            <div className="card shadow-5 h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h4 className="text-body-secondary">Er du klar?</h4>
                <p className="card-text">Svar på invitasjonen og send oss infoen vi trenger!</p>
                <button className="btn btn-primary">Svar på invitasjonen →</button>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-12 mb-4 mb-lg-0">
            <div className="card shadow-5 h-100">
              <div className="card-body grid d-flex flex-column justify-content-between">
                  <h4 className="text-body-secondary">Jeg vil vite mer!</h4>
                  <p className="card-text">Finn ut hvordan du kommer deg til festen, hva du skal ha på deg, og annen praktisk info.</p>
                  <button className="btn btn-primary">Praktisk info →</button>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-12">
            <div className="card shadow-5 h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h4 className="text-body-secondary">Hvordan blir dagen?</h4>
                <p className="card-text">Sjekk ut tidsplanen da vel.</p>
                <button className="btn btn-primary">Tidsplan →</button>
              </div>
            </div>
          </div>

        </div>
        {/* Buttons end */}
        
      </main>

      <footer className='text-center py-5'>
        <img src="/images/footer_logo.png" alt="Astri og Petter" />
      </footer>

    </div>
  );
}

export default Home;