import React, { useRef } from "react";
import { slowScrollTo, useAnimation } from "../util";
import Ocean from "../animations/ocean";
import { ChevronDown } from "lucide-react";
import FadeIn from "../partials/FadeIn";

const Main: React.FC = () => {
  const oceanRef = useAnimation(Ocean);
  const scrollToRef = useRef<HTMLDivElement>();

  return (
    <div className="relative h-[3000px] w-full">
      <canvas ref={oceanRef} className="fixed -z-50 h-svh w-full" />
      <div className="flex flex-col items-center">
        <FadeIn show appear timeout={200}>
          <p className="pt-20 text-center text-6xl text-white/50">Ben Barber</p>
        </FadeIn>
        <FadeIn show appear timeout={1000}>
          <p className="pb-3 pt-3 text-center text-2xl text-white/30">
            {["Backend", "Frontend", "Ops", "ML"].join(" · ")}
          </p>
        </FadeIn>
        <FadeIn show appear timeout={1200}>
          <ChevronDown
            className="h-12 w-12 cursor-pointer text-white/50 transition-all hover:text-white"
            onClick={() => slowScrollTo(scrollToRef.current)}
          />
        </FadeIn>
        <div className="h-svh" />
        <div
          ref={scrollToRef}
          className="w-full md:w-3/4 md:items-center md:justify-between lg:flex"
        >
          <div className="md:w-1/3">
            <p className="pt-24 text-5xl text-white/50">About Me</p>
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
          <div className="md:w-1/3">
            <canvas className="-z-40 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
