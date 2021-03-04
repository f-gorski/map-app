const API_URL = "https://map-app-api.herokuapp.com"

const fetchDevPlans = (setStateHookDevPlans) => fetch(`${API_URL}/api/devPlans`)
    .then(res => res.json())
    .then(data => {
        setStateHookDevPlans(data.devPlans[0])
    });

const fetchDevSingle = (setStateHookSingle) => fetch(`${API_URL}/api/terrFuncSingle`)
    .then(res => res.json())
    .then(data => {
        setStateHookSingle(data.terrFuncSingle[0]);
    });

    const fetchDevMixed = (setStateHookMixed) => fetch(`${API_URL}/api/terrFuncMixed`)
    .then(res => res.json())
    .then(data => {
        setStateHookMixed(data.terrFuncMixed[0]);
    });

    const fetchDevMulti = (setStateHookMulti) => fetch(`${API_URL}/api/terrFuncMulti`)
    .then(res => res.json())
    .then(data => {
        setStateHookMulti(data.terrFuncMulti[0])
    });

export { fetchDevPlans, fetchDevSingle, fetchDevMulti, fetchDevMixed }