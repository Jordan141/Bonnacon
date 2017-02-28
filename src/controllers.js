const cleverbot = require("cleverbot.io")
const credentials = require('./credentials.json')
const steam = require('steam')
let steamClient = new Steam.SteamClient();
let steamUser = new Steam.SteamUser(steamClient);
let steamFriends = new Steam.SteamFriends(steamClient);
/*
{
"cleverBotApiUser": "",
"cleverBotApiKey": ""
"steamUsername": "",
"steamPassword": ""
}
*/
module.exports = {
  loginToSteam: (botName) => {
    steamClient.connect();
    steamClient.on('connected', () => {
      steamUser.logOn({
        account_name: credentials.steamUsername,
        password: credentials.steamPassword
      })
    })
    steamClient.on('logOnResponse', (logonResp) => {
        if(logonResp.eresult == Steam.EResult.OK){
          console.log('Logged In!')
          steamFriends.setPersonaState(Steam.EPersonaState.Online)
          steamFriends.setPersonaName(botName || 'Best Bot Ever')
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
  loadMessageFromSteam: () => {},
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
