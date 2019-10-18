const leaveVoice = (msg) => {
    if(msg.guild.voiceConnection){
        msg.guild.voiceConnection.disconnect();
    } else {
        msg.reply('I must be in a voice to be leave!?!?!?');
    }
}

const pauseVoice = (msg) => {
    
        if(msg.guild.voiceConnection){
            msg.channel.send('Pause song');
            const connection  = msg.guild.voiceConnection;

            if(connection.speaking){
                connection.dispatcher.pause();
            }
        } else {
            msg.channel.send('I am not in voice.');
        }
}

const resumeVoice = (msg) => {
   
    if(msg.guild.voiceConnection){
        msg.channel.send('Resume current song...');
        const connection = msg.guild.voiceConnection;
        connection.dispatcher.resume();
    } else {
        msg.channel.send('I am not in voice.');
    }
}

module.exports = exports = { leaveVoice, pauseVoice, resumeVoice };

