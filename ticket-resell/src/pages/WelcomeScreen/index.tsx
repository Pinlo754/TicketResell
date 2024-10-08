import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div className="w-screen h-dvh">
      <div className="max-w-screen-lg h-screen mx-auto py-10 px-3 flex flex-col">
        <div>
          <p className="font-bold text-[100px] mb-6 text-black">
            Ticket Resell Project
          </p>

          <button
            className="bg-[yellow] text-black w-[100px] h-[50px] mx-auto"
            onClick={() => navigate("/main")}
          >
            Test navigate button
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
