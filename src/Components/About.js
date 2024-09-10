import '../Styles/Style.css';
import React from 'react';

import ContactButtons from './ContactButtons.js';

import btnIcon from '../Assets/btn-icon.svg';

const About = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} id="AboutSec">
      <h2>ABOUT ME</h2>
      <h2>The Short</h2>
      <div>
        <div>
          <p>JAPANESE/INDONESIAN</p>
          <p>BORN IN JAPAN</p>
          <p>PRE-SCHOOL IN AFRICA</p>
          <p>IGCSE & IB IN THE PHILIPPINES</p>
          <p>B-DES & MC-IT IN AUSTRALIA</p>
          <p>???</p>
        </div>
        <div>
          <button>
            <img src={btnIcon} alt=""/>
            <h5>ABOUT ME</h5>
          </button>
          <ContactButtons />
        </div>
      </div>

      <h2>The (Not Really) Long</h2>
      <p>
        Hi! Thanks for taking the time to get to know me :) I am a half Japanese half Indonesian front end designer and developer. 
        Though my skill set favors programming and development, I treat it as a medium to express my passion: the human experience. 
        I tend to overthink, and I think that's one of my greatest qualities. It allows me to dial in and polish design elements that 
        are overlooked but necessary to a good user experience. Two caveats: time management and communication is crucial. The good 
        news? I’ve had years (my whole life) to train both--and not to brag--I’m pretty good at it.
      </p>
    </section>
  );
});

export default About;