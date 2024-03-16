import React, { type ReactNode, useEffect, useState } from "react";
import FadeIn, { FadeInProps } from "./FadeIn";
import { useInView } from "react-intersection-observer";

interface FadeOnViewProps {
  children: ReactNode;
  fadeProps?: Partial<FadeInProps>;
}

const FadeOnView: React.FC<FadeOnViewProps> = ({
  children,
  fadeProps = {},
}) => {
  const [show, setShow] = useState<boolean>();
  const { inView, ref } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) setShow(true);
  }, [inView]);

  return (
    <div ref={ref}>
      {show ? (
        <FadeIn show appear timeout={200} {...fadeProps}>
          {children}
        </FadeIn>
      ) : (
        <div className="opacity-0">{children}</div>
      )}
    </div>
  );
};

export default FadeOnView;
