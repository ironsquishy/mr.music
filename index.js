const Discord = require('discord.js');
const YoutubeDL = require('ytdl-core');

const { prefix, token } = require('./config');

const Client = Discord.loging(token);

client.on('ready', onReady);
client.on('reconnecting', onReconnect);
client.on('disconnect', onDisconnect);
client.on('message', onMessage);


async function onReady(){}
async function onReconnect(){}
async function onDisconnect () {}

async function onMessage(message) {
    if(message.auther.bot) return;
    if(!message.content.startsWith(prefix)) return;

    /*Do command options here*/
    /*TODO Resolve regex*/
    const [ command, params ] = message.content.split(/g/)[1];
}
