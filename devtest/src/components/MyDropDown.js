import { useState } from "react";

const types = {
  hoursToPension: {
    label: "Sick Leave Hours Torwards My Pension",
    options: ["174", "348", "522", "696"],
  },
  hoursToSpend: {
    label: "Sick Leave Hours I Want To Spend",
    options: ["174", "348", "522"],
  },
};

export default function MyDropDown({ type, changeHours }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const { label, options } = types[type] || {}; // destructure type

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (hours) => {
    setInputValue(hours);
    setSelectedOption(hours);
    changeHours(hours);
    toggleDropdown();
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="w-full">
      <label>{label}</label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={() => toggleDropdown()}
        className="border rounded-md p-2 w-full"
        placeholder="Type or select an option"
      />
      {isOpen && (
        <div className="mt-2 border border-gray-200 rounded-md bg-white shadow-lg max-h-60 overflow-y-auto">
          <ul className="p-2">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`py-2 px-4 cursor-pointer rounded-lg ${
                  selectedOption === option
                    ? "bg-dropBlue text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
