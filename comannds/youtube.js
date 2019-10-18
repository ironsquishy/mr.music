const YTDL = require('ytdl-core');
const YTSR = require('ytsr');
const Utils = require('./utils');

var youtubePlay = null;

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

        if(youtubePlay){
            youtubePlay.end();
            youtubePlay = null
        }

        try {
            if(!YTDL.validateURL(url)) throw 'Youtube url invalid!';

            const connection = await msg.member.voiceChannel.join();

            msg.channel.send('Searching for song...');

            const dispatch = connection.playStream(YTDL(url, {filter : 'audio'}));
            dispatch.setVolume(0.25);
            youtubePlay = dispatch;

            msg.channel.send('Playing...');
            dispatch.on('end', () =>{});
            dispatch.on('error', e => console.warn);

            return url;
        } catch (err){
            console.warn(err);
        }
    }

    static async searchPlay(msg, query){
        if(!query) return;
        if(!msg.member.voiceChannel){
            msg.reply('You will need to be in voice to use youtube play.');
            return;
        } 

        if(youtubePlay){
            youtubePlay.end();
            youtubePlay = null
        }

        try {
            
            const connection = await msg.member.voiceChannel.join();
            msg.channel.send('Searching for song...');

            const response = await searchResults(query);
            msg.channel.send(`Play -> Title: ${response.title} by ${response.author}`);
            
            
            const dispatch = connection.playStream(YTDL(response.url, {filter : 'audio'}));
            dispatch.setVolume(0.25);
            youtubePlay = dispatch;

            dispatch.on('end', () =>{});
            dispatch.on('error', e => console.warn);

            return response.url;
        } catch (err){
            console.warn(err);
        }
    }

}

module.exports = exports = Youtube;
