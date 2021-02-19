import React, { useContext, useEffect, useRef, useState } from 'react';
import * as ol from 'ol';
import MapContext from '../../MapContext';

const Popups = ({ source, style, zIndex = 0 }) => {
    const { map } = useContext(MapContext);
    const overlayFeatureName = useRef();
    const overlayFeatureType = useRef();
    const overlayFeatureDate = useRef();
    const overlayFeatureFunction = useRef();
    const overlayFeatureHeight = useRef();
    const overlayFeatureBio = useRef();

    const [typeOfLayer, setTypeOfLayer] = useState('devPlans')

    useEffect(() => {
        if (!map) {
            return;
        }

        const overlayContainerElement = document.querySelector('.overlay__container');
        const overlay = new ol.Overlay({
            element: overlayContainerElement,
        });
        map.addOverlay(overlay);

        map.on('click', (e) => {
            overlay.setPosition(undefined);
            map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
                let clickedCoordinate = e.coordinate;
                overlay.setPosition(clickedCoordinate);
                console.log(feature.getKeys());

                if(layer.get('name') === 'devPlans') {
                    let planName = feature.get('nazwa_planu');
                    let planType = feature.get('typ_planu');
                    let planDate = feature.get('data_uchwalenia');
                    overlayFeatureType.current.innerHTML = planType || 'brak';
                    overlayFeatureName.current.innerHTML = planName || 'brak';
                    overlayFeatureDate.current.innerHTML = planDate || 'brak';
                } 
                
                else {
                    setTypeOfLayer('functionPlans');
                    let planName = feature.get('nazwa_plan');
                    let planFunction = feature.get('fun_nazwa');
                    let planHeight = feature.get('max_wys') + " m";
                    let planBio = feature.get('pow_bio') + " %";

                    overlayFeatureName.current.innerHTML = planName || 'brak';
                    overlayFeatureFunction.current.innerHTML = planFunction || 'brak';
                    overlayFeatureHeight.current.innerHTML = planHeight || 'brak';
                    overlayFeatureBio.current.innerHTML = planBio || 'brak';
                }
            })
        })

        return () => {
            if (map) {
                map.removeOverlay(overlay);
            }
        }
    }, [map])

    const PopupsPlans = (
        <>
            <h3 className="overlay__header">Nazwa planu:
                <p ref={overlayFeatureName} className="overlay__data" id="featureName"></p>
            </h3>
            <h3 className="overlay__header">Typ planu:
                <p ref={overlayFeatureType} className="overlay__data" id="featureType"></p>
            </h3>
            <h3 className="overlay__header">Data uchwalenia:
                <p ref={overlayFeatureDate} className="overlay__data" id="featureDate"></p>
            </h3>
        </>
    )

    const PopupsFunction = (
        <>
            <h3 className="overlay__header">Nazwa planu:
                <p ref={overlayFeatureName} className="overlay__data" id="featureName"></p>
            </h3>
            <h3 className="overlay__header">Funkcja terenu:
                <p ref={overlayFeatureFunction} className="overlay__data" id="featureFunction"></p>
            </h3>
            <h3 className="overlay__header">Maksymalna wysokość:
                <p ref={overlayFeatureHeight} className="overlay__data" id="featureHeight"></p>
            </h3>
            <h3 className="overlay__header">Powierzchnia biologicznie czynna:
                <p ref={overlayFeatureBio} className="overlay__data" id="featureBio"></p>
            </h3>
        </>
    )

    return (
        <div className="overlay__container">
            {typeOfLayer === 'devPlans' ? PopupsPlans : PopupsFunction}
        </div>
    )
}

export default Popups;
