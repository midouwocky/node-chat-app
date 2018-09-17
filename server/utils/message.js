const moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new moment().valueOf()
    }
};
var generateLocationMessage = (from,lat,long)=>{
    var url = `https://www.google.com/maps?q=${lat},${long}`;
    return {
        from,
        url,
        createdAt: new moment().valueOf()
    }
}

module.exports={
    generateMessage,
    generateLocationMessage
}