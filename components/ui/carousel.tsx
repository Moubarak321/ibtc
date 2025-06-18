// components/CarouselBackground.jsx
import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/images/c10.png",
  "/images/c11.png",
  "/images/c3.png",
  "/images/c12.png",
//  
];

export default function CarouselBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {images.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === i ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={src}
            alt={`Slide ${i + 1}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      ))}
    </div>
  );
}
