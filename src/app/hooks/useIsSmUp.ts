import { useEffect, useState } from "react";

const SM_MQ = "(min-width: 640px)";

/** Tailwind `sm` breakpoint — desktop split layout vs mobile full-screen chat */
export function useIsSmUp(): boolean {
  const [isSmUp, setIsSmUp] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(SM_MQ).matches : true
  );

  useEffect(() => {
    const mq = window.matchMedia(SM_MQ);
    const onChange = () => setIsSmUp(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isSmUp;
}
