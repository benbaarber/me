import React, { useRef } from "react";
import { slowScrollTo, useAnimation } from "../util";
import Ocean from "../animations/ocean";
import { ChevronDown } from "lucide-react";
import Tesseract from "../animations/tesseract";

const Main: React.FC = () => {
  const oceanRef = useAnimation(Ocean);
  const tesseractRef = useAnimation(Tesseract);
  const scrollToRef = useRef<HTMLDivElement>();

  return (
    <div className="relative w-full">
      <canvas ref={oceanRef} className="fixed -z-50 h-screen w-full" />
      <div className="flex flex-col items-center">
        <p className="pt-20 text-center text-6xl text-white/50">Ben Barber</p>
        <p className="pb-3 pt-3 text-center text-2xl text-white/30">
          {["Backend", "Frontend", "Ops", "ML"].join(" · ")}
        </p>
        <ChevronDown
          className="h-12 w-12 cursor-pointer text-white/50 transition-all hover:text-white"
          onClick={() => slowScrollTo(scrollToRef.current)}
        />
        <div className="h-screen" />
        <div
          ref={scrollToRef}
          className="w-full px-4 lg:flex lg:items-center lg:pl-24"
        >
          <div className="lg:min-w-1/3 lg:w-1/3 lg:shrink-0 lg:grow-0">
            <p className="text-5xl text-white/50">About Me</p>
            <p className="pt-12 text-white/50">
              As a self-taught software engineer with a boundless passion for
              innovation, it is my mission to make long-lasting contributions to
              the world of tech. My journey has led me to gain expertise in
              backend and frontend development, DevOps, and machine learning,
              equipping me with a comprehensive skill set that allows me to
              tackle complex challenges from multiple angles. My ability to
              learn rapidly and adapt to new problems fuels my ambition to
              create innovative, sustainable, and impactful solutions. Driven by
              my belief in the power of technology to accelerate human
              discovery, I am committed to building systems that not only solve
              today&apos;s problems but also stand the test of time, leaving a
              lasting mark on the technological landscape.
            </p>
          </div>
          <div className="aspect-square max-h-screen w-full lg:shrink lg:grow lg:p-8">
            <div className="h-full w-full">
              <canvas ref={tesseractRef} className="-z-30 cursor-move" />
            </div>
          </div>
        </div>
        <div className="h-[50vh]" />
      </div>
    </div>
  );
};

export default Main;
