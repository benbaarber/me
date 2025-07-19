import React, { useRef } from "react";
import { slowScrollTo, useAnimation } from "../util";
import Ocean from "../animations/ocean";
import { ChevronDown } from "lucide-react";
import Tesseract from "../animations/tesseract";
import PlugButton, { Plug } from "../components/Plug";

const plugs: Plug[] = [
  {
    text: "GitHub",
    link: "https://github.com/benbaarber",
    iconSrc: "static/github.png",
  },
  {
    text: "LinkedIn",
    link: "https://www.linkedin.com/in/benbarber121/",
    iconSrc: "static/linkedin.jpg",
  },
  {
    text: "Email",
    link: "mailto:benbarber121@gmail.com",
    iconSrc: "static/gmail.jpg",
  },
  // {
  //   text: "View Resume",
  //   link: "static/resume.pdf",
  //   Icon: Eye,
  // },
];

const Main: React.FC = () => {
  const oceanRef = useAnimation(Ocean);
  const tesseractRef = useAnimation(Tesseract);
  const scrollToRef = useRef<HTMLDivElement>();

  return (
    <div className="relative w-full overflow-x-hidden">
      <canvas ref={oceanRef} className="fixed -z-50 h-screen w-full" />
      <div className="flex flex-col items-center">
        <p className="pt-20 text-center text-6xl text-white/50">Ben Barber</p>
        <p className="pb-3 pt-3 text-center text-2xl text-white/30">Software Engineer</p>
        <ChevronDown
          className="h-12 w-12 cursor-pointer text-white/50 transition-all hover:text-white"
          onClick={() => slowScrollTo(scrollToRef.current)}
        />
        <div className="h-screen" />
        <div
          ref={scrollToRef}
          className="aspect-square max-h-[50vh] w-full lg:max-h-[75vh] lg:shrink lg:grow lg:p-8"
        >
          <div className="h-full w-full">
            <canvas ref={tesseractRef} className="-z-30 cursor-move" />
          </div>
          <p className="w-full text-center text-xs text-white/20">
            Click and drag to rotate
          </p>
        </div>
        <div className="h-[300px]" />
        <p className="text-center text-6xl text-white/50">Contact</p>
        <div className="flex flex-wrap items-center justify-center gap-3 py-6 lg:gap-6">
          {plugs.map((plug) => (
            <PlugButton {...plug} key={plug.text} />
          ))}
        </div>
        <div className="h-[60vh] w-full" />
        <div className="w-full px-6 pb-3 text-white/50 lg:flex lg:justify-between">
          <p className="pb-3 text-center">Copyright 2024 Ben Barber</p>
          <p className="text-center">
            Like the visuals? See my code{" "}
            <a
              href="https://github.com/benbaarber/me"
              target="_blank"
              className="font-bold text-blue-400/50 hover:text-blue-400/80"
              rel="noreferrer"
            >
              here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
