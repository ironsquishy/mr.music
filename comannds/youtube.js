const YTDL = require('ytdl-core');
const YTSR = require('ytsr');
const Utils = require('./utils');


async function searchResults(query){
    try {
        if (!query) throw  'Search query not provided';
        const { items } = await YTSR(query, { filter : 'audio' });
        
        return {
            url: items[0].link, 
            title: items[0].title, 
            author : items[0].author.name
        };
    } catch (err){
        throw err;
    }
}


class Youtube {

    constructor(){

    }

    static async play(msg, str){
        if(Utils.isValidURL(str)){
            this.playURL(msg, str);
        } else {
            this.searchPlay(msg, str);
        }
    }

    static async playURL(msg, url){
        if(!url) return;

        if(!msg.member.voiceChannel){
            msg.reply('You will need to be in voice to use youtube play.');
            return;
        }

        try {
            const connection = await msg.member.voiceChannel.join();
            msg.channel.send('Searching for song...');
            
            if(!YTDL.validateURL(url)) throw 'Youtube url invalid!';
            msg.channel.send('Playing song');
            const dispatch = connection.playStream(YTDL(url, {filter : 'audio'}));

            dispatch.setVolume(0.25);

            dispatch.on('end', ()=> connection.disconnect());
            dispatch.on('error', e => console.warn);
            return url;
        } catch (err){
            msg.channel.send(`Error: ${err.toString()}`);
        }
    }

    static async searchPlay(msg, query){
        if(!query) return;
        if(!msg.member.voiceChannel){
            msg.reply('You will need to be in voice to use youtube play.');
            return;
        }  
        try {
            const connection = await msg.member.voiceChannel.join();
            msg.channel.send('Searching for song...');

            const response = await searchResults(query);
            msg.channel.send(`Found & play -> Title: ${response.title} by ${response.author}`);
            
            const dispatch = connection.playStream(YTDL(response.url, {filter : 'audio'}));
            dispatch.setVolume(0.25);

            dispatch.on('end', ()=> connection.disconnect());
            dispatch.on('error', e => console.warn);
            return response.url;
        } catch (err){
            msg.channel.send(`Error: ${err.toString()}`);
        }
    }

}

module.exports = exports = Youtube;
