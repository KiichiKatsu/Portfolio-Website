import logo from '../Assets/logo.svg';
import btnIcon from '../Assets/btn-icon.svg';

import '../Styles/Style.css';

import { useState, useRef } from 'react';
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

function TopNav({onClick}) {
  const [isHidden, setHidden] = useState(false);
  const {scrollY} = useScroll();
  const prevYRef = useRef(0);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const Ydiff = y - prevYRef.current;
    if (Math.abs(Ydiff) > 50) {
      setHidden(Ydiff > 0);
      prevYRef.current = y;
    }
  })

  return (
    <>
      <motion.div id="TopNav" 
        animate = {isHidden ? "hidden" : "visible"}
        variants={{
          hidden: { y: "-100%"},
          visible: { y:"-20%" }
        }}
      >
        <nav className="Subtitle2">
          <img src={logo} alt="Logo" />
          <div className="MenuContainer">
            <div className="Availability">
              <img className="StatusIndicator" alt=""/>
              <h5>AVAILABLE</h5>
            </div>
            <button onClick={onClick}>
              <img src={btnIcon} alt=""/>
              <h5>ABOUT ME</h5>
            </button>
          </div>
        </nav>
      </motion.div>
    </>
  );
}

export default TopNav;