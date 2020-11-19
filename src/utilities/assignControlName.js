export const assignControlName = (isLoaded, name) => {

    switch (name) {
        case "Plany zagospodarowania":
            return !isLoaded ?
                "<span class='layer loading'>Plany zagospodarowania</span> <span class='loader'></span>" :
                "<span class='layer'>Plany zagospodarowania</span>"
    
        case "Zabudowa jednorodzinna":
            return !isLoaded ?
            "<span class='layer loading'>Zabudowa jednorodzinna</span> <span class='loader'></span>" : "<span class='layer'>Zabudowa jednorodzinna</span>"

        case "Zabudowa wielorodzinna":
            return !isLoaded ?
            "<span class='layer loading'>Zabudowa wielorodzinna</span> <span class='loader'></span>" : "<span class='layer'>Zabudowa wielorodzinna</span>"

        case "Zabudowa jedno i wielorodzinna":
            return !isLoaded ?
            "<span class='layer loading'>Zabudowa jedno i wielorodzinna</span> <span class='loader'></span>" : "<span class='layer'>Zabudowa jedno i wielorodzinna</span>"

        default:
            return "<span>Błąd</span>";
    }
}