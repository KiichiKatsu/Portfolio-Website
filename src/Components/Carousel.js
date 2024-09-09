import '../Styles/Style.css';
import Cards from './Cards.js'

import GitHubIcon from '../Assets/GitHub.svg';

function Carousel() {
    // {
    //     banner: GitHubIcon, 
    //     projectTitle: 'Example Project', 
    //     projectSubtitle: 'Incomplete / Website / Designer', 
    //     projectDesc: 'A short meaningful description of the project.',
    //     images: [
    //         [GitHubIcon, 'Alt 1'],
    //         [GitHubIcon, 'Alt 2'],
    //         [GitHubIcon, 'Alt 3']
    //     ]
    // }

    const Design = [
        {
            banner: GitHubIcon, 
            projectTitle: 'Title 1', 
            projectSubtitle: 'Subtitle 1', 
            projectDesc: 'Some Description',
            images: [
                [GitHubIcon, 'Alt 1'],
                [GitHubIcon, 'Alt 2'],
                [GitHubIcon, 'Alt 3']
            ]
        },
        {
            banner: GitHubIcon, 
            projectTitle: 'Example Project', 
            projectSubtitle: 'Incomplete / Website / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [GitHubIcon, 'Alt 1'],
                [GitHubIcon, 'Alt 2'],
                [GitHubIcon, 'Alt 3']
            ]
        },
        {
            banner: GitHubIcon, 
            projectTitle: 'Example Project', 
            projectSubtitle: 'Incomplete / Website / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [GitHubIcon, 'Alt 1'],
                [GitHubIcon, 'Alt 2'],
                [GitHubIcon, 'Alt 3']
            ]
        }
    ];

    const Research = [
        {
            banner: GitHubIcon, 
            projectTitle: 'Example Project', 
            projectSubtitle: 'Incomplete / Website / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [GitHubIcon, 'Alt 1'],
                [GitHubIcon, 'Alt 2'],
                [GitHubIcon, 'Alt 3']
            ]
        },
        {
            banner: GitHubIcon, 
            projectTitle: 'Example Project', 
            projectSubtitle: 'Incomplete / Website / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [GitHubIcon, 'Alt 1'],
                [GitHubIcon, 'Alt 2'],
                [GitHubIcon, 'Alt 3']
            ]
        },
        {
            banner: GitHubIcon, 
            projectTitle: 'Example Project', 
            projectSubtitle: 'Incomplete / Website / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [GitHubIcon, 'Alt 1'],
                [GitHubIcon, 'Alt 2'],
                [GitHubIcon, 'Alt 3']
            ]
        }
    ];

    const Other = [
        {
            banner: GitHubIcon, 
            projectTitle: 'Example Project', 
            projectSubtitle: 'Incomplete / Website / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [GitHubIcon, 'Alt 1'],
                [GitHubIcon, 'Alt 2'],
                [GitHubIcon, 'Alt 3']
            ]
        },
        {
            banner: GitHubIcon, 
            projectTitle: 'Example Project', 
            projectSubtitle: 'Incomplete / Website / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [GitHubIcon, 'Alt 1'],
                [GitHubIcon, 'Alt 2'],
                [GitHubIcon, 'Alt 3']
            ]
        },
        {
            banner: GitHubIcon, 
            projectTitle: 'Example Project', 
            projectSubtitle: 'Incomplete / Website / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [GitHubIcon, 'Alt 1'],
                [GitHubIcon, 'Alt 2'],
                [GitHubIcon, 'Alt 3']
            ]
        }
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