import arrowDown from './Assets/ArrowDown.svg';

import './Styles/Style.css';
import React, {useRef, useEffect} from 'react';
import {motion, useAnimate, stagger} from 'framer-motion'

import Projects from './Components/Projects.js';
import TopNav from './Components/TopNav.js';
import ContactButtons from './Components/ContactButtons.js';
import About from './Components/About.js';

function App() {
  const aboutRef = useRef(null);
  const [scope, animate] = useAnimate();

  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect (() => {
    const sequence = [
      [".first span",  { opacity: [0, 1] }, { delay: stagger(0.1) }],
      [".second",  { opacity: [0, 1] }, {duration: 0.75}],
      [".third",  { opacity: [0, 1] }, {duration: 1}],
      [".fourth span",  { opacity: [0, 1] }, { delay: stagger(0.03) }],
      [".contacts",  { opacity: [0, 1] }, {duration: 1}],
      [".quote h3",  { opacity: [0, 1] }, {duration: 1}],
      [".quote p",  { opacity: [0, 1] }, {duration: 1}],
    ]
    
    animate(sequence);
  }, [animate, scope])

  return (
    <div className="App">
      <TopNav onClick={scrollToAbout}/>
      
      <div 
        id="LandingSection"
        ref={scope}
      >
        <div>
          <h1 className="first">
            {"HELLO. I'M".split("").map((char) => (
              <span>{char}</span>
            ))}
          </h1>
          <motion.h1 initial={{opacity: 0}} className="outline second">KIICHIRO</motion.h1>
          <motion.h1 initial={{opacity: 0}} className="outline third">TATSUZAWA</motion.h1>
        </div>
        
        <p className="fourth">
          {"A HCI Researcher Passionate for UI & UX Design and Front-End Development".split("").map((char) => (
            <span>{char}</span>
          ))}
        </p>
        
        <ContactButtons />

        <section className="quote">
          <motion.h3 initial={{opacity: 0}}>“Society grows great when the old plant trees in whose shade they shall never sit”</motion.h3>
          <motion.p initial={{opacity: 0}}>I believe that the best user experiences are hidden in the subtleties that only the designers and developers know exists, yet selflessly never get to truly enjoy themselves.</motion.p>
        </section>
      </div>

      <div className="scrollIndicator">
        <img src={arrowDown} alt=""/>
        <h4>CHECKOUT SOME OF MY PROJECTS</h4>
        <img src={arrowDown} alt=""/>
      </div>

      <Projects />

      <About ref={aboutRef}/>
    </div>
  );
}

export default App;
