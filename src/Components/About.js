import '../Styles/Style.css';
import React from 'react';

const About = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} id="AboutSec">
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <h4>Header 4</h4>
      <h5>Subheader 1</h5>
      <h6>Subheader 2</h6>

      <p className="lg">Body Large</p>
      <p>Body Regular</p>
      <p className="sm">Body Small</p>
      <p className="caption">Caption</p>
    </section>
  );
});

export default About;