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
  //////////////////////SESSION MANAGEMENT//////////////////////////
  loginToSteam: () => {
    return new Promise((resolve, reject) => {
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
          //console.log('Logged in!');
          steamFriends.setPersonaState(Steam.EPersonaState.Online); // to display your bot's status as "Online"
          steamFriends.setPersonaName('King Russian'); // to change its nickname

          steamFriends.on('message', function(source, message, type, chatter) {
            // respond to both chat room and private messages
            //console.log('Received message: ' + message);
            if (message == 'Cyka') {
              steamFriends.sendMessage(source, 'Blyat', Steam.EChatEntryType.ChatMsg); // ChatMsg by default
            }
          });
          resolve({steamClient, steamUser, steamFriends})
          //steamFriends.joinChat('103582791431621417'); // the group's SteamID as a string
        }
      });
    })
  },
  logoutFromSteam: () => {},
  loginToCleverbot: (ctrlObj) => {
    //loginObj {apiUser, apiKey, username}
    let {username} = ctrlObj
    let bot = new cleverbot(credentials.cleverBotApiUser, credentials.cleverBotApiKey)
    return new Promise( (resolve, reject) => {
      bot.setNick(username)
      bot.create((err, session) => {
        if (err) return reject(err)
        return resolve(bot)
      })
    })
  },
  logoutFromCleverbot: () => {},

  //////////////////////STEAM MESSAGING//////////////////////
  sendMessageToSteam: ({steamFriends, senderId, message}) => {
    steamFriends.sendMessage(senderId, message, Steam.EChatEntryType.ChatMsg)
  },
  loadMessageFromSteam: msg => {
    if (msg !== '') return msg //Steam sends empty message as "Is typing" info
    return false
  },

  //////////////////////CLEVERBOT MESSAGING//////////////////////
  loadMessageFromCleverbot: msg => msg,
  sendMessageToCleverbot: (ctrlObj) => {
    let {session, message} = ctrlObj
    return new Promise ( (resolve, reject) => {
      if (message !== false) {
        session.ask(message, (err, response) => {
          if (err) return reject(response)
          return resolve(response)
        })
      } else {
        return reject('Empty message')
      }
    })

  }
}
