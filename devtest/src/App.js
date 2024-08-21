import HoursKey from "./components/HoursKey";
import MyDropDown from "./components/MyDropDown";
import Handle from "./components/Handle";
import { useState } from "react";

function App() {
  const [totalHours, setTotalHours] = useState(560);
  const [hoursTorwardPension, setHoursTorwardPension] = useState(0);
  const [hoursWasted, setHoursWasted] = useState(0);
  const [hoursUsed, setHoursUsed] = useState(0);

  return (
    <div className="App">
      <div className="max-w-[60vw] border rounded-lg shadow-md">
        <div class="px-6 py-4">
          <div class="font-medium text-xl mb-2">Sick Leave Calulator</div>
          <p class="font-medium text-gray-600">
            You are <b className="text-parcoRed">wasting x hours</b> of sick
            leave
          </p>
        </div>
        <DialCard />
        <div className="m-3 text-center text-sm">
          {" "}
          -- Interact with different ways you can spend your sick days! --
        </div>
        <DropDownCard />
      </div>
      <Handle />
    </div>
  );
}

function DialCard() {
  return (
    <div className="space-x-4 border rounded-lg overflow-hidden p-4 mx-4 mb-4">
      <div className="flex">
        <HoursKey hours="8" type="hoursToPension" />
        <HoursKey hours="2" type="hoursWasted" />
        <HoursKey hours="6" type="hoursUsed" />
      </div>
    </div>
  );
}

function DropDownCard() {
  return (
    <div className="space-x-4 border rounded-lg p-4 mx-4 mb-6">
      <div className="flex space-x-4">
        <MyDropDown type="hoursToPension" />
        <div className="h-20 border-l-2 border-gray-100" />
        <MyDropDown type="hoursToSpend" />
      </div>
    </div>
  );
}

export default App;
