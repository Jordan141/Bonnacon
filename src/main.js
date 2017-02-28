//Main loop

const ctrl = require('./controllers.js')
const cfg = require('./config.json')
const credentials = require('./credentials.json')
const packageFile = require('./package.json')

//Init the program
require('./init.js').then( sessions => {
  let [cleverbotSession, steamSession] = sessions
  console.log('Cleverbot and steam sessions synchronised')
//  DRAFT FOR LISTENING FOR STEAM MESSAGES

  steamSession.steamFriends.on('message', (chatRoomId, message) => {
    let msgFromSteam = ctrl.loadMessageFromSteam(message)
    console.log('Message incomming from', chatRoomId,':', message)
    let cleverbotListener = ctrl.sendMessageToCleverbot(
      {
        session: cleverbotSession,
        message: msgFromSteam
      }
    ).then( msgFromCleverbot => {
      console.log(`${msgFromSteam} ===> ${msgFromCleverbot}\n`)
      ctrl.sendMessageToSteam(
        {
          steamFriends: steamSession.steamFriends,
          senderId: chatRoomId,
          message: msgFromCleverbot
        }
      )
    }).catch(err => console.log(err))

  })

})









//Example usage
/*
let cleverbotSession = ctrl.loginToCleverbot({
    username: 'bya'
  },
  () => {}
)
cleverbotSession.then( session => {
  return ctrl.sendMessageToCleverbot({
      session,
      message: 'test msg',
    }
  )
}).then( response => {
  console.log(response)
})
*/
