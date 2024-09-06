import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from 'react';

import '../Styles/Style.css';
import Carousel from './Carousel';

function Projects() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.98, 1],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.02, 0.98, 1],
    ["90%", "100%", "100%", "90%"]
  );

  const Title = () => {
    const duration = 0.01;

    const displace_Top = useTransform(
      scrollYProgress,
      [(1 / 3) - duration, (1 / 3) + duration],
      ["0%", "-100%"]
    );
    const displace_Middle = useTransform(
      scrollYProgress,
      [(1 / 3) - duration, (1 / 3) + duration, (2 / 3) - duration, (2 / 3) + duration],
      ["100%", "0%", "0%", "-100%"]
    );
    const displace_Bottom = useTransform(
      scrollYProgress,
      [(2 / 3) - duration, (2 / 3) + duration],
      ["100%", "0%"]
    );

    const opacity_Top = useTransform(
      scrollYProgress,
      [(1 / 3) - duration, (1 / 3) + duration],
      ["100%", "0%"]
    );
    const opacity_Middle = useTransform(
      scrollYProgress,
      [(1 / 3) + duration, (1 / 3) + (duration * 2) , (2 / 3) - duration, (2 / 3) + duration],
      ["0%", "100%", "100%", "0%"]
    );
    const opacity_Bottom = useTransform(
      scrollYProgress,
      [(2 / 3) + duration, (2 / 3) + (duration * 2)],
      ["0%", "100%"]
    );

    return (
      <>
        <h3>PROJECTS</h3>
        <motion.h1 className="projectTitle">
          <div>
            <motion.span style={{ y: displace_Top }}>DESIGN WORK</motion.span>
          </div>
          <div className="hiddenTitle">
            <motion.span style={{ y: displace_Middle }}>HCI RESEARCH</motion.span>
          </div>
          <div className="hiddenTitle">
            <motion.span style={{ y: displace_Bottom }}>OTHER PROJECTS</motion.span>
          </div>
        </motion.h1>
        <motion.p className="projectTitle">
          <div>
            <motion.span style={{ opacity: opacity_Top }}>Work designed and/or developed by me</motion.span>
          </div>
          <div className="hiddenTitle">
            <motion.span style={{ opacity: opacity_Middle }}>My HCI Research Papers and Theses</motion.span>
          </div>
          <div className="hiddenTitle">
            <motion.span style={{ opacity: opacity_Bottom }}>Hobby and Practice Projects</motion.span>
          </div>
        </motion.p>
      </>

    )
  }

  return (
    <section id="ProjectSection" ref={sectionRef}>
      <motion.div className='titleContainer' style={{ opacity, scale }}>
        <motion.div>
          <Title />
        </motion.div>
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