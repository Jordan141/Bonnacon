const cleverbot = require("cleverbot.io")
const credentials = require('./credentials.json')
const Steam = require('steam');
/*
{
"cleverBotApiUser": "",
"cleverBotApiKey": ""
"steamUsername": "",
"steamPassword": ""
}
*/
module.exports = {
  loginToSteam: () => {
    var steamClient = new Steam.SteamClient();
    var steamUser = new Steam.SteamUser(steamClient);
    var steamFriends = new Steam.SteamFriends(steamClient);

    steamClient.connect();
    steamClient.on('connected', function() {
      steamUser.logOn({
        account_name: credentials.steamUsername,
        password: credentials.steamPassword
  });
    });

    steamClient.on('logOnResponse', function(logonResp) {
      if (logonResp.eresult == Steam.EResult.OK) {
        console.log('Logged in!');
        steamFriends.setPersonaState(Steam.EPersonaState.Online); // to display your bot's status as "Online"
        steamFriends.setPersonaName('King Russian'); // to change its nickname
        //steamFriends.joinChat('103582791431621417'); // the group's SteamID as a string
      }
    });
  },
  logoutFromSteam: () => {},

  loginToCleverbot: (ctrlObj) => {
    //loginObj {apiUser, apiKey, username}
    let {username} = ctrlObj
    let bot = new cleverbot(credentials.cleverBotApiUser,credentials.cleverBotApiKey)
    return new Promise( (resolve, reject) => {
      bot.create((err, session) => {
        if (err) {
          console.log('[cleverbot error] An error occured during creating session', err)
          console.log('[cleverbot error] debug msg: username: ', username)
          return reject(err)
        }
        return resolve(bot)
      })
    })
  },
  logoutFromCleverbot: () => {},
  sendMessageToSteam: () => {},
  loadMessageFromSteam: () => { },
  sendMessageToCleverbot: (ctrlObj) => {
    let {session, message} = ctrlObj
    return new Promise ( (resolve, reject) => {
      session.ask(message, (err, response) => {
        if (err) return reject(err)
        return resolve(response)
      })
    })

  }
}
