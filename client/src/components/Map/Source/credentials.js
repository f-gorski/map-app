const mapBoxCredentials = {
    id: "f-gorski",
    mapStyle: "ck93aphcw2y921ik4b9kvfbkd",
    token: "pk.eyJ1IjoiZi1nb3Jza2kiLCJhIjoiY2s5Mzl1YjZlMDAyODN0bXZ6MmNnY2Q4byJ9.SUcwvblN5R7V34h5GRk43A"
};

export const mapBoxUrl = `https://api.mapbox.com/styles/v1/${mapBoxCredentials.id}/${mapBoxCredentials.mapStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapBoxCredentials.token}`