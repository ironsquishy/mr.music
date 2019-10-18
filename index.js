const Discord = require('discord.js');
const YTDL = require('ytdl-core');

const { prefix, token } = require('./config');

const client = new Discord.Client();

/*Features*/
const Youtube = require('./comannds/youtube');

/*Utils & Options*/
const Utils = require('./comannds/utils');
const Options = require('./comannds/options');

client.login(token);

client.on('ready', onReady);
client.on('reconnecting', onReconnect);
client.on('disconnect', onDisconnect);
client.on('message', onMessage);


async function onReady(){
    console.log('Connected and Ready...');
}
async function onReconnect(){
    console.log('Reconnecting...');
}
async function onDisconnect () {
    console.log('Disconnecting...');
};

async function onMessage(message) {

    //If message author is bot
    if(message.author.username === client.user.username) return;

    //If it does not start with prefix
    if(!message.content.startsWith(prefix)) return;

    //No current server present
    if(!message.guild) return;

    const [command, arg] = Utils.tokenizeArgs(message.content);

    switch(command){
        case `${prefix}connect`:
            message.reply('Connecting...');
            break; 

        case `${prefix}disconnect`:
            message.reply('Disconnecting...');
            break;

        case `${prefix}youtube`:
            Youtube.play(message, arg);
            break;

        case `${prefix}leave`:
            Options.leaveVoice(message);
            break;
        case `${prefix}pause`:
            Options.pauseVoice(message);
            break;

        case `${prefix}resume`:
            Options.resumeVoice(message);
            break;

        default:
            message.reply('Invalid arguement!');

    }
    
    
}
