import React from "react";

const Loading = () => {
  return (
    <div className="h-[100dvh] w-screen flexCenter">
      <progress className="progress progress-accent w-56"></progress>
    </div>
  );
};

export default Loading;
