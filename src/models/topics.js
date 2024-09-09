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

    /**
     * Adds an alert to the topic. Urgent alerts are added to the front,
     * while informative alerts are added to the end.
     *
     * @param {object} alert - The alert to add.
     */
    addAlert(alert){
        if(alert.getType === "Informative"){
            this.#alerts.push(alert)
        }else{
            this.#alerts.unshift(alert)
        }
    }

    /**
     * Filters a list of alerts to return only those that have not expired.
     *
     * @param {array} list - The list of alerts to filter.
     * @returns {array} - A filtered list of non-expired alerts.
     */
    filterListArray(list){
        const now = new Date()
        const filter = list.filter(a => a.getExpirationDate > now);
        return filter;
    }

    /**
     * Retrieves all alerts from the topic that have not expired.
     *
     * @returns {array} - A list of non-expired alerts.
     */
    getAlertNotExpiration(){
        return this.filterListArray(this.#alerts)
    }
}

module.exports = { Topics }