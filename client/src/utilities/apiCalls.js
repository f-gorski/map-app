const fetchDevPlans = (setStateHookDevPlans) => fetch("http://localhost:3000/api/devPlans")
    .then(res => res.json())
    .then(data => {
        setStateHookDevPlans(data.devPlans[0])
    });

const fetchDevSingle = (setStateHookSingle) => fetch("http://localhost:3000/api/terrFuncSingle")
    .then(res => res.json())
    .then(data => {
        setStateHookSingle(data.terrFuncSingle[0]);
    });

    const fetchDevMixed = (setStateHookMixed) => fetch("http://localhost:3000/api/terrFuncMixed")
    .then(res => res.json())
    .then(data => {
        setStateHookMixed(data.terrFuncMixed[0]);
    });

    const fetchDevMulti = (setStateHookMulti) => fetch("http://localhost:3000/api/terrFuncMulti")
    .then(res => res.json())
    .then(data => {
        setStateHookMulti(data.terrFuncMulti[0])
    });

export { fetchDevPlans, fetchDevSingle, fetchDevMulti, fetchDevMixed }