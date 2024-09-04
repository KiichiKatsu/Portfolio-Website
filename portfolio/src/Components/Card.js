import '../Styles/Style.css';

import GitHubIcon from '../Assets/GitHub.svg';

function Card() {
    return (
        <div className="Card">
            <div className="cardDisplay">
                <img src={GitHubIcon}  alt="My GitHub"/>
            </div>
            <h3>Title</h3>
            <p className="light">Sub-title</p>
        </div>
    )
}

export default Card;