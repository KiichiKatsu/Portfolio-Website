import '../Styles/Style.css';
import Cards from './Cards.js'

import GitHubIcon from '../Assets/GitHub.svg';
import LinkedInIcon from '../Assets/LinkedIn.svg';
import EmailIcon from '../Assets/Mail.svg';

function Carousel() {
    const Design = [
        [GitHubIcon, 'Title 1', 'Subtitle 1'],
        [GitHubIcon, 'Title 2', 'Subtitle 2'],
        [GitHubIcon, 'Title 3', 'Subtitle 3'],
    ];

    const Research = [
        [LinkedInIcon, 'Title 1', 'Subtitle 1'],
        [LinkedInIcon, 'Title 2', 'Subtitle 2'],
        [LinkedInIcon, 'Title 3', 'Subtitle 3'],
    ];

    const Other = [
        [EmailIcon, 'Title 1', 'Subtitle 1'],
        [EmailIcon, 'Title 2', 'Subtitle 2'],
        [EmailIcon, 'Title 3', 'Subtitle 3'],
    ];

    return (
        <div className="Projects">
            <div>
                <Cards data={Design}/>
            </div>
            <div>
                <Cards data={Research}/>
            </div>
            <div>
                <Cards data={Other}/>
            </div>
        </div>
    )
}

export default Carousel;