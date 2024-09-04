import '../Styles/Style.css';


import React, { useEffect, useRef, useState } from 'react';


function Projects() {
  const textRef = useRef(null);
  const sectionRef = useRef(null);


  const [sticky, setSticky] = useState(false);
  const [atCenter, setAtCenter] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const top = sectionRef.current.getBoundingClientRect().top;
      const bottom = sectionRef.current.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;


      if (top <= viewportHeight && bottom >= viewportHeight ) {
        setSticky(true);
        setAtCenter(true);
      } else {
        setSticky(false);
        setAtCenter(false);
      }
    };


    window.addEventListener('scroll', handleScroll);


    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <section id="ProjectSection" ref={sectionRef}>
      <div className={`sticky-text ${sticky ? 'sticky' : ''} ${atCenter ? 'center' : ''}`} ref={textRef}>
          <h1>WEBSITES AND APPS</h1>
          <p>Websites and apps designed and/or developed by me.</p>
      </div>
      <div className="Projects">
        <div>
          <p>Scrollable content goes here...</p>
          <p>More content...</p>
          <p>Even more content...</p>
        </div>
        <div>
          <p>Scrollable content goes here...</p>
          <p>More content...</p>
          <p>Even more content...</p>
        </div>
        <div>
          <p>Scrollable content goes here...</p>
          <p>More content...</p>
          <p>Even more content...</p>
        </div>
      </div>
    </section>
  );
}


export default Projects;