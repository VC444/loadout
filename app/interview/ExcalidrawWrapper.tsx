"use client";
import { Excalidraw } from "@excalidraw/excalidraw";

import "@excalidraw/excalidraw/index.css";
import { ExcalidrawProps } from "@excalidraw/excalidraw/types";

const ExcalidrawWrapper = (props: ExcalidrawProps) => {
  return <Excalidraw {...props} />;
};

export default ExcalidrawWrapper;
