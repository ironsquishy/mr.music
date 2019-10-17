//https://discordapp.com/oauth2/authorize?client_id=634428722879004672&scope=bot&permissions=36771904
//Discord native-> https://discordapp.com/api/oauth2/authorize?client_id=634428722879004672&permissions=36771904&scope=bot

const Discord = require('discord.js');
const YTDL = require('ytdl-core');

const { prefix, token } = require('./config');

const client = new Discord.Client();

/*Features*/
const Youtube = require('./comannds/youtube');

/*Utils*/
const Utils = require('./comannds/utils');

/*Temp and needs future proofing*/
var mrmusicPLaying = null;

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

    if(message.author.username === client.user.username) return;

    if(!message.content.startsWith(prefix)) return;

    if(!message.guild) return;

    const [command, arg] = Utils.tokenizeArgs(message.content);


    /*Do command options here*/
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
        
        case `${prefix}youtubesearch`:
            Youtube.searchPlay(message, arg);
            break;
        case `${prefix}leave`:
            leaveVoice(message);
            break;
        default:
            message.reply('Invalid arguement!');
    }
    
    
}


function leaveVoice(msg){
    if(msg.guild.voiceConnection){
        msg.guild.voiceConnection.disconnect();
    } else {
        msg.reply('I must be in a voice to be leave!?!?!?');
    }
}