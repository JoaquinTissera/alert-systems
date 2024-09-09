class Alerts {
    #message
    #expirationDate
    #isRead
    #type
    #personalAlert

    constructor(message, expirationDate, type, personalAlert){
        this.#message = message
        this.#expirationDate = expirationDate
        this.#isRead = false
        this.#type = type
        this.#personalAlert = personalAlert
    }

    
    // Methods Getters ans Setters
    get getMessage(){
        return this.#message
    }

    set setMessage(message){
        this.#message = message
    }

    get getExpirationDate(){
        return this.#expirationDate
    }

    set setExpirationDate(expirationDate){
        this.#expirationDate = expirationDate
    }

    get getIsRead(){
        return this.#isRead
    }

    get getType(){
        return this.#type
    }

    get getPersonalAlert(){
        return this.#personalAlert
    }



    
    IsRead(){
        return this.#isRead = true
    }
}

module.exports = { Alerts }

