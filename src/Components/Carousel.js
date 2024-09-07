import '../Styles/Style.css';

import Cards from './Cards.js'

function Carousel() {
    return (
        <div className="Projects">
            <div>
                <Cards />
            </div>
            <div>
                <Cards />
            </div>
            <div>
                <Cards />
            </div>
        </div>
    )
}

export default Carousel;