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
    /**
     * Adds a topic to the user's subscribed topics if not already subscribed.
     *
     * @param {string} topic - The topic to add.
     */
    addTopic(topic){
        if(!this.hasTopic(topic)){
            this.#topics.push(topic);
        }
    }

    /**
     * Checks if the user is subscribed to a specific topic.
     *
     * @param {string} topic - The topic to check.
     * @returns {boolean} - True if the user is subscribed to the topic, false otherwise.
     */
    hasTopic(topic){
        return this.#topics.includes(topic)
    }
    
    /**
     * Receives an alert and stores it. Urgent alerts are added to the front,
     * while informative alerts are added to the end.
     *
     * @param {object} alert - The alert to store.
     */
    receiveAlert(alert){
        if(alert.getType === "Informative"){
            this.#alerts.push(alert)
        }else{
            this.#alerts.unshift(alert)
        }
    }

    /**
     * Marks a specific alert as read if it exists in the user's alerts.
     *
     * @param {object} alert - The alert to mark as read.
     */
    readAlert(alert){
        const foundAlert = this.getPersonalAlerts.find(a => a === alert)
        if(foundAlert){
            foundAlert.makeAsRead()
        }
    }

    /**
     * Filters a list of alerts to return only those that are unread and not expired.
     *
     * @param {array} list - The list of alerts to filter.
     * @returns {array} - A filtered list of unread, non-expired alerts.
     */
    filterListArray(list){
        const now = new Date()
        return list.filter(a => !a.getIsRead && a.getExpirationDate > now)
    }

    /**
     * Retrieves all unread and non-expired alerts from the user's alert list.
     *
     * @returns {array} - A list of unread, non-expired alerts.
     */
    getUnreadAlerts(){
        return this.filterListArray(this.#alerts)
    }
}

module.exports = { Users }