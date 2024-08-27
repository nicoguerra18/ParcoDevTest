import { useEffect, useState } from "react";
import { UpArrow, DownArrow, QuestionMarkIcon } from "./Icons";

export default function MyDropDownTP({
  setHoursTowardsPension,
  hoursTowardsPension,
  setHoursWasted,
  totalHours,
  setHoursUsed,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const cutoff = 174;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const hoursLogic = (hours) => {
    let newHTPValue = hours;
    newHTPValue = Math.floor(newHTPValue / cutoff) * cutoff; // hours are rounded down to the nearest multiple of the cutoff
    let hoursLeftOver = totalHours - newHTPValue;
    setHoursTowardsPension(newHTPValue);
    setHoursUsed(hoursLeftOver);
    setHoursWasted(0);
  };

  const handleOptionClick = (option) => {
    hoursLogic(option);
    setSubmitted(() => true);
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

    let newHTPValue = parseFloat(inputValue);
    // cut-off input values that are not allowed
    if (newHTPValue > 0) newHTPValue = Math.min(totalHours, newHTPValue);
    else newHTPValue = 0;

    if (!isNaN(newHTPValue)) {
      // this check may not be needed
      hoursLogic(newHTPValue);
      setSubmitted(true);
    } else {
      console.error("Invalid input");
    }
  };

  let options = [];
  let maxHours = Math.floor(totalHours / cutoff) * cutoff;
  for (let i = maxHours; i >= 0; i -= cutoff) {
    options.push(i);
  }

  console.log("submitted:" + submitted);

  return (
    <div className="w-full">
      <div className="flex items-center">
        <label>Sick Leave Hours Towards My Pension</label>
        <div class="tooltip">
          <QuestionMarkIcon />
          <span class="tooltiptext">
            Adjust hours to allocate to pension (inputed hours are rounded down
            to the nearest multiple of 174)
          </span>
        </div>
      </div>

      <div className="relative mt-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={`border rounded-lg p-2 w-full pr-12 ${
            submitted === true ? "border-parcoGreen" : "border-gray-300"
          }`}
          placeholder={hoursTowardsPension + " Hours"}
        />
        <button
          onClick={handleButtonClick}
          className={`absolute right-0 top-0 bottom-0 px-3 py-1 rounded-lg ${
            submitted ? "text-parcoGreen" : "text-grey"
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
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`py-2 px-4 cursor-pointer rounded-lg ${
                  hoursTowardsPension === option
                    ? "bg-dropBlue text-white"
                    : "hover:bg-gray-100"
                }
                `}
              >
                {option} Hours
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
