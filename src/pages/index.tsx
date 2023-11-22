import React, { useEffect, useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Guest } from "@/interfaces/guest";
import { getGuestDisplayName, pluralGuests, fetchGuestsForPage } from "@/utils/helpers";
import Link from "next/link";
import Page from "@/components/page";

export const getServerSideProps = fetchGuestsForPage(
  async (context: GetServerSidePropsContext, guests: null | Guest[]) => {
    // Additional page-specific server-side code
    // `guests` are already fetched by fetchGuestsForPage
    return {
      props: {
        // Additional props for the page
      },
    };
  }
);


type HomeProps = {
  guests: Guest[];
};

const Home: React.FC<HomeProps> = ({ guests }) => {
  // get guest display name from props
  const displayName = getGuestDisplayName(guests);

  const [isPlural, setIsPlural] = useState(false);

  useEffect(() => {
    setIsPlural(pluralGuests());
  }, []);

  return (
    <Page headerImageNumber={1}>
      <main className="container-fluid mt-5 p-5 row-gap-3">
        {/* Item 1 */}
        <div className="row align-items-center g-0 my-5">
          <div className="col-lg-7 mb-4 mb-lg-0 ps-lg-5">
            <img src="/images/img1.png" alt="Wedding" className="img-fluid" />
          </div>

          <div className="col-lg-5 ms-0 ms-lg-n10 mt-n10 mt-lg-0">
            <div className="card shadow-5">
              <div className="card-body">
                <h4 className="text-body-secondary">
                  Hei, {displayName}!
                </h4>
                <h1 className="my-5">Vi skal gifte oss!</h1>
                <Link href="/rsvp" className="btn btn-primary">
                  Bli med på festen →
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Item 1 end */}

        <div className="py-5"></div>

        {/* Item 2 */}
        <div className="row align-items-center g-0 my-5 justify-content-end">
          <div className="col-lg-5 ms-0 mt-n10 mt-lg-0 pe-lg-5 order-2 order-lg-1 text-center text-lg-end">
            <h1 className="my-5">
              Lørdag <br />
              6. juli 2024
            </h1>
            <h4 className="text-body-secondary">
              Vielse: 15:00 - 15:30 <br />
              Middag og fest: 17:30 - sent
            </h4>
          </div>

          <div className="col-lg-7 mb-4 mb-lg-0 order-1 order-lg-2">
            <img src="/images/img1.png" alt="Wedding" className="img-fluid" />
          </div>
        </div>
        {/* Item 2 end */}

        <div className="py-5"></div>

        {/* Item 3 */}
        <div className="row align-items-center g-0 my-5 justify-content-end">
          <div className="col-lg-7 mb-4 mb-lg-0">
            <img src="/images/img1.png" alt="Wedding" className="img-fluid" />
          </div>

          <div className="col-lg-5 ms-0 mt-n10 mt-lg-0 ps-lg-5 text-center text-lg-start">
            <h1 className="my-5">Solstua</h1>
            <h4 className="text-body-secondary">
              Thorleif Haugs vei 14,
              <br />
              0791 Oslo
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
                <h4 className="text-body-secondary">
                  Er {isPlural ? "dere klare" : "du klar"}?
                </h4>
                <p className="card-text">
                  Svar på invitasjonen og send oss infoen vi trenger!
                </p>
                <Link href="/rsvp" className="btn btn-primary">
                  Svar på invitasjonen →
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-12 mb-4 mb-lg-0">
            <div className="card shadow-5 h-100">
              <div className="card-body grid d-flex flex-column justify-content-between">
                <h4 className="text-body-secondary">
                  {isPlural ? "Vi" : "Jeg"} vil vite mer!
                </h4>

                <p className="card-text">
                  Finn ut hvordan{" "}
                  {isPlural ? "dere kommer dere" : "du kommer deg"} til festen,
                  hva {isPlural ? "dere skal ha på dere" : "du skal ha på deg"},
                  og annen praktisk info.
                </p>

                <Link href="/info" className="btn btn-primary">
                  Praktisk info →
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-12">
            <div className="card shadow-5 h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h4 className="text-body-secondary">Hvordan blir dagen?</h4>

                <p className="card-text">Sjekk ut tidsplanen da vel.</p>

                <Link href="/tidsplan" className="btn btn-primary">
                  Tidsplan →
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Buttons end */}
      </main>
    </Page>
  );
};

export default Home;
