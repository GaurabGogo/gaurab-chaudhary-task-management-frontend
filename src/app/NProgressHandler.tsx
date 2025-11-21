"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const NProgressHandler = () => {
  return (
    <ProgressBar
      height="4px"
      color="#3b82f6"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default NProgressHandler;
