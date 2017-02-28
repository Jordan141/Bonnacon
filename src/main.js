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
    console.log(message)
    //let receivedMessage = ctrl.loadMessageFromSteam()
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
