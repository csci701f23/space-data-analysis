"use client";
import React, { useState, useMemo } from "react";
import UploadRaw from "../components/uploadRaw";
import { v4 } from "uuid";

export default function Calibrate() {
  const [currentStep, setCurrentStep] = useState("red");
  const uniqueID = useMemo(() => v4(), []);

  const handleContinue = () => {
    if (currentStep === "red") {
      setCurrentStep("green");
    } else if (currentStep === "green") {
      setCurrentStep("blue");
    } else if (currentStep === "blue") {
      setCurrentStep("bias");
    } else if (currentStep === "bias") {
      setCurrentStep("dark");
    } else if (currentStep === "dark") {
      setCurrentStep("redFlat");
    } else if (currentStep === "redFlat") {
      setCurrentStep("greenFlat");
    } else if (currentStep === "greenFlat") {
      setCurrentStep("blueFlat");
    } else {
      setCurrentStep("calibrate");
      handleCalibration().then((data) => {
        console.log(data);
      });
    }
  };

  const handleCalibration = async () => {
    try {
      const response = await fetch(`/api/combine/${uniqueID}`);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return response.json;
    } catch (err) {
      console.error(err);
      throw new Error("Something went wrong");
    }
  };

  return (
    <div>
      {currentStep === "red" && (
        <UploadRaw
          imageType={"RED FILTER"}
          tailwindColor={"text-red-500"}
          onNext={handleContinue}
          uniqueID={uniqueID}
          imageFolder={"raw_science"}
        />
      )}
      {currentStep === "green" && (
        <UploadRaw
          imageType={"GREEN FILTER"}
          tailwindColor={"text-green-500"}
          onNext={handleContinue}
          uniqueID={uniqueID}
          imageFolder={"raw_science"}
        />
      )}
      {currentStep === "blue" && (
        <UploadRaw
          imageType={"BLUE FILTER"}
          tailwindColor={"text-blue-500"}
          onNext={handleContinue}
          uniqueID={uniqueID}
          imageFolder={"raw_science"}
        />
      )}
      {currentStep === "bias" && (
        <UploadRaw
          imageType={"BIAS"}
          tailwindColor={"text-white"}
          onNext={handleContinue}
          uniqueID={uniqueID}
          imageFolder={"combined"}
        />
      )}
      {currentStep === "dark" && (
        <UploadRaw
          imageType={"DARK"}
          tailwindColor={"text-white"}
          onNext={handleContinue}
          uniqueID={uniqueID}
          imageFolder={"combined"}
        />
      )}
      {currentStep === "redFlat" && (
        <UploadRaw
          imageType={"RED FLAT"}
          tailwindColor={"text-red-500"}
          onNext={handleContinue}
          uniqueID={uniqueID}
          imageFolder={"combined"}
        />
      )}

      {currentStep === "greenFlat" && (
        <UploadRaw
          imageType={"GREEN FLAT"}
          tailwindColor={"text-green-500"}
          onNext={handleContinue}
          uniqueID={uniqueID}
          imageFolder={"combined"}
        />
      )}

      {currentStep === "blueFlat" && (
        <UploadRaw
          imageType={"BLUE FLAT"}
          tailwindColor={"text-blue-500"}
          onNext={handleContinue}
          uniqueID={uniqueID}
          imageFolder={"combined"}
        />
      )}

      {currentStep === "calibrate" && <div>THANK YOU!</div>}
    </div>
  );
}
