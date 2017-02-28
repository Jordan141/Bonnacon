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
