const devConfig = require('./dev')
const prodConfig = require('./prod')

module.exports = function(env){
    if(env == "dev"){
        return devConfig;
    }else if(env == "prod"){
        return prodConfig;
    }
}