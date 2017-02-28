//Hey there, this is the init file
const packageFile = require('./package.json')
//Init Code
console.log(
`
${packageFile.name.charAt(0).toUpperCase() + packageFile.name.slice(1)} ${packageFile.version}
${packageFile.author}
License: ${packageFile.license}
`
)
console.log('Initiating')
module.export = {
  //Expored object
}
