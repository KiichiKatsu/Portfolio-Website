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
import AntipodeanWebBanner from '../Assets/AntipodeanWebsite/AntipodeanWebBanner.png';
import AntiWeb_Full from '../Assets/AntipodeanWebsite/AntipodeanHomeFull.png';
import AntiWeb_1 from '../Assets/AntipodeanWebsite/AntipodeanWebSection1.png';
import AntiWeb_2 from '../Assets/AntipodeanWebsite/AntipodeanWebSection2.png';
import AntiWeb_3 from '../Assets/AntipodeanWebsite/AntipodeanWebSection3.png';
import AntiWeb_4 from '../Assets/AntipodeanWebsite/AntipodeanWebSection4.png';

// VR Controller
import VRControllerBanner from '../Assets/AntipodeanWebsite/AntipodeanWebBanner.png';
import VRController_low from '../Assets/VRControllerSketches/Low Fidelity.png';
import VRController_mid from '../Assets/VRControllerSketches/Mid Fidelity.png';
import VRController_high from '../Assets/VRControllerSketches/High Fidelity.png';
import VRController_bib from '../Assets/VRControllerSketches/Bibliography.png';

function Carousel() {
    const Design = [
        {
            banner: AntipodeanAppBanner,
            projectTitle: 'Antipodean Cafe (App)',
            projectSubtitle: 'Complete / Mobile App Concept / Designer',
            projectDesc: `During the pandemic, I started many design projects—most of which I struggled to finish. The issue was that the subjects I chose were often fictional. 
                          They lacked the tangible identity or novelty I could resonate with and feel motivated by. I obsess over details and am driven by the stories I want to 
                          tell. I often asked questions about brand identity and user interaction that were—quite literally—up to my imagination. I believe that good design comes 
                          from constraints—constraints that I couldn’t imagine due to my lack of familiarity or fieldwork in the industry. Antipodean was perfect for this. Antipodean 
                          has rich philosophies and a brand image I could truly resonate with. As my mom was a co-owner, I was able to ask the questions I craved from fictional 
                          subjects. Antipodean is a New Zealand coffee chain—striving for better coffee and better service. During the pandemic, Antipodean looked into developing 
                          an ordering app to maintain their world-class hospitality while limiting interaction to keep everyone safe.`,
            images: [
                [AntiApp_Home, 'mobile'],
                [AntiApp_Menu, 'mobile'],
                [AntiApp_AddToOrder, 'mobile'],
                [AntiApp_OrderSummary, 'mobile'],
                [AntiApp_Confirmation, 'mobile'],
            ]
        },
        {
            banner: AntipodeanWebBanner,
            projectTitle: 'Antipodean Cafe (Website)',
            projectSubtitle: 'Complete / Website Concept / Designer',
            projectDesc: `As an extention of the app, I decided to redesign Antipodean's website as well—realigning it to the identity and philosophies I gathered.`,
            images: [
                [AntiWeb_Full, 'mobile'],
                [AntiWeb_1, 'desktop'],
                [AntiWeb_2, 'desktop'],
                [AntiWeb_3, 'desktop'],
                [AntiWeb_4, 'desktop']
            ]
        },
        {
            banner: ExampleBanner,
            projectTitle: 'Unnamed Fitness App (WIP)',
            projectSubtitle: 'In Progress / App / Designer',
            projectDesc: `A meaningful description of the project.`,
            images: [
                [ExampleBanner, 'Alt 1'],
                [ExampleBanner, 'Alt 2'],
                [ExampleBanner, 'Alt 3']
            ]
        },
        {
            banner: ExampleBanner,
            projectTitle: 'LocalEyes App (WIP)',
            projectSubtitle: 'Complete / App / Designer',
            projectDesc: `A meaningful description of the project.`,
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
            projectTitle: 'Thesis 1: VR Controller (WIP)',
            projectSubtitle: 'Complete / Research and Development / Researcher and Developer',
            projectDesc: `A meaningful description of the project.`,
            images: [
                [ExampleBanner, 'Alt 1'],
                [ExampleBanner, 'Alt 2'],
                [ExampleBanner, 'Alt 3']
            ]
        },
        {
            banner: ExampleBanner,
            projectTitle: 'Thesis 2: SpinalLog (WIP)',
            projectSubtitle: 'Complete / Research and Development / Researcher and Developer',
            projectDesc: `A meaningful description of the project.`,
            images: [
                [ExampleBanner, 'Alt 1'],
                [ExampleBanner, 'Alt 2'],
                [ExampleBanner, 'Alt 3']
            ]
        },
        {
            banner: VRControllerBanner,
            projectTitle: 'VR Controller Sketches (WIP)',
            projectSubtitle: 'Complete / Ideation / Researcher and Artist',
            projectDesc: `A meaningful description of the project.`,
            images: [
                [VRController_low, 'mobile'],
                [VRController_mid, 'mobile'],
                [VRController_high, 'mobile'],
                [VRController_bib, 'mobile']
            ]
        }
    ];

    const Other = [
        {
            banner: ExampleBanner,
            projectTitle: 'PostGIS Spatial DBMS (WIP)',
            projectSubtitle: 'Complete / Database / Designer and Developer',
            projectDesc: `A meaningful description of the project.`,
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
            projectDesc: `A meaningful description of the project.`,
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
            projectDesc: `A meaningful description of the project.`,
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
                <Cards data={Design} />
            </div>
            <div>
                <Cards data={Research} />
            </div>
            <div>
                <Cards data={Other} />
            </div>
        </div>
    )
}

export default Carousel;