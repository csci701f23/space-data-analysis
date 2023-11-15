"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import UploadRaw from "../components/uploadRaw";

export default function Calibrate() {
  const [currentStep, setCurrentStep] = useState("red");

  const handleContinue = () => {
    if (currentStep === "red") {
      setCurrentStep("green");
    } else if (currentStep === "green") {
      setCurrentStep("blue");
    } else if (currentStep === "blue") {
      // Here is where we can perform next steps including
      // more calibration uploads or calling python scripts to
      // calibrate the images
      // We will have to be very specific where we upload the images in
      // terms of naming conventions so we can grab them + calibrate later
      setCurrentStep("nextComponent");
    }
  };

  return (
    <div>
      {currentStep === "red" && (
        <UploadRaw
          color={"RED"}
          tailwindColor={"text-red-500"}
          onNext={handleContinue}
        />
      )}
      {currentStep === "green" && (
        <UploadRaw
          color={"GREEN"}
          tailwindColor={"text-green-500"}
          onNext={handleContinue}
        />
      )}
      {currentStep === "blue" && (
        <UploadRaw
          color={"BLUE"}
          tailwindColor={"text-blue-500"}
          onNext={handleContinue}
        />
      )}
      {currentStep === "nextComponent" && <div>THANK YOU!</div>}
    </div>
  );
}
