const options = require('./options');
const { prefix } = require('../config');


const call = (command, params) => {
    switch (command) {
        case `${prefix}play`:
            commands[command].run([...params])
            break
        default:
            //command not found
    }
}

module.exports = exports = call;