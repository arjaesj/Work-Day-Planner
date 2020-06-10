// Display Day, Date & cuttent time in the header
function getDateandTime() {
    var dateNow = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    $("#currentDay").text(dateNow);
    setTimeout(getDateandTime, 1000);
}
$(document).ready(function() {
    getDateandTime();
});

// Create object variable for each timeblock to loop through the planner
var workPlanner = [{
        timeText: "9:00 am",
        userPlan: ""
    },
    {
        timeText: "10:00 am",
        userPlan: ""
    },
    {
        timeText: "11:00 am",
        userPlan: ""
    },
    {
        timeText: "12:00 pm",
        userPlan: ""
    },
    {
        timeText: "1:00 pm",
        userPlan: ""
    },
    {
        timeText: "2:00 pm",
        userPlan: ""
    },
    {
        timeText: "3:00 pm",
        userPlan: ""
    },
    {
        timeText: "4:00 pm",
        userPlan: ""
    },
    {
        timeText: "5:00 pm",
        userPlan: ""
    },
];

// Append html elements that make up the planner
workPlanner.forEach(function() {

    // Create a div row container in the Planner
    var plannerRow = $("<div>").attr("class", "row");
    $(".container").append(plannerRow);

    //Create div for for all the inputs in a row
    var inputGroup = $("<div>").attr("class", "input-group");
    plannerRow.append(inputGroup);

    // Create div for hour display and a child span containing the hour text
    var hourDisplay = $("<div>").attr("class", "input-group-prepend");
    inputGroup.append(hourDisplay);
    var hourText = $("<span>").attr("class", "input-group-text hour").text($(workPlanner.timeText));
    hourDisplay.append(hourText);

    // Create textarea for user plan input
    var hourPlan = $("<textarea>").attr({
        class: "form-control",
        placeholder: "What do you want to do at this time?",
        "aria-label": "With textarea"
    });
    inputGroup.append(hourPlan);

    // If else statement to change CSS properties of user plan input with regards to time
    if (workPlanner.timeText < moment().format("h:mm:ss a")) {
        hourPlan.attr("class", "form-control past");
    } else if (workPlanner.time === moment().format("h:mm:ss a")) {
        hourPlan.attr("class", "form-control present");
    } else if (workPlanner.time > moment().format("h:mm:ss a")); {
        hourPlan.attr("class", "form-control future");
    }



    // // Create a checkbox for completion
    // // Create a save button
    // var saveButton = $("<i class='far fa-save fa-lg'></i>");
    // var savePlan = $("<button>")
    //     .attr("class", "col-md-1 saveBtn");
    // savePlan.append(saveButton);    
});