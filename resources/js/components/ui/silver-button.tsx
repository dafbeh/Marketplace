import { useEffect, useRef } from "react";

const SilverButton = ({ text, header }: any) => {
  return (
    <div className="w-full max-w-md mx-auto py-4 px-1">
      <SpotlightButton header={header} text={text} />
    </div>
  );
};

const SpotlightButton = ({ text, header }: any) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!btnRef.current || !spanRef.current) return;

      const rect = btnRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      spanRef.current.style.left = `${offsetX}px`;
      spanRef.current.style.top = `${offsetY}px`;
      spanRef.current.style.opacity = "1";
    };


    const handleMouseLeave = () => {
      if (!spanRef.current) return;

      spanRef.current.style.opacity = "0";
    };

    const button = btnRef.current;
    if (button) {
      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (button) {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center border-2 w-full h-20 rounded-lg text-lg font-medium dark:text-white text-black 
        overflow-hidden hover:shadow-xl hover:scale-105 transition-transform active:scale-95">
      <p className="text-sm items-center mt-3">{header}</p>
      <button
        ref={btnRef}
        className="w-full h-full -mt-4"
      >
        {text}
        <span
          ref={spanRef}
          className="pointer-events-none absolute w-70 h-70 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 rounded-full"
          style={{
              background: `radial-gradient(
                circle,
                rgba(255,255,255,0.35) 0%,
                rgba(192,192,192,0.25) 20%,
                rgba(192,192,192,0.15) 40%,
                rgba(192,192,192,0.05) 70%,
                rgba(192,192,192,0) 100%
              )`,          
              filter: "blur(12px)",
          }}
        />
      </button>
    </div>
  );
};

export default SilverButton;
