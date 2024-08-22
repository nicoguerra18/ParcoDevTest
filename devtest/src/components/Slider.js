import { useState } from "react";

export default function Slider({
  hoursTorwardPension,
  hoursWasted,
  hoursUsed,
  setHoursTorwardPension,
  setHoursWasted,
  setHoursUsed,
  totalHours,
}) {
  const [value, setValue] = useState(0); // Initial value
  const cutoff = 100;

  // Logic for slider values
  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    const diff = newValue - hoursUsed;

    if (hoursWasted - diff >= cutoff) {
      setHoursTorwardPension(hoursTorwardPension + cutoff);
      setHoursWasted(hoursWasted - cutoff - diff);
    } else if (hoursWasted - diff >= 0) {
      setHoursWasted(hoursWasted - diff);
    } else {
      // take a chunk from hours torward pension and add it to hourswasted and then perfrom the operation
      setHoursTorwardPension(hoursTorwardPension - cutoff);
      setHoursWasted(hoursWasted + cutoff - diff);
    }
    setHoursUsed(newValue);
    setValue(newValue);
  };

  return (
    <div className="slidecontainer mt-4">
      <input
        type="range"
        min="0"
        max={totalHours}
        value={value}
        className="slider"
        id="mySlider"
        onChange={handleSliderChange}
      />
      <div
        className={"flex flex-col items-center w-full font-bold text-gray-600"}
      >
        <div className="text-3xl">{totalHours}</div>
        <div className="text-center w-[110px]">Total Hours of Sick Leave</div>
      </div>
    </div>
  );
}
