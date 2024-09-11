import '../Styles/Style.css';
import React, {useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";

import btnIcon from '../Assets/btn-icon.svg';

const faq = [
  {
    question: "Education?",
    answer: "International Baccalaureate (IB) Diploma from British School Manila\nB-DES in UI/UX and McIT in Human Computer Interaction at The University of Melbourne"
  },
  {
    question: "Programming Languages?",
    answer: "Familiar Languages\nTailwind, React, Framer Motion\n\nProficient Languages\nHTML, CSS, JS, Java, C#, SQL"
  },
  {
    question: "Awards and Certification?",
    answer: "FEIT Endeavour Award (2024)\nMETA Front-End Development Course (2024)\nRIOT Training (2023)"
  }
]

function FAQ() {
  const [expanded, setExpanded] = useState(null);

  const handleClick = (index) => {
    expanded === index ? setExpanded(null) : setExpanded(index);
  }

  return (
    <section id="FAQSec">
      <h2>QUICK INFORMATION</h2>
      {faq.map((data, index) => (
        <div 
          className="QAcontainer" 
          style={{
            backgroundColor: `${index === expanded ? "#FAFAFA" : "#1A1A1A"}`,
            transition: "background-color 0.5s ease"
          }}
        >
          <div className="question" onClick={() => handleClick(index)}>
            <motion.img 
              style={{ originX: 0.5, originY: 0.5 }}
              animate={{ rotate: index === expanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              src={btnIcon} 
              alt=""
            />
            <h3 
              className='blackText'
              style={{
                color: `${index === expanded ? "#1A1A1A" : "#FAFAFA"}`
              }}
            >{data.question}</h3>
          </div>
          <AnimatePresence initial={false}>
            {index === expanded && (
              <motion.div 
                initial={{opacity: 0, height: 0}}
                animate={{opacity: 1, height: "auto"}}
                exit={{opacity: 0, height: 0}}
                className="answer"
              >
                <p className='blackText'>
                  {data.answer.split('\n').map((subString) => (
                    <span>
                      {subString && `${subString}`}
                      <br />
                    </span>
                  ))}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </section>
  );
};

export default FAQ;