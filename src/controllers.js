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

  loginToCleverbot: (ctrlObj, cb) => {
    //loginObj {apiUser, apiKey, username}
    let {username} = ctrlObj
    let bot = new cleverbot(credentials.cleverBotApiUser,credentials.cleverBotApiKey)
    return new Promise( (resolve, reject) => {
      bot.create((err, session) => {
        if (err) return reject(err)
        return resolve(bot)
      })
    })
  },
  logoutFromCleverbot: () => {},

  sendMessageToSteam: () => {},
  loadMessageFromSteam: () => {},

  sendMessageToCleverbot: (ctrlObj, cb) => {
    let {session, message} = ctrlObj
    return new Promise ( (resolve, reject) => {
      session.ask(message, (err, response) => {
        if (err) return reject(err)
        return resolve(response)
      })
    })

  }
}
