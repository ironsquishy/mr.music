
const leaveVoice = (msg) => {
    if(msg.guild.voiceConnection){
        msg.guild.voiceConnection.disconnect();
    } else {
        msg.reply('I must be in a voice to be leave!?!?!?');
    }
}

module.exports = exports = { leaveVoice };

