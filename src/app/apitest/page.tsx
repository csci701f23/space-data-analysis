"use client";
import React, { useEffect, useState } from "react";

export default function ApiTest() {
  const [message, setMessage] = useState("Loading");

  useEffect(() => {
    fetch("/api/ping")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data);
      });
  }, []);

  return <div>{message}</div>;
}
