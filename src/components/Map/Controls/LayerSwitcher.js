import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const LayerSwitcher = ({ devPlansData, setShowLayerDevPlans, singleData, setShowLayerSingle, multiData, setShowLayerMulti, mixedData, setShowLayerMixed }) => {

    const [checkedState, setCheckedState] = useState({
        devPlans: false,
        single: false,
        multi: false,
        mixed: false
    });
    const handleChange = (e) => {
        const {checked, name} = e.target;
        setCheckedState({
            ...checkedState,
            [name]: checked,
        });

        switch(name) {
            case "devPlans":
                setShowLayerDevPlans(checked);
                break;
            case "single":
                setShowLayerSingle(checked);
                break;
            case "multi":
                setShowLayerMulti(checked);
                break;
            case "mixed":
                setShowLayerMixed(checked);
                break;
            default:
                null;
        }

    }

    return (
        <div className="layer-switcher">
            {devPlansData ?
                <input type="checkbox" id="devPlansToggle" name="devPlans" className="toggle-switch" onChange={handleChange} checked={checkedState.devPlans}></input> :
                <LoadingSpinner />}
            <label htmlFor="devPlansToggle">Plany zagospodarowania</label>

            {singleData ? 
                <input type="checkbox" id="singleToggle" name="single" className="toggle-switch" onChange={handleChange} checked={checkedState.single}></input> : 
                <LoadingSpinner />}
            <label htmlFor="singleToggle">Zabudowa jednorodzinna</label>

            {multiData ? 
                <input type="checkbox" id="multiToggle" name="multi" className="toggle-switch" onChange={handleChange} checked={checkedState.multi}></input> : 
                <LoadingSpinner />}
            <label htmlFor="multiToggle">Zabudowa wielorodzinna</label>

            {mixedData ? 
                <input type="checkbox" id="mixedToggle" name="mixed" className="toggle-switch" onChange={handleChange} checked={checkedState.mixed}></input> : 
                <LoadingSpinner />}
            <label htmlFor="mixedToggle">Zabudowa mieszana</label>
        </div>
    );
}

export default LayerSwitcher;