const { Users } = require('./models/users.js')
const { Topics } = require('./models/topics.js')

// This class is for handle of alerts system
class AlertsSystem {
    #users
    #topics

    constructor(){
        this.#users = {}
        this.#topics = {}
    }

    // Methods Getters
    get getUsers(){
        return this.#users
    }

    get getTopics(){
        return this.#topics
    }

    // Use Case

    /**
     * Registers a new user in the system if not already registered.
     *
     * @param {string} name - The name of the user to register.
     */
    registerUser(name){
        if(!this.#users[name]){
            this.#users[name] = new Users(name)
        }
    }

    /**
     * Registers a new topic in the system if not already registered.
     *
     * @param {string} name - The name of the topic to register.
     */
    registerTopic(name){
        if(!this.#topics[name]){
            this.#topics[name] = new Topics(name)
        }
    }

    /**
     * Subscribes a user to a topic.
     *
     * @param {string} username - The name of the user.
     * @param {string} topicName - The name of the topic.
     */
    chooseTopics(username, topicName){
        const user = this.#users[username]
        const topic = this.#topics[topicName] 
        if(user && topic){
            user.addTopic(topicName)
        }
    }

    /**
     * Sends an alert to all users subscribed to a specific topic.
     *
     * @param {object} alert - The alert to send.
     * @param {string} topicName - The name of the topic.
     */
    sendAlertToTopic(alert, topicName){
        const topic = this.#topics[topicName]
        if(topic){
            topic.addAlert(alert)
            const listUsers = Object.values(this.#users)
            listUsers.forEach(user => {
                if(user.hasTopic(topicName)){
                    user.receiveAlert(alert)
                }
            })
        }
    }

    /**
     * Sends an alert to a specific user.
     *
     * @param {object} alert - The alert to send.
     * @param {string} username - The name of the user.
     */
    sendAlertToUser(alert, username){
        const user = this.#users[username]
        if(user){
            user.receiveAlert(alert)
        }
    }

    /**
     * Lists all unread alerts for a specific user.
     *
     * @param {string} username - The name of the user.
     * @returns {array} - A list of unread alerts for the user.
     */
    listUnreadAlertToUser(username){
        const user = this.#users[username]
        if(user){
            return user.getUnreadAlerts()
        }
    }

    /**
     * Lists all non-expired alerts for a specific topic.
     *
     * @param {string} topicName - The name of the topic.
     * @returns {array} - A list of non-expired alerts for the topic.
     */
    listAlertToTopic(topicName){
        const topic = this.#topics[topicName];
        if(topic){
            return topic.getAlertNotExpiration();
        }
    }

}

module.exports = { AlertsSystem }