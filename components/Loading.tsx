import React from "react";

const Loading = () => {
  return (
    <div className="h-full w-[99vw] flexCenter">
      <progress className="progress progress-accent w-56"></progress>
    </div>
  );
};

export default Loading;
