import Page from "@/components/page";
import { pluralGuests, getGuests } from "@/utils/helpers";
import React, { useState, useEffect } from "react";

const Rsvp = () => {
  const rsvpDate = new Date("2024-05-12T00:00:00");
  const rsvpDatePassed = rsvpDate < new Date();
  const [isPlural, setIsPlural] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setIsPlural(pluralGuests());
  }, []);

  const guests = getGuests();

  return (
    <Page headerImageNumber={2}>
      <main className="container mt-5">
        <div className="row">
          <div className="col-8 mx-auto text-center">
            <h1>Kommer {isPlural ? "dere" : "du"} for å feire med oss?</h1>
            {/* Buttons */}
            {!response && (
              <>
                <button
                  className="btn btn-success me-2"
                  onClick={() => setResponse("yes")}
                >
                  Ja
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => setResponse("no")}
                >
                  Nei
                </button>
              </>
            )}

            {/* After selection */}
            {response === "yes" && (
              <div className="mt-4">
                <button className="btn btn-success">Ja</button>
                <p className="mt-3">
                  Takk for at {isPlural ? "dere" : "du"} vil feire med oss!
                </p>
              </div>
            )}
            {response === "no" && (
              <div className="mt-4">
                <button className="btn btn-danger">Nei</button>
                <p className="mt-3">
                  Vi synes det er trist at {isPlural ? "dere" : "du"} ikke kan komme.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </Page>
  );
};

export default Rsvp;
