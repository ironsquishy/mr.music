function isBot(message, client){
    return (client.user.username === message.author.username);
}

function isValidURL(str){
    try{
        return new Boolean(new URL(str));
    }catch (err){
        return false;
    }
}

function tokenizeArgs(str){
    return str.split(/(?<=^\S+)\s/);
}

module.exports = { isBot, isValidURL, tokenizeArgs }