//Main loop
require('./init.js') //Init the program
const ctrl = require('./controllers.js')
const cfg = require('./config.json')

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
