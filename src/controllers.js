const cleverbot = require("cleverbot.io")
const credentials = require('./credentials.json')
/*
{
"cleverBotApiUser": "",
"cleverBotApiKey": ""
"steamUsername": "",
"steamPassword": ""
}
*/
module.exports = {
  loginToSteam: () => {},
  logoutFromSteam: () => {},

  loginToCleverbot: ( loginObj, cb) => {
    //loginObj {apiUser, apiKey, username}
    let {username} = loginObj
    let bot = new cleverbot(credentials.cleverBotApiUser,credentials.cleverBotApiKey)
    return bot.create(cb)
  },
  logoutFromCleverbot: () => {},

  sendMessageToSteam: () => {},
  loadMessageFromSteam: () => {},

  sendMessageToCleverbot: () => {},
  loadMessageFromCleverbot: () => {}
}
