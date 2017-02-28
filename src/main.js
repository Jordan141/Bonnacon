//Main loop
require('./init.js') //Init the program
const ctrl = require('./controllers.js')
const cfg = require('./config.json')

let session = ctrl.loginToCleverbot(
  {
    apiUser: 'imQaCJtuhQFvtFmN',
    apiKey: 'FpZoxNWTTEkPyPUlD2Tj6lRbpU4iLX4q',
    username: 'bya'
  },
  () => {}
)
console.log(JSON.stringify(session))
