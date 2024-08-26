import HoursKey from "./components/HoursKey";
import MyDropDownHTP from "./components/MyDropDownHTP";
import MyDropDownHU from "./components/MyDropDownHU";
import Slider from "./components/Slider";
import { useState } from "react";

function App() {
  const [totalHours, setTotalHours] = useState(1000);
  const [hoursTorwardPension, setHoursTorwardPension] = useState(
    Math.floor(totalHours / 174) * 174
  );
  const [hoursWasted, setHoursWasted] = useState(
    totalHours - hoursTorwardPension
  );
  const [hoursUsed, setHoursUsed] = useState(0);

  function DropDownCard() {
    return (
      <div className="space-x-4 border max-h-[132px] rounded-lg p-4 mx-4 mb-7">
        <div className="flex space-x-4">
          <MyDropDownHTP
            setHoursTorwardPension={setHoursTorwardPension}
            hoursTorwardPension={hoursTorwardPension}
            setHoursWasted={setHoursWasted}
            totalHours={totalHours}
            setHoursUsed={setHoursUsed}
          />
          <div className="h-20 border-l-2 border-gray-100" />
          <MyDropDownHU
            setHoursTorwardPension={setHoursTorwardPension}
            hoursWasted={hoursWasted}
            setHoursWasted={setHoursWasted}
            totalHours={totalHours}
            hoursUsed={hoursUsed}
            setHoursUsed={setHoursUsed}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="max-w-[525px] max-h-[555px] border rounded-lg shadow-md">
        <div className="px-6 py-4">
          <div className="font-medium text-xl mb-2">Sick Leave Calulator</div>
          <p className="font-medium text-gray-600">
            You are{" "}
            <b
              className={
                hoursWasted === 0 ? "text-parcoGreen" : "text-parcoRed"
              }
            >
              wasting {hoursWasted} hours
            </b>{" "}
            of sick leave
          </p>
        </div>
        <DialCard
          hoursTorwardPension={hoursTorwardPension}
          setHoursTorwardPension={setHoursTorwardPension}
          hoursWasted={hoursWasted}
          setHoursWasted={setHoursWasted}
          hoursUsed={hoursUsed}
          setHoursUsed={setHoursUsed}
          totalHours={totalHours}
        />
        <div className="m-3 text-center text-gray-600 text-sm">
          {" "}
          -- Interact with different ways you can spend your sick days! --
        </div>
        <DropDownCard />
      </div>
    </div>
  );
}

function DialCard({
  totalHours,
  hoursTorwardPension,
  hoursWasted,
  hoursUsed,
  setHoursTorwardPension,
  setHoursUsed,
  setHoursWasted,
}) {
  return (
    <div className="space-x-4 border rounded-lg overflow-hidden p-4 mx-4 mb-4">
      <div className="flex">
        <HoursKey hours={hoursTorwardPension} type="hoursToPension" />
        <HoursKey hours={hoursWasted} type="hoursWasted" />
        <HoursKey hours={hoursUsed} type="hoursUsed" />
      </div>
      <Slider
        hoursTorwardPension={hoursTorwardPension}
        setHoursTorwardPension={setHoursTorwardPension}
        hoursWasted={hoursWasted}
        hoursUsed={hoursUsed}
        setHoursWasted={setHoursWasted}
        setHoursUsed={setHoursUsed}
        totalHours={totalHours}
      />
    </div>
  );
}

export default App;
