import { ResponseOption } from "@/interfaces/responseOption";
import React from "react";

interface ResponseButtonProps {
  option: ResponseOption;
  index: number;
}

export const ResponseButton: React.FC<ResponseButtonProps> = ({
  option,
  index
}) => {
  return (
    <div className="mt-3">
      <button
        key={index}
        className={`btn ${option.className} me-2`}
      >
        {option.text}
      </button>
    </div>
  );
};

export default ResponseButton;
