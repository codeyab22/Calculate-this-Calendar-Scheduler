Adia's Calculate this Day Calendar Planner

$(document).ready(function(){
    var time= moment().format("h:mm:ss");
    var timeSplit = time.split(":"); 
    var minutesToCool= 59 - parseInt(timeSplit[1]); 
    var secondsToCool= 60- parseInt(timeSplit[2]); 
    var timeToCool= minutesToCool*60 + secondsToCool; 
    var secondsElapsed=0; 
    var timerUntilStartReloading= setInterval(function(){ 
        secondsElapsed++
        if (secondsElapsed === timeToRefresh){
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

//Names of elements

var timeBlockcontainer = $(".container"); 
var todaysDate= $("#currentDay"); 

//Formed current date
todaysDateEl.text(moment().format("dddd, do, YYYY")); 

//Formed time blocks
let timesArr= ["9AM","10AM", "11AM", "12PM"]; 

for (let i=1; i<timesArr.length; i++){
    var newTimeBlock= $("#9AM").clone();
    newTimeBlock.attr("id", timesArr[i]); 
    newtimeBlock.children(".row").attr("style", "white-space: pre-Wrap"); 
    newTimeBlock.children(".row").children(".hour").text(timesArr[i]); 
    newTimeBlock.appendTo(".container"); 

}; 

// Declaring variables for saved items to populate planner
var savedDayPlans;
var locationArr = []; 

//Formed a function populateSavedEvents
function populateSavedEvents(){
    savedDayPlans= localStorage.getItem("savedDayPlans"); 
    locationArr=[]; 
    if (savedDayPlans === null || savedDayPlans=== "") {
        savedDayPlans = []; 
    } else {
        savedDayPlans = JSON.parse(savedDayPlans); 
        for (i=0; i<savedDayPlans.length; i++) {
            locationArr.push(savedDayPlans[i].time); 
        }
    }
    
    for (let i=0; i<locationArr.length; i++) {
        var timeBlockElid = "#"+locationArr[i]; 
        var timeBlock = $(timeBlockid).children(".row").children("textarea"); 
        $(timeBlockid).children(".row").children("btn").attr("data-event", "yes"); 
        timeBlockEl.val(savedDayPlans[i].event); 
    }    
}

populateSavedEvents(); 

//Formed a clearLocalStorage function

function clearLocalStorage() {
    savedDayPlans=[]; 
    localStorage.setItem("savedDayPlans", savedDayPlans); 
}

// Formed a function saveEvent Save entries in the planner to local storage

function saveEvent(time,input){
    alert("Your event saved! Congrats!"); 
    savedDayPlans.push({"time":time,
    "event": input
    }); 
    localStorage.setItem("savedDayPlans", JSON.stringify(savedDayPlans)); 
}

//Formed a RemoveEvent
function removeEvent(index){
    locationArr.splice([index], 1); 
    savedDayPlans.splice([index],1); 
}

function clearEvent(isClear,index,location,btn){
    if (isClear) {
        alert("You cleared this event");
        removeEvent(index); 
        btn.attr("data-event", "none");  
        localStorage.setItem("savedDayPlans", JSON.stringify(savedDayPlans));
    }  else {
        location.val(savedDayPlans[index].event); 
        alert("Event was not cleared"); 
    } 
    console.log("The data-event is set to "+btn.attr("data-event") + " at " +btn.siblings("p").text()); 
}

function changeEvent(time, index, location, btn,eventInput, isPopulated){
    if (eventInput.trim() === "" && isPopulated === "yes"){
        let isSaved= confirm("At "+time+": Would you like to clear the event '"+savedDayPlans[index].event+"' ?"); 
        clearEvent(isSaved,index,location, btn); 
    } else if (eventInput.trim() !== "" && isPopulated ==="none"){
        let isSaved= confirm("At "+time+": Would you like to add the event '"+eventInput+ "'?"); 
        if(isSaved) {
            saveEvent(time, eventInput); 
        }else {
             location.val(""); 
        }
    } else if (eventInput.trim() !== "" && isPopulated=== "yes"){
        if (savedDayPlans[index].event !== eventInput){     
            let isSaved= confirm("At "+time+": Would you like to change the event from '"+savedDayPlans[index].event+"' to '"+eventInput+"'?"); 
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
    var time= $(this).siblings("p").text(); 
    var location = $(this).siblings("textarea"); 
    var isPopulated= $(this).attr("data-event"); 
    var index= locationArr.indexOf(time);
    var btn =$(this); 

    changeEvent(time, index, location, buttonEl, eventInput,isPopulated); 
    populateSavedEvents(); 
}); 
        
// Declaring variables to change color based on time functions

    //getting the current time of day
var timeOfDay= moment().format("HighFive"); 

    //Need to get class and select past/present/future and change based on time of day
let allTimeBlockEl= $(".time-block"); 

 for (let i=0; i<allTimeBlockEl.length; i++){
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
   
//clear button remove events

$("#clearbtn").on("click",function(){
if(confirm("Are you sure you want to clear all saved events?")){
clearLocalStorage(); 
$(".time-block").find("textarea").val("");
$(".time-block").find("button").attr("data-event", "none"); 
       locationArr=[];   
      }
})

// Save all functions to save events
 $("#saveAll").on("click", function(){   
     for( let i=0; i < allTimeBlock.length; i++) {
        var timeBlock= $(allTimeBlock[i]); 
        var time= timeBlock.attr("id");
        var location=timeBlock.children(".row").children("textarea"); 
        var btn=timeBlock.children(".row").children("button");
        var eventInput= location.val(); 
        var isPopulated= btn.attr("data-event");
        var index= locationArr.indexOf(time);
    
        changeEvent(time, index, location,buttonEl, eventInput,isPopulated);  
        }
    populateSavedEvents(); 
    alert("No unsaved changed. Restored"); 
 }); 
