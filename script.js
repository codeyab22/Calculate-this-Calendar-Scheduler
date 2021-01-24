//Adia's Calculate-this-Day-Calendar-Planner
console.log("script");

// global variable for the contents of localstorage
var storageData = JSON.parse(localStorage.getItem('calendarData')) || [];

$(document).ready(function(){
    var time = moment().format("h:mm:ss");
    var timeSplit = time.split(":"); 
    var minutesToCool= 59 - parseInt(timeSplit[1]); 
    var secondsToCool= 60- parseInt(timeSplit[2]); 
    var timeToCool= minutesToCool*60 + secondsToCool; 
    var secondsElapsed=0; 
    var timerUntilStartReloading= setInterval(function(){ 
secondsElapsed++
 if (secondsElapsed === timeToCool){
 console.log(moment()); 
  var isReloading= confirm("Lucky is your new hour! Would you like to reload the page?"); 
            if (isReloading) {
window.location.reload(true);
            } else {
                alert("Longer than usual. Reload the page again to start."); 
            }
        }
    },1000);
}); 


//Eventlistener for.saveEvent
$('.saveEvent').on('click', function() {
 console.log("Saved!")
});

//Names of elements

var timeBlockcontainer = $(".container"); 
var todaysDate= $("#currentDay"); 

//Formed current date
todaysDate.text(moment().format("MMMM DD, YYYY")); 

//Formed time blocks
var timesArr= ["9AM","10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]; 

for (var i=1; i<timesArr.length; i++){
    var newTimeBlock= $("#9AM").clone();
    newTimeBlock.attr("id", timesArr[i]); 
    newTimeBlock.children(".row").attr("style", "white-space: pre-Wrap"); 
    newTimeBlock.children(".row").children(".hour").text(timesArr[i]); 
    newTimeBlock.appendTo(".container"); 

}; 

// Declaring variables for saved items to populate planner
var savedDayPlans;
var locationArr = []; 

//Formed a function populateSavedEvents
function populateSavedEvents(){
    // savedDayPlans= localStorage.getItem("calendarData"); 
    // locationArr=[]; 
    // if (savedDayPlans === null || savedDayPlans=== "") {
    //     savedDayPlans = []; 
    // } else {
    //     savedDayPlans = JSON.parse(savedDayPlans); 
    //     for (i=0; i<savedDayPlans.length; i++) {
    //         locationArr.push(savedDayPlans[i].time); 
    //     }
    // }
    
    // for (var i=0; i<locationArr.length; i++) {
    //     var timeBlockid = "#"+locationArr[i]; 
    //     var timeBlock = $(timeBlockid).children(".row").children("textarea"); 
    //     $(timeBlockid).children(".row").children("btn").attr("data-event", "yes"); 
    //     timeBlock.val(savedDayPlans[i].event); 
    // }    

    for (i = 9; i <= 17; i++) {
        for(j = 0; j < storageData.length; j++) {
            if(storageData[j].time == i) {
                $('#'+i).val(storageData[j].text)
                // $('#15').val(storageData[j].text)
            }
        }
    }
}

populateSavedEvents(); 

//Formed a clearLocalStorage function

function clearLocalStorage() {
    savedDayPlans=[]; 
    localStorage.setItem("savedDayPlans", "test"); 
}

// Formed a function saveEvent Save entries in the planner to local storage

function saveEvent(time,input){
    alert("Your event saved! Congrats!"); 
    savedDayPlans.push({"time":time,
    "event": input
    }); 
    localStorage.setItem("savedDayPlans", "test"); 
}

//Formed a RemoveEvent
function removeEvent(index){
    locationArr.splice([index], 1); 
    savedDayPlans.splice([index],1); 
}

function clearEvent(isClear,index,location,btn){
    if (isClear) {
        removeEvent(index); 
        btn.attr("data-event", "none");  
        localStorage.setItem("savedDayPlans", "test");
    }  else {
        location.val(savedDayPlans[index].event); 
        alert("Event was not cleared"); 
    } 
    console.log("The data-event is set to "+btn.attr("data-event") + " at " +btn.siblings("p").text()); 
}

function changeEvent(time, index, location, btn,eventInput, isPopulated){
    if (eventInput.trim() === "" && isPopulated === "yes"){
        var isSaved= confirm("At "+time+": Would you like to clear the event '"+savedDayPlans[index].event+"' ?"); 
        clearEvent(isSaved,index,location, btn); 
    } else if (eventInput.trim() !== "" && isPopulated ==="none"){
        var isSaved= confirm("At "+time+": Would you like to add the event '"+eventInput+ "'?"); 
        if(isSaved) {
            saveEvent(time, eventInput); 
        }else {
             location.val(""); 
        }
    } else if (eventInput.trim() !== "" && isPopulated=== "yes"){
        if (savedDayPlans[index].event !== eventInput){     
            var isSaved= confirm("At "+time+": Would you like to change the event from '"+savedDayPlans[index].event+"' to '"+eventInput+"'?"); 
            if(isSaved) {
                removeEvent(index); 
                saveEvent(time, eventInput); 
            } else{
                alert("Change was not saved."); 
                location.val(savedDayPlans[index].event); 
            }
        }
     }
}


$(".time-block").delegate("button", "click", function(){
    event.preventDefault();
    var eventInput= $(this).siblings("textarea").val(); 
    // var time= $(this).siblings("p").text(); 
    var time = $(this).siblings("textarea").attr('id');

    console.log(time)
    var location = $(this).siblings("textarea"); 
    var isPopulated= $(this).attr("data-event"); 
    var index= locationArr.indexOf(time);
    var btn =$(this); 

   // changeEvent(time, index, location, btn, eventInput,isPopulated);
    
    // store in localstorage
    storageData.push({
        time: time,
        text: eventInput
    })

    localStorage.setItem('calendarData', JSON.stringify(storageData));


    populateSavedEvents(); 
}); 
        
// Declaring variables to change color based on time functions

    //getting the current time of day
var timeOfDay= moment().format("HighFive");
var timeOfHour=moment().format("HighFive");

    //Need to get past/present/future classes for time of day by creating a loop
var allTimeBlock= $(".time-block"); 

 for (var i=0; i<allTimeBlock.length; i++){
    var timeBlock= $(allTimeBlock[i]); 
    var timeBlockId= timeBlock.attr("id");
    var timeBlockTextarea=timeBlock.children(".row").children("textarea");  
    if (timeBlockId === timeOfDay){
        timeBlockTextarea.addClass("present"); 
    } else if (moment(timeBlockId, "HighFive").isBefore()) {
        timeBlockTextarea.addClass("past"); 
    } else if (moment(timeBlockId, "HighFive").isAfter()) {
        timeBlockTextarea.addClass("future"); 
    }
}

//Need to get past/present/future classes for time of hour by creating a loop  
var allTimeBlockhour=$(".time-blockhour");

 for (var i=0; i<allTimeBlock.length; i++){
    var timeBlockhour= $(allTimeBlockhour[i]); 
    var timeBlockhourId= timeBlock.attr("id");
    var timeBlockTextarea=timeBlock.children(".row").children("textarea");  
    if (timeBlockId === timeOfHour){
        timeBlockTextarea.addClass("present"); 
    } else if (moment(timeBlockhourId, "HighFive").isBefore()) {
        timeBlockTextarea.addClass("past"); 
    } else if (moment(timeBlockhourId, "HighFive").isAfter()) {
        timeBlockTextarea.addClass("future"); 
    }
}
   
//clear button remove events

$("#clearbtn").on("click",function(){
if(confirm("Are you sure you want to clear all saved events?")){
clearLocalStorage(); 
$(".time-block").find("textarea").val("");
$(".time-block").find("button").attr("data-event", "none"); 
       locationArr=[];   
      }
})

//localstorage of saveEvent Btn
// saveLocalStorage();
// $(".time-block").find("textarea).val("");
// $(".time-block").find("button").attr("data-event", "none");
locationArr=[];

// Save all functions to save events
 $("#saveAll").on("click", function(){   
     for( var i=0; i < allTimeBlock.length; i++) {
        var timeBlock= $(allTimeBlock[i]); 
        var time= timeBlock.attr("id");
        var location=timeBlock.children(".row").children("textarea"); 
        var btn=timeBlock.children(".row").children("button");
        var eventInput= location.val(); 
        var isPopulated= btn.attr("data-event");
        var index= locationArr.indexOf(time);
    
        changeEvent(time, index, location,button, eventInput,isPopulated);  
        }
    populateSavedEvents(); 
    alert("No unsaved changed. Restored"); 
 }); 


 // function for changing colors based on time
 function changeColors () {

    var currentHour = moment().format("H");

     for(i = 9; i <= 17; i++) {

        if(i < currentHour) {
            $('#'+i).addClass('past');
        } else if (i == currentHour) {
            $('#'+i).addClass('present');
        } else if(i > currentHour) {
            $('#'+i).addClass('future');
        } 
     }
 }

 changeColors();
