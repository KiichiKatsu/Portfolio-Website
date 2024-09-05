import '../Styles/Style.css';
import Carousel from './Carousel';

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from 'react';

function Projects() {
  const [sectionHeight, setHeight] = useState(0);
  const [YPos, setYPos] = useState(0);

  const sectionRef = useRef(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleResize = () => {
      if (sectionRef.current) {
        const element = sectionRef.current.getBoundingClientRect();
        setHeight(element.height); 
        setYPos(element.top);
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => { handleResize(); });
    const currentRef = sectionRef.current;

    if (currentRef) { resizeObserver.observe(currentRef); }

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }
    };
  }, []); 

  const start_EaseIn = YPos - window.innerHeight * 0.75;
  const end_EaseIn = YPos;
  const start_EaseOut = YPos + sectionHeight - window.innerHeight * 0.75;
  const end_EaseOut = YPos + sectionHeight;

  const opacity = useTransform(
    scrollY,
    [start_EaseIn, end_EaseIn, start_EaseOut, end_EaseOut],
    [0, 1, 1, 0] 
  );

  const scale = useTransform(
    scrollY,
    [start_EaseIn, end_EaseIn, start_EaseOut, end_EaseOut],
    ["95%", "100%", "100%", "95%"] 
  );

  return (
    <section id="ProjectSection" ref={sectionRef}>
      <motion.div className={'sticky-text'} style={{opacity, scale}}>
          <h1>WEBSITES AND APPS</h1>
          <p>Websites and apps designed and/or developed by me.</p>
      </motion.div>
      <div className="Projects">
        <Carousel />
        <Carousel />
        <Carousel />
      </div>
    </section>
  );
}

export default Projects;