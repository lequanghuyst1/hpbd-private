"use client";

import Lottie from "lottie-react";
import React, { useMemo } from "react";

type FireAnimationProps = {
  animationData: any;
};

function FireAnimation({ animationData }: FireAnimationProps) {
  // Memoize animation data để tránh re-render không cần thiết
  const memoizedData = useMemo(() => animationData, [animationData]);

  if (!memoizedData) return null;

  return (
    <div className="absolute -top-4 lg:-top-5 left-1/2 -translate-x-1/2 w-8 h-8 md:w-12 md:h-12 pointer-events-none">
      <Lottie
        animationData={memoizedData}
        loop={true}
        autoplay={true}
        renderer="svg"
        rendererSettings={{
          preserveAspectRatio: "xMidYMid meet",
          progressiveLoad: false,
        }}
        style={{
          width: "100%",
          height: "100%",
          willChange: "transform",
        }}
      />
    </div>
  );
}

export default React.memo(FireAnimation);
