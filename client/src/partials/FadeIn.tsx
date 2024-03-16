import React, { HTMLProps, useRef } from "react";
import { Transition } from "react-transition-group";
import "./fade-in.css";

export type FadeInProps = {
  children: React.ReactNode;
  show?: boolean;
  appear?: boolean;
  timeout?: number;
  delay?: number;
  direction?: string;
  className?: string;
} & HTMLProps<HTMLDivElement>;

const FadeIn: React.FC<FadeInProps> = ({
  children,
  show,
  appear,
  timeout,
  delay,
  direction,
  className,
  ...rest
}) => {
  const nodeRef = useRef<HTMLDivElement>();

  if (!timeout) timeout = 300;
  let fade: string;

  switch (direction) {
    case "up":
      fade = "translateY(";
      break;
    case "down":
      fade = "translateY(-";
      break;
    case "left":
      fade = "translateX(-";
      break;
    case "right":
      fade = "translateX(";
      break;
    default:
      undefined;
  }

  const defaultStyle = {
    opacity: 1,
    transform: "translateY(0)",
    transition: `all ${timeout}ms ease-out`,
  };

  const transitionStyles: {
    [key: string]: any;
  } = {
    entering: { opacity: 0, transform: fade ? `${fade}30%)` : "translateY(0" },
    entered: { opacity: 1, transform: "translateY(0)" },
    exiting: { opacity: 1, display: "none" },
    exited: { opacity: 0, display: "none" },
  };

  const timeouts = {
    appear: timeout,
    enter: timeout,
    exit: 0,
  };

  return (
    <Transition in={show} appear={appear} nodeRef={nodeRef} timeout={timeouts}>
      {(state) => (
        <div
          ref={nodeRef}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
            transitionDelay: `${delay}ms`,
          }}
          className={className}
          {...rest}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};

export default FadeIn;
