class Topics {
    #name
    #alerts

    constructor(name){
        this.#name = name
        this.#alerts = []
    }

    // Methods Getters ans Setters
    get getName(){
        return this.#name
    }

    set setName(name){
        this.#name = name
    }
    
    get getAlerts(){
        return this.#alerts
    }

    // Methods Specificts 
    addAlert(alert){
        if(alert.getType === "Informative"){
            this.#alerts.push(alert)
        }else{
            this.#alerts.unshift(alert)
        }
    }

    filterListArray(list){
        const now = new Date()
        const filter = list.filter(a => a.getExpirationDate > now);
        return filter;
    }

    getAlertNotExpiration(){
        return this.filterListArray(this.#alerts)
    }
}

module.exports = { Topics }