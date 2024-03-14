import React, { useCallback, useEffect, useState } from "react";
import ThreeAnimation from "../animations/canvas-animation";
import Cube from "../animations/cube";
import { useThreeAnimation } from "../util";
import Ocean from "../animations/ocean";

interface ContactProps {}

const Contact: React.FC<ContactProps> = ({}) => {
  const handleCanvasMounted = useThreeAnimation(Ocean);

  return (
    <div className="relative w-full h-[3000px]">
      <canvas ref={handleCanvasMounted} className="fixed h-svh w-full -z-50" />
      <div className="flex flex-col items-center p-12">
        <p className="pt-24 text-6xl text-center text-white/50">Ben Barber</p>
        <p className="pt-3 text-2xl text-center text-white/30">{
          ["Cloud", "Backend", "Frontend", "ML"].join(" · ")
        }</p>
        <div className="h-svh" />
        <p className="pt-24 text-6xl text-center text-white/50">Bottom Text</p>
      </div>
    </div>
  );
};

export default Contact;