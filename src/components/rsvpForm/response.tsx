import React from "react";
import responseButton from "./responseButton";
import responseInput from "./responseInput";
import { ResponseOption } from "@/interfaces/responseOption";

export interface ResponseProps {
  options?: ResponseOption[];
}

export const Response: React.FC<ResponseProps> = ({
  options
}) => {
  if (!options) return null;
  return (
    <div className="mt-3">
      {options.map((option, index) => {
        switch (option.type) {
          case "button":
            return responseButton({ option, index });

          case "input":
            return responseInput({ option, index });
            
          default:
            return null;
        }
      })}

    </div>
  );
};

export default Response;
