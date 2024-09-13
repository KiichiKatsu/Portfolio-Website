import '../Styles/Style.css';
import Cards from './Cards.js'

import ExampleBanner from '../Assets/Example Banner.png';

// Antipodean App
import AntipodeanAppBanner from '../Assets/Antipodean App/AntipodeanApp Banner.png';
import AntiApp_Home from '../Assets/Antipodean App/Home.png';
import AntiApp_Menu from '../Assets/Antipodean App/Menu.png';
import AntiApp_AddToOrder from '../Assets/Antipodean App/AddtoOrder.png';
import AntiApp_OrderSummary from '../Assets/Antipodean App/OrderSummary.png';
import AntiApp_Confirmation from '../Assets/Antipodean App/OrderConfirmation.png';

// Antipodean Website
import AntipodeanWebBanner from '../Assets/Antipodean Website/AntipodeanWeb Banner.png';
import AntiWeb_Full from '../Assets/Antipodean Website/Antipodean Home Full.png';
import AntiWeb_1 from '../Assets/Antipodean Website/AntipodeanWeb Section 1.png';
import AntiWeb_2 from '../Assets/Antipodean Website/AntipodeanWeb Section 2.png';
import AntiWeb_3 from '../Assets/Antipodean Website/AntipodeanWeb Section 3.png';
import AntiWeb_4 from '../Assets/Antipodean Website/AntipodeanWeb Section 4.png';

function Carousel() {
    const Design = [
        {
            banner: AntipodeanAppBanner, 
            projectTitle: 'Antipodean Cafe App', 
            projectSubtitle: 'Complete / Mobile App Concept / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [AntiApp_Home,          'mobile'],
                [AntiApp_Menu,          'mobile'],
                [AntiApp_AddToOrder,    'mobile'],
                [AntiApp_OrderSummary,  'mobile'],
                [AntiApp_Confirmation,  'mobile'],
            ]
        },
        {
            banner: AntipodeanWebBanner, 
            projectTitle: 'Example Project', 
            projectSubtitle: 'Complete / Website Concept / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [AntiWeb_Full,          'mobile'],
                [AntiWeb_1,             'desktop'],
                [AntiWeb_2,             'desktop'],
                [AntiWeb_3,             'desktop'],
                [AntiWeb_4,             'desktop']
            ]
        },
        {
            banner: ExampleBanner, 
            projectTitle: 'Example Project', 
            projectSubtitle: 'Incomplete / Website / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [ExampleBanner, 'Alt 1'],
                [ExampleBanner, 'Alt 2'],
                [ExampleBanner, 'Alt 3']
            ]
        }
    ];

    const Research = [
        {
            banner: ExampleBanner, 
            projectTitle: 'Example Project', 
            projectSubtitle: 'Incomplete / Website / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [ExampleBanner, 'Alt 1'],
                [ExampleBanner, 'Alt 2'],
                [ExampleBanner, 'Alt 3']
            ]
        },
        {
            banner: ExampleBanner, 
            projectTitle: 'Example Project', 
            projectSubtitle: 'Incomplete / Website / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [ExampleBanner, 'Alt 1'],
                [ExampleBanner, 'Alt 2'],
                [ExampleBanner, 'Alt 3']
            ]
        },
        {
            banner: ExampleBanner, 
            projectTitle: 'Example Project', 
            projectSubtitle: 'Incomplete / Website / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [ExampleBanner, 'Alt 1'],
                [ExampleBanner, 'Alt 2'],
                [ExampleBanner, 'Alt 3']
            ]
        }
    ];

    const Other = [
        {
            banner: ExampleBanner, 
            projectTitle: 'Example Project', 
            projectSubtitle: 'Incomplete / Website / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [ExampleBanner, 'Alt 1'],
                [ExampleBanner, 'Alt 2'],
                [ExampleBanner, 'Alt 3']
            ]
        },
        {
            banner: ExampleBanner, 
            projectTitle: 'Example Project', 
            projectSubtitle: 'Incomplete / Website / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [ExampleBanner, 'Alt 1'],
                [ExampleBanner, 'Alt 2'],
                [ExampleBanner, 'Alt 3']
            ]
        },
        {
            banner: ExampleBanner, 
            projectTitle: 'Example Project', 
            projectSubtitle: 'Incomplete / Website / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [ExampleBanner, 'Alt 1'],
                [ExampleBanner, 'Alt 2'],
                [ExampleBanner, 'Alt 3']
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