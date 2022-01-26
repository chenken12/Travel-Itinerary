import React, { useState, useEffect, useRef} from "react";
// import "../styles/slideshow.css"
import { Slide } from 'react-slideshow-image';

const Slideshow = (props) => {
  const colors = ["#0088FE", "#00C49F", "#FFBB28"];
  const images = [
    { url: "./picture1.jpeg" },
    { url: "./picture2.jpeg" },
    { url: "./picture3.jpeg" }
  ];
  const delay = 5000;

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = function() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  
  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((backgroundColor, index) => (
          <div
            className="slide"
            key={index}
            style={{ backgroundColor }}
          ></div>
        ))}
      </div>

      <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
