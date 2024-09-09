const { AlertsSystem } = require('../src/app.js');
const { Topics } = require('../src/models/topics.js');
const { Users } = require('../src/models/users.js');
const { InformativeAlerts } = require('../src/models/informativeAlerts.js')
const { UrgentAlerts } = require('../src/models/urgentAlerts.js')

describe('AlertsSystem Tests', () => {
    let system;
    beforeEach(() => {
        system = new AlertsSystem();
    });

    test('should register a user', () => {
        system.registerUser('Joaquin')
        expect(system.getUsers['Joaquin']).toBeInstanceOf(Users)
    });

    test('should register a topic', () => {
        system.registerTopic('System')
        expect(system.getTopics['System']).toBeInstanceOf(Topics)
    });

    test('should be able to choose a topic', () => {
        system.registerUser('Joaquin')
        system.registerTopic('System')
        system.chooseTopics('Joaquin', 'System')
        expect(system.getUsers['Joaquin']).toBeInstanceOf(Users)
        expect(system.getTopics['System']).toBeInstanceOf(Topics)
        const user = system.getUsers['Joaquin']
        expect(user.hasTopic("System")).toBe(true)
    })

    test('should be able to add an alert to a specific topic and add it to all users who have that topic.', () => {
        system.registerUser('Joaquin')
        system.registerUser('Maria')
        system.registerTopic('System')
        system.chooseTopics('Joaquin', 'System')
        system.chooseTopics('Maria', 'System')
        const I1 = new InformativeAlerts("The System",new Date())
        const U1 = new UrgentAlerts("The System is broken",new Date())
        
        system.sendAlertToTopic(I1, 'System')
        system.sendAlertToTopic(U1, 'System')

        const userOne = system.getUsers['Joaquin']
        const userTwo = system.getUsers['Maria']

        expect(system.getTopics['System'].getAlerts[0]).toBeInstanceOf(UrgentAlerts)
        expect(system.getTopics['System'].getAlerts[1]).toBeInstanceOf(InformativeAlerts)

        expect(userOne.getPersonalAlerts[0]).toBeInstanceOf(UrgentAlerts)
        expect(userOne.getPersonalAlerts[1]).toBeInstanceOf(InformativeAlerts)

        expect(userTwo.getPersonalAlerts[0]).toBeInstanceOf(UrgentAlerts)
        expect(userTwo.getPersonalAlerts[1]).toBeInstanceOf(InformativeAlerts)
    })

    test('should be able to send an alert to a specific user', () => {
        system.registerUser('Joaquin')
        system.registerUser('Maria')
        system.registerTopic('System')
        system.chooseTopics('Joaquin', 'System')
        const I1 = new InformativeAlerts("The System is down",new Date())

        system.sendAlertToUser(I1, 'Joaquin')

        const userOne = system.getUsers['Joaquin']
        const userTwo = system.getUsers['Maria']

        expect(userOne.getPersonalAlerts[0]).toBeInstanceOf(InformativeAlerts)
        expect(userTwo.getPersonalAlerts).toEqual([])
    
    })

    test('should the user be able to mark an alert as read', () => {
        system.registerUser('Joaquin')
        system.registerTopic('System')
        system.chooseTopics('Joaquin', 'System')

        const I1 = new InformativeAlerts("The System turns 1 years old",new Date('2025-05-08'))
        const I2 = new InformativeAlerts("The System turns 2 years old",new Date('2025-05-08'))

        system.sendAlertToTopic(I1, 'System')
        system.sendAlertToTopic(I2, 'System')

        const userOne = system.getUsers['Joaquin']
        userOne.readAlert(I2)

        expect(userOne.getUnreadAlerts().length).toEqual(1)


    })

    test('should be able to get all unexpired alerts from a user that have not yet been read.', () => {
        system.registerUser('Joaquin')
        system.registerTopic('System')
        system.chooseTopics('Joaquin', 'System')

        const U1 = new UrgentAlerts("The System is broken",new Date('2025-05-08'))
        const U2 = new UrgentAlerts("The System is down",new Date('2025-05-08'))
        const U3 = new UrgentAlerts("The System is fail",new Date('1995-08-15'))

        const I1 = new InformativeAlerts("The System turns 1 years old",new Date('2025-05-08'))
        const I2 = new InformativeAlerts("The System turns 2 years old",new Date('2025-05-08'))
        const I3 = new InformativeAlerts("The System turns 5 years old",new Date('2025-05-08'))
        const I4 = new InformativeAlerts("The System turns 10 years old",new Date('2025-05-08'))
        const I5 = new InformativeAlerts("The System turns 15 years old",new Date('2025-05-08'))

        system.sendAlertToTopic(U1, 'System')
        system.sendAlertToTopic(I1, 'System')
        system.sendAlertToTopic(I2, 'System')
        system.sendAlertToTopic(U2, 'System')
        system.sendAlertToTopic(I3, 'System')
        system.sendAlertToTopic(U3, 'System')
        system.sendAlertToTopic(I4, 'System')
        system.sendAlertToTopic(I5, 'System')

        const user = system.getUsers['Joaquin']
        user.readAlert(I3)

        const listAlertToUser = system.listUnreadAlertToUser('Joaquin')


        expect(listAlertToUser.length).toEqual(6)
        expect(listAlertToUser[0]).toBeInstanceOf(UrgentAlerts)
        expect(listAlertToUser[0].getMessage).toEqual("The System is down")
        expect(listAlertToUser[1]).toBeInstanceOf(UrgentAlerts)
        expect(listAlertToUser[1].getMessage).toEqual("The System is broken")
        expect(listAlertToUser[2]).toBeInstanceOf(InformativeAlerts)
        expect(listAlertToUser[2].getMessage).toEqual("The System turns 1 years old")
        expect(listAlertToUser[3]).toBeInstanceOf(InformativeAlerts)
        expect(listAlertToUser[3].getMessage).toEqual("The System turns 2 years old")
        expect(listAlertToUser[4]).toBeInstanceOf(InformativeAlerts)
        expect(listAlertToUser[4].getMessage).toEqual("The System turns 10 years old")
        expect(listAlertToUser[5]).toBeInstanceOf(InformativeAlerts)
        expect(listAlertToUser[5].getMessage).toEqual("The System turns 15 years old")
    })

    test('should be able to bring all the alerts of a type and know if they are for everyone or specific', () => {
        system.registerUser('Joaquin')
        system.registerTopic('System')
        system.chooseTopics('Joaquin', 'System')

        const U1 = new UrgentAlerts("The System is broken",new Date('2025-05-08'))
        const U2 = new UrgentAlerts("The System is down",new Date('2025-05-08'))
        const U3 = new UrgentAlerts("The System is fail",new Date('1995-08-15'))

        const I1 = new InformativeAlerts("The System turns 1 years old",new Date('2025-05-08'))
        const I2 = new InformativeAlerts("The System turns 2 years old",new Date('2025-05-08'))
        const I3 = new InformativeAlerts("The System turns 5 years old",new Date('2025-05-08'), true)
        const I4 = new InformativeAlerts("The System turns 10 years old",new Date('2025-05-08'))
        const I5 = new InformativeAlerts("The System turns 15 years old",new Date('2025-05-08'))

        system.sendAlertToTopic(U1, 'System')
        system.sendAlertToTopic(I1, 'System')
        system.sendAlertToTopic(I2, 'System')
        system.sendAlertToTopic(U2, 'System')
        system.sendAlertToTopic(I3, 'System')
        system.sendAlertToTopic(U3, 'System')
        system.sendAlertToTopic(I4, 'System')
        system.sendAlertToTopic(I5, 'System')

        system.sendAlertToUser(I3, 'Joaquin')

        const listAlertToTopic = system.listAlertToTopic('System')


        expect(listAlertToTopic.length).toEqual(7)
        expect(listAlertToTopic[0]).toBeInstanceOf(UrgentAlerts)
        expect(listAlertToTopic[0].getMessage).toEqual("The System is down")
        expect(listAlertToTopic[0].getPersonalAlert).toEqual(false)
        expect(listAlertToTopic[1]).toBeInstanceOf(UrgentAlerts)
        expect(listAlertToTopic[1].getMessage).toEqual("The System is broken")
        expect(listAlertToTopic[1].getPersonalAlert).toEqual(false)
        expect(listAlertToTopic[2]).toBeInstanceOf(InformativeAlerts)
        expect(listAlertToTopic[2].getMessage).toEqual("The System turns 1 years old")
        expect(listAlertToTopic[2].getPersonalAlert).toEqual(false)
        expect(listAlertToTopic[3]).toBeInstanceOf(InformativeAlerts)
        expect(listAlertToTopic[3].getMessage).toEqual("The System turns 2 years old")
        expect(listAlertToTopic[3].getPersonalAlert).toEqual(false)
        expect(listAlertToTopic[4]).toBeInstanceOf(InformativeAlerts)
        expect(listAlertToTopic[4].getMessage).toEqual("The System turns 5 years old")
        expect(listAlertToTopic[4].getPersonalAlert).toEqual(true)
        expect(listAlertToTopic[5]).toBeInstanceOf(InformativeAlerts)
        expect(listAlertToTopic[5].getMessage).toEqual("The System turns 10 years old")
        expect(listAlertToTopic[5].getPersonalAlert).toEqual(false)
        expect(listAlertToTopic[6]).toBeInstanceOf(InformativeAlerts)
        expect(listAlertToTopic[6].getMessage).toEqual("The System turns 15 years old")
        expect(listAlertToTopic[6].getPersonalAlert).toEqual(false)
    })

});