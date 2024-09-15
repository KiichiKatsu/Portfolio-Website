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
import AntiWeb_1 from '../Assets/AntipodeanWebsite/AntipodeanWeb Section 1.png';
import AntiWeb_2 from '../Assets/AntipodeanWebsite/AntipodeanWeb Section 2.png';
import AntiWeb_3 from '../Assets/AntipodeanWebsite/AntipodeanWeb Section 3.png';
import AntiWeb_4 from '../Assets/AntipodeanWebsite/AntipodeanWeb Section 4.png';

// Quick Stop App
import QSBanner from '../Assets/QuickStop/Banner.png';
import QS_Home from '../Assets/QuickStop/HomePage.png';
import QS_Forum from '../Assets/QuickStop/Community Forum.png';
import QS_PostDetail from '../Assets/QuickStop/Post detail.png';
import QS_PostCreation from '../Assets/QuickStop/Post Creation.png';
import QS_Booking from '../Assets/QuickStop/AppointmentBooking.png';
import QS_ManageBookings from '../Assets/QuickStop/Manage Bookings.png';
import QS_Confirmation from '../Assets/QuickStop/AppointmentConfirmation.png';
import QS_Comments from '../Assets/QuickStop/AppointmentComments.png';

// Fitness App
import FitnessBanner from '../Assets/UnnamedFitnessApp/Banner.png';
import Fitness_Home from '../Assets/UnnamedFitnessApp/Home Page.png';
import Fitness_Calendar from '../Assets/UnnamedFitnessApp/Calendar.png';
import Fitness_Message from '../Assets/UnnamedFitnessApp/Message.png';

// KalmPROM App
import KalmPROMBanner from '../Assets/KalmPROM/Banner.png';
import KalmPROM_Signin from '../Assets/KalmPROM/Sign In.png';
import KalmPROM_Login from '../Assets/KalmPROM/Login Portal.png';
import KalmPROM_Home from '../Assets/KalmPROM/Home Page.png';
import KalmPROM_HomeGrey from '../Assets/KalmPROM/Home Page greyscale.png';
import KalmPROM_Settings from '../Assets/KalmPROM/Settings.png';
import KalmPROM_LogEmotions from '../Assets/KalmPROM/Log Emotion.png';
import KalmPROM_PromForm from '../Assets/KalmPROM/Prom Form.png';
import KalmPROM_FormComplete from '../Assets/KalmPROM/Form Complete.png';

// VR Controller
import VRControllerBanner from '../Assets/VRControllerSketches/Banner.png';
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
                [AntiApp_Home, 'Antipodean Home Screen'],
                [AntiApp_Menu, 'Antipodean Menu Page'],
                [AntiApp_AddToOrder, 'Antipodean Add to Order Screen'],
                [AntiApp_OrderSummary, 'Antipodean Order Summary Screen'],
                [AntiApp_Confirmation, 'Antipodean Order Confirmation Screen'],
            ]
        },
        {
            banner: AntipodeanWebBanner,
            projectTitle: 'Antipodean Cafe (Website)',
            projectSubtitle: 'Complete / Website Concept / Designer',
            projectDesc: `As an extention of the app, I decided to redesign Antipodean's website as well—realigning it to the identity and philosophies I gathered.`,
            images: [
                [AntiWeb_Full, 'Full Website Desing'],
                [AntiWeb_1, 'Section 1 of Website'],
                [AntiWeb_2, 'Section 2 of Website'],
                [AntiWeb_3, 'Section 3 of Website'],
                [AntiWeb_4, 'Section 4 of Website']
            ]
        },
        {
            banner: QSBanner,
            projectTitle: 'QuickStop',
            projectSubtitle: 'Complete / App / Designer',
            projectDesc: `This is a prototype app design created from fieldwork investigations of my university's
                          Student Support Service. I design in grayscale first hence the screens below. This is to
                          ensure contrast in all my designs for accessibility.`,
            images: [
                [QS_Home, 'Home Screen'],
                [QS_Forum, 'Forum Screen'],
                [QS_PostDetail, 'Details of a forum post'],
                [QS_PostCreation, 'Forum Post Creation Screen'],
                [QS_Booking, 'Booking a new Appointment Screen'],
                [QS_ManageBookings, 'Managing Existing Bookings'],
                [QS_Confirmation, 'Booking Confirmation Screen'],
                [QS_Comments, 'Booking Comments Screen']
            ]
        },
        {
            banner: FitnessBanner,
            projectTitle: 'Unnamed Fitness App (WIP)',
            projectSubtitle: 'In Progress / App / Designer',
            projectDesc: `On-going low fidelity prototype of a Fitness App`,
            images: [
                [Fitness_Home, 'Fitness App Home Page'],
                [Fitness_Calendar, 'Fitness App Calendar Page'],
                [Fitness_Message, 'Fitness App Message Page']
            ]
        },
        {
            banner: KalmPROMBanner,
            projectTitle: 'KalmPROM',
            projectSubtitle: 'Complete / App / Designer',
            projectDesc: `This project is a design concept for an app based around patient reported outcome measures (PROM)
                          for stress, anxiety, and depression.`,
            images: [
                [KalmPROM_Signin, 'Sign In Screen'],
                [KalmPROM_Login, 'Login Screen'],
                [KalmPROM_Home, 'Home Screen (In Colour)'],
                [KalmPROM_HomeGrey, 'Home Screen (Grayscale)'],
                [KalmPROM_Settings, 'Settings Screen'],
                [KalmPROM_LogEmotions, 'Log Emotions Screen'],
                [KalmPROM_PromForm, 'PROM Form'],
                [KalmPROM_FormComplete, 'Form Confirmation Screen']
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
            projectTitle: 'VR Controller Sketches',
            projectSubtitle: 'Complete / Ideation / Researcher and Artist',
            projectDesc: `Design and ideation process for a novel tangible VR Controller based on
                          existing HCI literature.`,
            images: [
                [VRController_low, 'Low Fidelity Sketches'],
                [VRController_mid, 'Mid Fidelity Sketches'],
                [VRController_high, 'High Fidelity Sketches'],
                [VRController_bib, 'Bibliography']
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