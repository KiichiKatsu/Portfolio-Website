import '../Styles/Style.css';
import Carousel from './Carousel';

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from 'react';

function Projects() {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const { scrollY } = useScroll();

  function toPx (val) { return val * viewportHeight / 100; }

  const opacity = useTransform(
    scrollY,
    [toPx(50), toPx(90), toPx(480), toPx(520)],
    [0, 1, 1, 0] 
  );

  const scale = useTransform(
    scrollY,
    [toPx(50), toPx(90), toPx(480), toPx(520)],
    ["95%", "100%", "100%", "95%"] 
  );

  return (
    <section id="ProjectSection">
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