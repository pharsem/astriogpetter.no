import Page from "@/components/page";
import {
  pluralGuests,
  getGuestDisplayName,
  fetchGuestsForPage,
} from "@/utils/helpers";
import React, { useState, useEffect } from "react";
import ChatBubble from "@/components/rsvpForm/chatBubble";
import { Response } from "@/components/rsvpForm/response";
import { ResponseOption } from "@/interfaces/responseOption";
import { Guest } from "@/interfaces/guest";
import { motion } from "framer-motion";

interface ChatStep {
  id: number;
  text: string;
  options?: ResponseOption[];
  responded?: boolean;
  systemMessage: boolean;
  next?: (response: string) => number | null;
}

export const getServerSideProps = fetchGuestsForPage();

type RsvpProps = {
  guests: Guest[];
};

const Rsvp: React.FC<RsvpProps> = ({ guests }) => {
  const rsvpDate = new Date("2024-05-12T00:00:00");
  const rsvpDatePassed = rsvpDate < new Date();
  const [isPlural, setIsPlural] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsPlural(pluralGuests());

    // TODO: Load existing response from database
  }, []);

  const handleButtonClick = (response: string, responseText: string) => {
    setIsExiting(true);
    setTimeout(() => handleResponse(response, responseText), 500); // Delay matches exit animation duration
  };

  const handleResponse = (response: string, responseText: string) => {
    const updatedConversation = conversation.map((step) =>
      step.id === conversation[currentStep].id ? { ...step, response } : step
    );

    // update responded value of current step
    updatedConversation[currentStep].responded = true;

    // insert response text into conversation
    updatedConversation.splice(currentStep + 1, 0, {
      id: currentStep + 0.1,
      text: responseText,
      responded: true,
      systemMessage: false,
    });

    setConversation(updatedConversation);

    const nextStep = conversation[currentStep].next?.(response);

    if (nextStep !== undefined && nextStep !== null) {
      const nextQuestion = questions.find((q) => q.id === nextStep);
      if (nextQuestion) {
        updatedConversation.splice(nextStep, 0, nextQuestion);
      }
      setCurrentStep(conversation.length - 1);
    } else {
      // TODO: handle end of conversation
    }

    console.log(conversation);

    // TODO: Save response to API or local storage
  };

  const questions: ChatStep[] = [
    {
      id: 1,
      text:
        "Hei, " +
        getGuestDisplayName(guests) +
        "!<br /><br />" +
        "Ser vi " +
        (isPlural ? "dere" : "deg") +
        " på Solstua den 6. juli?",
      options: [
        {
          type: "button",
          text: "Ja, " + (isPlural ? "vi" : "jeg") + " kommer! 🎉",
          value: "yes",
          className: "btn-success",
          handler: handleButtonClick,
        },
        {
          type: "button",
          text: "Nei, dessverre 😢",
          value: "no",
          className: "btn-danger",
          handler: handleButtonClick,
        },
      ],
      responded: false,
      systemMessage: true,
      next: (answer: string) => (answer === "yes" ? 2 : 10), // Next step depends on answer
    },
    {
      id: 2,
      text: "Har du noen allergier vi bør vite om?",
      options: [
        {
          type: "button",
          text: "Nei, ingen allergier",
          value: "no",
          className: "btn-success",
          handler: handleButtonClick,
        },
        {
          type: "text",
          text: "Annet",
          handler: handleResponse,
        },
      ],
      responded: false,
      systemMessage: true,
      next: () => 3, // Next step is always 3 after this
    },
    {
      id: 3,
      text: "Så synd! Har du en beskjed til oss, eller noe annet du har lyst til å si?",
      options: [
        {
          type: "text",
          text: "Annet",
          handler: handleResponse,
        },
      ],
      responded: false,
      systemMessage: true,
      next: () => null,
    },
  ];

  const [conversation, setConversation] = useState<ChatStep[]>([questions[0]]);

  return (
    <Page headerImageNumber={2}>
      <main className="container mt-5">
        <div className="card row p-5">
          <div className="card-body">
            {/* Card header */}
            <div className="col-8 mx-auto text-center mb-2">
              <h1 className="card-title">Svar på invitasjonen</h1>
              <p className="card-subtitle">
                {rsvpDatePassed
                  ? "Takk til alle som har svart!"
                  : "Svarfrist: " + rsvpDate.toLocaleDateString("no")}
              </p>
            </div>

            <hr className="mb-5" />

            {/* Chat form */}
            <div className="col-8 mx-auto text-center">
              {conversation.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.5 }}
                >
                  <ChatBubble
                    text={msg.text}
                    systemMessage={msg.systemMessage}
                  />
                </motion.div>
              ))}

              {currentStep !== null &&
                conversation[currentStep].responded === false && (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.5,
                      delay: (currentStep + 1) * 0.5,
                    }}
                  >
                    <Response
                      options={conversation[currentStep].options}
                    />
                  </motion.div>
                )}
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
};

export default Rsvp;
