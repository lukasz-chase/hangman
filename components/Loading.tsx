import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-screen flexCenter">
      <progress className="progress progress-accent w-56"></progress>
    </div>
  );
};

export default Loading;