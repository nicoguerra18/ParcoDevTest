import { useState, useEffect } from "react";

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
  const [isLocked, setIsLocked] = useState(false);
  const [value2, setValue2] = useState(0);
  const cutoff = 174;

  // Update slider value when hoursUsed changes
  useEffect(() => {
    setValue(hoursUsed);
  }, [hoursUsed]);

  // Update slider value when hour toward pension changes
  useEffect(() => {
    let a = totalHours;
    let b = hoursTorwardPension;
    setValue2(() => a - b);
  }, [hoursTorwardPension]);

  // Logic for slider values
  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    const diff = newValue - hoursUsed;

    if (hoursWasted - diff === 0) {
      setHoursWasted(hoursWasted - diff);
      setIsLocked(true);
    } else if (hoursWasted - diff >= cutoff) {
      setHoursTorwardPension(hoursTorwardPension + cutoff);
      setHoursWasted(hoursWasted - cutoff - diff);
    } else if (hoursWasted - diff > 0) {
      setHoursWasted(hoursWasted - diff);
    } else {
      // take a chunk from hours torward pension and add it to hourswasted and then perfrom the operation
      setHoursTorwardPension(hoursTorwardPension - cutoff);
      setHoursWasted(hoursWasted + cutoff - diff);
    }
    setHoursUsed(newValue);
    setValue(newValue);
  };

  // Unlock the slider on touch up
  const unlockSlider = () => {
    setIsLocked(false);
  };

  return (
    <div className="slider-container mt-4">
      <input
        type="range"
        min="0"
        max={totalHours}
        value={value}
        className="slider1 rounded-full"
        id="slider1"
        onChange={!isLocked ? handleSliderChange : null}
        onMouseUp={unlockSlider}
      />
      <input
        type="range"
        min="0"
        disabled
        max={totalHours}
        value={value2}
        className="slider2 rounded-full"
        id="slider2"
      />
      <div
        className={
          "flex flex-col items-center w-full mt-2 font-bold text-gray-600"
        }
      >
        <div className="text-3xl">{totalHours}</div>
        <div className="text-center w-[110px]">Total Hours of Sick Leave</div>
      </div>
    </div>
  );
}
