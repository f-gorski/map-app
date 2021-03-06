import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <>
            <main className="landing-page">
                <div className="container">
                    <h1 className="landing-page__header">
                        VarsoMaps
                    </h1>
                    <h2 className="landing-page__cta-header">
                        DOŁĄCZ
                    </h2>
                    <h3 className="landing-page__cta-subheader">
                        do rewolucji przestrzennej
                    </h3>
                    <Link to="/mapa" className="landing-page__cta-link">OTWÓRZ MAPĘ</Link>
                </div>

                <img src={require('../assets/map-blob.png').default} className="landing-page__img" />
            </main>
        </>
    )
}

export default LandingPage;