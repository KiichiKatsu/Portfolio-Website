import arrowDown from './Assets/ArrowDown.svg';

import './Styles/Style.css';
import React, {useRef} from 'react';

import Projects from './Components/Projects.js';
import TopNav from './Components/TopNav.js';
import ContactButtons from './Components/ContactButtons.js';
import About from './Components/About.js';

function App() {
  const aboutRef = useRef(null);

  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      <TopNav onClick={scrollToAbout}/>
      
      <div id="LandingSection">
        <div>
          <h1>HELLO. I'M</h1>
          <h1 className="outline">KIICHIRO <br /> TATSUZAWA </h1>
        </div>
        
        <p>A HCI Researcher Passionate for UI & UX Design and Front-End Development</p>
        
        <ContactButtons />

        <section className="quote">
          <h3>“Society grows great when the old plant trees in whose shade they shall never sit”</h3>
          <p>I believe that the best user experiences are hidden in the subtleties that only the designers and developers know exists, yet selflessly never get to truly enjoy themselves.</p>
        </section>
      </div>

      <div className="scrollIndicator">
        <img src={arrowDown} alt=""/>
        <h4>FEATURED PROJECTS</h4>
        <img src={arrowDown} alt=""/>
      </div>

      <Projects />

      <About ref={aboutRef}/>
    </div>
  );
}

export default App;
