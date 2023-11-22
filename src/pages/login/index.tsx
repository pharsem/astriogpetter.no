import React, { useState, useEffect, useRef, use } from "react";
import router, { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";

// if the user is already logged in, redirect to the main page
export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.req.cookies.guestIds) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const getRandomImage = () => {
  const numImages = 2;

  return (
    "/images/landing-bg/" + Math.floor(Math.random() * numImages) + ".webp"
  );
};

const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [invitationCode, setInvitationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);;
  const { query } = useRouter();

  // New useEffect for handling the query parameter
  useEffect(() => {
    if (query.code) {
      validateInvitationCode(query.code.toString());
    }
  }, [query]);

  const validateInvitationCode = async (code: string) => {
    setIsLoading(true);
    setInvitationCode(code);

    try {
      // Call the API
      const response = await fetch("/api/verifyCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.toUpperCase() }),
      });

      const data: { payload?: { guests: any[] } } = await response.json();

      if (response.ok && data.payload?.guests) {
        Cookies.set("guestIds", JSON.stringify(data.payload.guests), {
          expires: 90,
        });
        router.push("/");
      } else {
        setErrorMessage(
          "Hmm, denne invitasjonskoden fant vi ikke. Prøv igjen?"
        );
        setIsLoading(false);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    } catch (error) {
      setErrorMessage("Oi, her skjedde det noe galt. Prøv igjen?");
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await validateInvitationCode(invitationCode);
  };

  const [currentImage, setCurrentImage] = useState(getRandomImage());
  const [loadingImage, setLoadingImage] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setOpacity(0); // Start fading out the current image
      setLoadingImage(true); // Indicate a new image will be loaded
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (loadingImage) {
      setTimeout(() => {
        setCurrentImage(getRandomImage()); // Change the image
        setOpacity(1); // Start fading in the new image
        setLoadingImage(false); // Image has been loaded
      }, 1000); // Delay equivalent to the fade-out time
    }
  }, [loadingImage]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div
      className="landing-page"
      style={{
        background: `url(${currentImage}) no-repeat center center fixed`,
        opacity: 1,
      }}
    >
      <div className="form-background">
        <form className="form" onSubmit={handleSubmit}>
          <label className="label" htmlFor="invitationCode">
            Skriv inn din invitasjonskode:
          </label>
          <div className="form-group">
            <input
              className="input"
              ref={inputRef}
              type="text"
              placeholder="F.eks.: ABC123"
              autoFocus={true}
              value={invitationCode}
              onChange={(e) => setInvitationCode(e.target.value)}
            />
            <button className="button" type="submit">
              {isLoading ? (
                <ClipLoader size={15} color={"white"} loading={isLoading} />
              ) : (
                <span className="arrow-icon">&rarr;</span>
              )}
            </button>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
