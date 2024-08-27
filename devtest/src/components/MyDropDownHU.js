import { useState } from "react";
import { UpArrow, DownArrow, QuestionMarkIcon } from "./Icons";

export default function MyDropDownHU({
  setHoursTowardsPension,
  hoursWasted,
  setHoursWasted,
  totalHours,
  hoursUsed,
  setHoursUsed,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const cutoff = 174;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Common logic for handling option click and input change
  const hoursLogic = (inputValueHU) => {
    let hoursLeftOver = totalHours - inputValueHU;
    let newHTP = Math.floor(hoursLeftOver / cutoff) * cutoff;
    setHoursTowardsPension(newHTP);
    setHoursUsed(inputValueHU);
    setHoursWasted(totalHours - newHTP - inputValueHU);
  };

  const handleOptionClick = (option) => {
    hoursLogic(option);
    handleSubmit();
    toggleDropdown();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (inputValue === "") {
      toggleDropdown();
      return;
    }
    let newHoursUsed = parseFloat(inputValue);
    // cut-off input values that are not allowed
    if (newHoursUsed > 0) newHoursUsed = Math.min(totalHours, newHoursUsed);
    else newHoursUsed = 0;
    if (!isNaN(newHoursUsed)) {
      // this check may not be needed
      hoursLogic(newHoursUsed);
      handleSubmit();
    } else {
      console.error("Invalid input");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  // Generate options based on total hours with a flag for rendering the message only once
  const generateOptions = () => {
    let options = [];
    let messageRendered = false; // Flag to ensure the message is rendered only once

    for (let i = 0; i <= totalHours; i += cutoff) {
      if (i > hoursWasted && !messageRendered) {
        // Add the message only the first time we go above hoursWasted
        options.push("cutting-note");
        messageRendered = true;
      }
      options.push(i);
    }
    return options;
  };

  return (
    <div className="w-full">
      <div className="flex items-center">
        <label>Sick Leave Hours I Want To Spend</label>
        <div class="tooltip">
          <QuestionMarkIcon />
          <span class="tooltiptext">
            Selecting a value that exceeds hours to spend will result in hours
            being deducted from your pension allocation.
          </span>
        </div>
      </div>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={`border rounded-lg p-2 w-full mt-2  ${
            submitted ? "border-parcoGreen" : "border-gray-300"
          }`}
          placeholder={hoursUsed + " Hours"}
        />
        <button
          type="submit"
          onClick={handleButtonClick}
          className={`absolute right-0 top-2 bottom-0 px-3 py-1 rounded-lg ${
            submitted === true ? "text-parcoGreen" : "text-grey"
          }`}
        >
          {isOpen && inputValue === "" ? (
            <UpArrow />
          ) : !isOpen && inputValue === "" ? (
            <DownArrow />
          ) : (
            "✓"
          )}
        </button>
      </div>
      {isOpen && (
        <div className="mt-2 border border-gray-200 rounded-md bg-white shadow-lg max-h-60 overflow-y-auto">
          <ul className="p-2">
            {generateOptions().map((option) =>
              option === "cutting-note" ? (
                <li
                  key="cutting-note"
                  className="py-2 px-4 cursor-default rounded-lg"
                >
                  <b>Cutting into Pension hours*</b>
                </li>
              ) : (
                <li
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`py-2 px-4 cursor-pointer rounded-lg ${
                    hoursUsed === option
                      ? "bg-dropBlue text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {option} Hours
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
