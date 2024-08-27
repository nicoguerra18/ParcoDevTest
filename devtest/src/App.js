import HoursKey from "./components/HoursKey";
import MyDropDownHTP from "./components/MyDropDownHTP";
import MyDropDownHU from "./components/MyDropDownHU";
import Slider from "./components/Slider";
import { useState, useRef } from "react";

function App() {
  const [totalHours, setTotalHours] = useState(1000);
  const [hoursTowardsPension, setHoursTowardsPension] = useState(
    Math.floor(totalHours / 174) * 174
  );
  const [hoursWasted, setHoursWasted] = useState(
    totalHours - hoursTowardsPension
  );
  const [hoursUsed, setHoursUsed] = useState(0);

  function DropDownCard() {
    return (
      <div className="space-x-4 border max-h-[132px] rounded-lg p-4 mx-4 mb-7">
        <div className="flex space-x-4">
          <MyDropDownHTP
            setHoursTowardsPension={setHoursTowardsPension}
            hoursTowardsPension={hoursTowardsPension}
            setHoursWasted={setHoursWasted}
            totalHours={totalHours}
            setHoursUsed={setHoursUsed}
          />
          <div className="h-20 border-l-2 border-gray-100" />
          <MyDropDownHU
            setHoursTowardsPension={setHoursTowardsPension}
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
          hoursTowardsPension={hoursTowardsPension}
          setHoursTowardsPension={setHoursTowardsPension}
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
  hoursTowardsPension,
  hoursWasted,
  hoursUsed,
  setHoursTowardsPension,
  setHoursUsed,
  setHoursWasted,
}) {
  return (
    <div className="space-x-4 border rounded-lg overflow-hidden p-4 mx-4 mb-4">
      <div className="flex">
        <HoursKey hours={hoursTowardsPension} type="hoursToPension" />
        <HoursKey hours={hoursWasted} type="hoursWasted" />
        <HoursKey hours={hoursUsed} type="hoursUsed" />
      </div>
      <Slider
        hoursTowardsPension={hoursTowardsPension}
        setHoursTowardsPension={setHoursTowardsPension}
        hoursWasted={hoursWasted}
        hoursUsed={hoursUsed}
        setHoursWasted={setHoursWasted}
        setHoursUsed={setHoursUsed}
        totalHours={totalHours}
      />
    </div>
  );
}

// control button follows mouse but movement is restricted to the circumfrence of the circle
// get angle of mouse and horizontal axis of the center
// get mouse position and the cicle center in the wondow coordinates
//
// theta = arctan(mouseRelY / mouseRelX)
// quadrant 2
// if (mouseRelX < 0 && mouseRelY > 0) {
//   theta += Math.PI
// // quadrant 3
// } else if (mouseRelX < 0 && mouseRelY <= 0) {
//   theta += Math.PI
// // quadrant 4
// } else if (mouseRelX > 0 && mouseRelY <= 0) {
//   theta += 2 * Math.PI
// }

export default App;
