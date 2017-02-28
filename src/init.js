//Hey there, this is the init file
const packageFile = require('./package.json')
const ctrl = require('./controllers.js')
const cfg = require('./config.json')
//Init Code
console.log(`
${packageFile.name.charAt(0).toUpperCase() + packageFile.name.slice(1)} ${packageFile.version}
${packageFile.author}
License: ${packageFile.license}
`)
console.log('Initiating')


let cleverbotInstance = ctrl.loginToCleverbot({username: cfg.botUsername})
<<<<<<< HEAD
let steamInstance = ctrl.loginToSteam()
=======
//Placeholder for steam instance. Commented out, because loginToSteam is not working
//let steamInstance = new Promise((res, rej) => {res(1)})
let steamInstance = ctrl.loginToSteam(/*args*/)
>>>>>>> af567a1bb481b8b342860b7b7c0f39ad80a694d8

//Logging to cleverbot
cleverbotInstance.catch( err => {
  console.log('[cleverbot error] An error occured during creating a session', err)
  console.log('[cleverbot error] debug msg: username: ', cfg.botUsername)
})
cleverbotInstance.then( cleverbotSession => {
  console.log('Logged to cleverbot')
})

////////////////Logging to steam//////////////
steamInstance.catch( err => {
  console.log('[steam error] An error occured during creating a session', err)
  console.log('[steam error] debug msg: credentials: ',
  credentials.steamUsername,
  credentials.steamPassword
  )
})
steamInstance.then( cleverbotSession => {
  console.log('Logged to steam')
})



//Export a promise that resolves once all instances will be ready
module.exports = Promise.all([cleverbotInstance, steamInstance])
