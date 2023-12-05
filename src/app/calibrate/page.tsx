"use client";
import React, { useState, useMemo } from "react";
import UploadRaw from "../components/uploadRaw";
import { v4 } from "uuid";
import Image from "next/image";

export default function Calibrate() {
  const [currentStep, setCurrentStep] = useState("red");
  const [outputPath, setOutputPath] = useState("");
  const uniqueID = useMemo(() => v4(), []);

  const handleContinue = async () => {
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
    } else if (currentStep === "blueFlat") {
      // All files have been uploaded
      try {
        const data = await handleCalibration();
        setOutputPath(data);
        setCurrentStep("displayImage");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCalibration = async () => {
    try {
      const response = await fetch(`/api/combine/${uniqueID}`);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
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

      {currentStep === "calibrate" && (
        <div>Hold tight. Your image is being calibrated.</div>
      )}

      {currentStep === "displayImage" && (
        <div>
          <Image
            src={outputPath}
            width={500}
            height={500}
            alt="Picture of the rendered image"
          />
        </div>
      )}
    </div>
  );
}
