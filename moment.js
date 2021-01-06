//Moment's library I am using for the code
var moment = require("moment")

// format the current date
var now = moment();
console.log(now.format("dddd, MMMM Do YYYY, h:mm:ss a"))//date math example
console.log(moment('2016-03-12 13:00:00').add(1, 'day').format('LLL'))

//time math example
console.log(moment('2016-03-12 13:00:00').add(24, 'hours').format('LLL'))

// moment API
moment


