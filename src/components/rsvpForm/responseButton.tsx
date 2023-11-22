import React from "react";
import { ResponseOption } from "@/interfaces/responseOption";

interface ResponseButtonProps {
  option: ResponseOption;
  index: number;
}

export const ResponseButton: React.FC<ResponseButtonProps> = ({
  option,
  index
}) => {
  console.log(option);
  return (
    <button
      key={index}
      className={`btn ${option.className} me-2`}
      onClick={() => option.handler(option.value || "", option.text)}
    >
      {option.text}
    </button>
  );
};

export default ResponseButton;
