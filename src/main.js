//Main loop

const ctrl = require('./controllers.js')
const cfg = require('./config.json')
const credentials = require('./credentials.json')


//Init the program
require('./init.js').then( sessions => {
  let [cleverbotSession, steamSession] = sessions
  console.log('Cleverbot and steam sessions synchronised')
//  DRAFT FOR LISTENING FOR STEAM MESSAGES
  steamSession.steamFriends.on('message', (chatRoomId, message) => {
    let msgFromSteam = ctrl.loadMessageFromSteam(message)
    let cleverbotListener = ctrl.sendMessageToCleverbot(
      {
        session: cleverbotSession,
        message: msgFromSteam
      }
    ).then( msgFromCleverbot => {
      console.log('Steam:',msgFromSteam, 'Cleverbot:', msgFromCleverbot)
      ctrl.sendMessageToSteam(
        {
          steamFriends: steamSession.steamFriends,
          senderId: chatRoomId,
          message: msgFromCleverbot
        }
      )
    })

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
