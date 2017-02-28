//Main loop

const ctrl = require('./controllers.js')
const cfg = require('./config.json')
<<<<<<< HEAD
var Steam = require('steam');
=======
const credentials = require('./credentials.json')


let initiate = require('./init.js') //Init the program
//Logged in
initiate.then( sessions => {
  let [cleverbotSession, steamSession] = sessions
  console.log('Cleverbot and steam sessions synchronised')
})
>>>>>>> a7d0934492fee9787784608cea37dc6b0e369dc7


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
ctrl.loginToSteam();
