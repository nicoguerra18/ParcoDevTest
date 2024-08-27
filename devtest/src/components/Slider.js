import { useState, useEffect } from "react";

export default function Slider({
  hoursTowardsPension,
  hoursWasted,
  hoursUsed,
  setHoursTowardsPension,
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
  }, [hoursUsed, hoursTowardsPension]);

  // Update slider value when hour towards pension changes
  useEffect(() => {
    let a = totalHours;
    let b = hoursTowardsPension;
    setValue2(() => a - b);
  }, [hoursTowardsPension]);

  // lock slider when hoursWasted == 0 (will not catch if you slide too fast though ****)
  useEffect(() => {
    if (hoursWasted === 0) {
      setIsLocked(() => true);
    }
  }, [hoursUsed]);

  // Logic for slider values
  const handleSliderChange = (event) => {
    let newHoursUsed = event.target.value;
    let hoursLeftOver = totalHours - newHoursUsed;
    let newHTP = Math.floor(hoursLeftOver / cutoff) * cutoff;
    setHoursTowardsPension(newHTP);
    setHoursUsed(newHoursUsed);
    setHoursWasted(totalHours - newHTP - newHoursUsed);
    setValue(newHoursUsed);
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
        onMouseDown={unlockSlider}
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
      <div className="flex flex-col items-center w-full mt-2 font-bold text-gray-600">
        <div className="text-3xl">{totalHours}</div>
        <div className="text-center w-[110px]">Total Hours of Sick Leave</div>
      </div>
    </div>
  );
}
