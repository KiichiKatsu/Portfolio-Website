import GitHubIcon from '../Assets/GitHub.svg';
import LinkedInIcon from '../Assets/LinkedIn.svg';
import EmailIcon from '../Assets/Mail.svg';

import '../Styles/Style.css';

function ContactButtons() {
    const emailAddress = "Kiichiro.Tatsuzawa@gmail.com";
    
    const handleClick = () => {
        navigator.clipboard.writeText(emailAddress)
          .then(() => { alert('Email copied to clipboard!'); })
          .catch(err => { console.error('An Error Occured'); });
    };

    return (
        <div className="contacts">
            <a href="https://github.com/KiichiKatsu" target="_blank">
                <img src={GitHubIcon} className="ContactImg" alt="My GitHub"/>
            </a>
            <a href="https://www.linkedin.com/in/kiichiro-tatsuzawa-11511b296" target="_blank">
                <img src={LinkedInIcon} className="ContactImg" alt="My LinkedIn"/>
            </a>
            <img src={EmailIcon} className="ContactImg" onClick={handleClick} alt="My Email"/>
        </div>
    );
}

export default ContactButtons;