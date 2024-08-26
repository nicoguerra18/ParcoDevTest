import { useState, useEffect } from "react";

export default function MyDropDownHU({
  setHoursTorwardPension,
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
    setHoursTorwardPension(newHTP);
    setHoursUsed(inputValueHU);
    setHoursWasted(totalHours - newHTP - inputValueHU);
  };

  const handleOptionClick = (option) => {
    hoursLogic(option);
    toggleDropdown();
    handleSubmit();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    let newHoursUsed = parseFloat(inputValue);
    if (!isNaN(newHoursUsed)) {
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
          <span class="tooltiptext">Adjust hours you would like to spend</span>
        </div>
      </div>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={toggleDropdown}
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
          ✓
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

function QuestionMarkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      fill="#504f4f"
      class="bi bi-question-circle-fill mb-6 ml-5 mr-2"
      viewBox="0 0 16 16"
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
    </svg>
  );
}
