import React from 'react';

import '../Styles/Style.css';
import ContactButtons from './ContactButtons.js';

import btnIcon from '../Assets/btn-icon.svg';

const shortStoryTxt = [
  "A JAPANESE/INDONESIAN",
  "BORN IN JAPAN",
  "PRE-SCHOOL IN AFRICA",
  "IGCSE & IB IN THE PHILIPPINES",
  "B-DES & MC-IT IN AUSTRALIA",
  "???"
]

const About = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} id="AboutSec">
      <h2 className='aboutHeading'>ABOUT ME</h2>
      <div>
        <h2>The Short</h2>
        <div className='shortStory'>
          {shortStoryTxt.map((item, index) => (
            <React.Fragment key={`item-${index}`}>
              {item.split(' ').map((word, wordIndex) => (
                <h3 key={`word-${index}-${wordIndex}`}>{word}</h3>
              ))}
              <img src={btnIcon} alt="" key={`img-${index}`} />
            </React.Fragment>
          ))}
        </div>

        <div>
          <button onClick={() => window.open(`${process.env.PUBLIC_URL}/Resume.pdf`, "_blank")}>
            <img src={btnIcon} alt="" />
            <h5>MY RESUME</h5>
          </button>
          <ContactButtons />
        </div>
      </div>

      <div>
        <h2>The (Not Really) Long</h2>
        <p>
          Hi! Thanks for taking the time to get to know me :) I am a half Japanese half Indonesian front end designer and developer.
          Though my skill set favors programming and development, I treat it as a medium to express my passion: the human experience.
          I tend to overthink, and I think that's one of my greatest qualities. It allows me to dial in and polish design elements that
          are overlooked but necessary to a good user experience. Two caveats with over-thinking: time management and communication is crucial. The good
          news? I’ve had years (my whole life) to train both--and not to brag--I’m pretty good at it.
        </p>
      </div>

    </section>
  );
});

export default About;