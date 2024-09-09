class Users {
    #name
    #topics
    #alerts

    constructor(name){
        this.#name = name
        this.#topics = []
        this.#alerts = []
    }

    // Methods Getters ans Setters
    get getName(){
        return this.#name
    }

    set setName(name){
        this.#name = name
    }

    get getTopics(){
        return this.#topics
    }

    get getPersonalAlerts(){
        return this.#alerts
    }

    // Methods Specificts 
    addTopic(topic){
        if(!this.hasTopic(topic)){
            this.#topics.push(topic);
        }
    }

    hasTopic(topic){
        return this.#topics.includes(topic)
    }

    receiveAlert(alert){
        if(alert.getType === "Informative"){
            this.#alerts.push(alert)
        }else{
            this.#alerts.unshift(alert)
        }
    }

    readAlert(alert){
        const foundAlert = this.getPersonalAlerts.find(a => a === alert)
        if(foundAlert){
            foundAlert.IsRead()
        }
    }

    filterListArray(list){
        const now = new Date()
        return list.filter(a => !a.getIsRead && a.getExpirationDate > now)
    }


    getUnreadAlerts(){
        return this.filterListArray(this.#alerts)
    }
}

module.exports = { Users }