import { LucideIcon } from "lucide-react";
import React from "react";

export interface Plug {
  text: string;
  link: string;
  iconSrc?: string;
  Icon?: LucideIcon;
}

const PlugButton: React.FC<Plug> = ({ text, link, iconSrc, Icon }) => {
  return (
    <a target="_blank" href={link} rel="noreferrer">
      <div className="flex cursor-pointer items-center rounded-full bg-white/50 transition-all hover:bg-white/70">
        {iconSrc ? (
          <img src={iconSrc} className="h-12 w-12 rounded-full bg-white" />
        ) : (
          <div className="grid h-12 w-12 place-items-center rounded-full bg-white">
            <Icon className="h-8 w-8" />
          </div>
        )}
        <p className="pl-4 pr-6">{text}</p>
      </div>
    </a>
  );
};

export default PlugButton;
