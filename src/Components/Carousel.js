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


function Carousel() {
    const Design = [
        {
            banner: AntipodeanAppBanner, 
            projectTitle: 'Antipodean Cafe App', 
            projectSubtitle: 'Complete / Mobile App Concept / Designer', 
            projectDesc: 'A short meaningful description of the project.',
            images: [
                [AntiApp_Home, 'Home Screen'],
                [AntiApp_Menu, 'Menu Screen'],
                [AntiApp_AddToOrder, 'Add to Order Screen'],
                [AntiApp_OrderSummary, 'Order Summary Screen'],
                [AntiApp_Confirmation, 'Order Confirmation Screen']
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