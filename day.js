//Adia's Calculate this Day Calender Planner

$(document).readyfunction() 
var dateTimeDiv = $("div")
    
var currentDateTime = moment().format('MMMM Do YYYY')
    
 //Starting with the current time and day
dateTimeDiv.html(currentDateTime);
 $('#currentday').append(dateTimeDiv);
    
 //Function to styling
function checkTime() {
 var now = parsInt().hours()
}
    console.log(now)
   
$(".time-block").each(function() {
var blockHour = parseInt($(this).attr("data-hour"));
    console.log(blockHour)
}, if (blockHour == now)(
    $(this).addClass("past")
)
if(blockHour === now)(
$(this).removeClass("past")
 (this).addClass("present")
)

else {
  $(this).removeClass("past")
  $(this).removeClass("present")
  $(this).addClass("future")
}
   
   checkTime()
   
   var toDoItem = $(".description")
   $(".saveBtn").on("click", function() {
   console.log("save button clicked")
   localStorage.setItem("To do Item", ToDoItem)
   }
