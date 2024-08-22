import HoursKey from "./components/HoursKey";
import MyDropDown from "./components/MyDropDown";
import Handle from "./components/Handle";
import Slider from "./components/Slider";
import { useState, useEffect } from "react";

function App() {
  const [totalHours, setTotalHours] = useState(520);
  const [hoursTorwardPension, setHoursTorwardPension] = useState(
    Math.floor(totalHours / 100) * 100
  );
  const [hoursWasted, setHoursWasted] = useState(
    totalHours - hoursTorwardPension
  );
  const [hoursUsed, setHoursUsed] = useState(0);

  return (
    <div className="App">
      <div className="max-w-[500px] border rounded-lg shadow-md">
        <div class="px-6 py-4">
          <div class="font-medium text-xl mb-2">Sick Leave Calulator</div>
          <p class="font-medium text-gray-600">
            You are <b className="text-parcoRed">wasting {hoursWasted} hours</b>{" "}
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
        <div className="m-3 text-center text-sm">
          {" "}
          -- Interact with different ways you can spend your sick days! --
        </div>
        <DropDownCard setHoursUsed={setHoursUsed} />
      </div>
      <Handle />
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

function DropDownCard({ setHoursUsed }) {
  return (
    <div className="space-x-4 border rounded-lg p-4 mx-4 mb-6">
      <div className="flex space-x-4">
        <MyDropDown type="hoursToPension" />
        <div className="h-20 border-l-2 border-gray-100" />
        <MyDropDown type="hoursToSpend" changeHours={setHoursUsed} />
      </div>
    </div>
  );
}

export default App;
