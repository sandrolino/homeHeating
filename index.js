
let axios = require('axios')
let cron = require('node-cron')
const func = require('./lib/func')
const key = require('./key')

const getRequestString = (action) => {
    return `https://maker.ifttt.com/trigger/${action}/with/key/${key}`
}


const getAction = (time, timeOn, timeOff) => {

    if ( (time > timeOff) || (time < timeOn) ) {
        return 0
    } else {
        return 1
    }
}


const binaryActionToString = (action) => {
    return (action === 0) ? 'Plug1Off' : 'Plug1On'
}

const sendUpdate = async (req) => {
    try {
        await axios.post(req)
    } catch (err) {
        console.error(err)
    }
}


const withinSlot = (t) => getAction(t, 19.5, 20.5) || getAction(t, 5, 6) 

const getHourDecimal = () => {
    let d = new Date
    return d.getHours() + d.getMinutes() / 60.0
}

const logAndReturn = (input) => {
    console.log(input)
    return input
}

const controller = func.compose(
    sendUpdate,
    logAndReturn,
    getRequestString,
    binaryActionToString,
    withinSlot,
    getHourDecimal
)



cron.schedule('*/1 * * * *', function() {
    controller()
})
