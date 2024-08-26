import { useState } from "react";

export default function MyDropDownHTP({
  setHoursTorwardPension,
  hoursTorwardPension,
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
    let hoursLeftOver = totalHours - newHTPValue;
    setHoursTorwardPension(newHTPValue);
    setHoursUsed(hoursLeftOver);
    setHoursWasted(0);
  };

  const handleOptionClick = (option) => {
    hoursLogic(option);
    handleSubmit();
    toggleDropdown();
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    let newHTPValue = parseFloat(inputValue);
    if (!isNaN(newHTPValue)) {
      hoursLogic(newHTPValue);
      handleSubmit();
    } else {
      console.error("Invalid input");
    }
  };

  let options = [];
  let maxHours = Math.floor(totalHours / cutoff) * cutoff;
  for (let i = maxHours; i >= 0; i -= cutoff) {
    options.push(i);
  }

  return (
    <div className="w-full">
      <div className="flex items-center">
        <label>Sick Leave Hours Torward My Pension</label>
        <div class="tooltip">
          <QuestionMarkIcon />
          <span class="tooltiptext">
            Adjust hours you would like to allocate to pension
          </span>
        </div>
      </div>

      <div className="relative mt-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={toggleDropdown}
          className={`border rounded-lg p-2 w-full pr-12 ${
            submitted ? "border-parcoGreen" : "border-gray-300"
          }`}
          placeholder={hoursTorwardPension + " Hours"}
        />
        <button
          type="submit"
          onClick={handleButtonClick}
          className={`absolute right-0 top-0 bottom-0 px-3 py-1 rounded-lg ${
            submitted ? "text-parcoGreen" : "text-grey"
          }`}
        >
          ✓
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
                  hoursTorwardPension === option
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
