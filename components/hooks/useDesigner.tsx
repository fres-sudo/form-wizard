"use client";

import React, { useContext } from "react";
import { DesignerContext } from "../context/DesignerContext";

export default function useDesigner() {
  const context = useContext(DesignerContext);
  if (!context) {
    throw new Error("useDesigner has no context");
  }
  return context;
}
