const prefix = '!'

const call = (command, params) => {
    switch (command) {
        case `${prefix}play`:
            ommands[command].run([...params])
            break
        default:
            //command not found
    }
}