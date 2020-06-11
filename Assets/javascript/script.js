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
        timeText: "09:00 am",
        militaryTime: "09",
        userPlan: ""
    },
    {
        timeText: "10:00 am",
        militaryTime: "10",
        userPlan: ""
    },
    {
        timeText: "11:00 am",
        militaryTime: "11",
        userPlan: ""
    },
    {
        timeText: "12:00 pm",
        militaryTime: "12",
        userPlan: ""
    },
    {
        timeText: "01:00 pm",
        militaryTime: "13",
        userPlan: ""
    },
    {
        timeText: "02:00 pm",
        militaryTime: "14",
        userPlan: ""
    },
    {
        timeText: "03:00 pm",
        militaryTime: "15",
        userPlan: ""
    },
    {
        timeText: "04:00 pm",
        militaryTime: "16",
        userPlan: ""
    },
    {
        timeText: "05:00 pm",
        militaryTime: "17",
        userPlan: ""
    },
];

// Save workPlanner object to local storage and convert to strings
function savePlannerObj() {
    localStorage.setItem("workPlanner", JSON.stringify(workPlanner));
}

// Display user input plan
function displayUserPlan() {
    workPlanner.forEach(function(hourPlan) {
        $(hourPlan.timeText).val(hourPlan.userPlan);
    });
}

// Parse saved item from local storage
function parsePlannerObj() {
    var savedData = JSON.parse(localStorage.getItem("workPlanner"));
    if (savedData) {
        workPlanner = savedData;
    }
    savePlannerObj();
    displayUserPlan();
}


// Append html elements that make up the planner
workPlanner.forEach(function(currentHour) {

    // Create a parent div row container in the Planner
    var plannerRow = $("<div>").attr("class", "row");
    $(".container").append(plannerRow);

    //Create child div of row container for for all the inputs in a row
    var inputGroup = $("<div>").attr("class", "input-group");
    plannerRow.append(inputGroup);

    // Create child div of inputGroup to contain hour display and... 
    var hourDisplay = $("<div>").attr("class", "input-group-prepend");

    //...a child span containing the hour text
    var hourText = $("<span>").attr("class", "input-group-text hour").text(`${currentHour.timeText}`);
    hourDisplay.append(hourText);

    // Create textarea element as a sibling of hourDisplay div tht will contain user plan input
    var hourPlan = $("<textarea>")
    hourPlan.attr({
        "placeholder": "What do you want to do at this time?",
        "aria-label": "With textarea"
    });

    // Create div sibling of hourDisplay for the completion checkbox & save button
    var checkSavBtn = $("<div>").attr("class", "input-group-append");

    // Append all sibling elements to parent div inputGroup
    inputGroup.append(hourDisplay, hourPlan, checkSavBtn);

    // Create a child div of chechkSavBtn containing a child input element with checkbox for completion
    var forCheckBox = $("<div>").attr("class", "input-group-text");
    var checkCompletion = $("<input>").attr({
        type: "checkbox",
        "aria-label": "Checkbox for following text input"
    });
    // Create sibling button element of forCHeckBox div to contain the save button
    var saveButton = $("<button>").attr({
        class: "btn btn-outline-secondary saveBtn",
        type: "button",
        id: "button-addon2"
    });
    var saveIcon = $("<i class='far fa-save fa-lg'></i>");
    checkSavBtn.append(forCheckBox, saveButton);
    forCheckBox.append(checkCompletion);
    saveButton.append(saveIcon);

    // If else statement to change CSS properties of user plan input with regards to time
    if (currentHour.militaryTime < moment().format("HH")) {
        hourPlan.attr({
            "class": "form-control past"
        });
    } else if (currentHour.militaryTime === moment().format("HH")) {
        hourPlan.attr({
            "class": "form-control present"
        });
    } else(currentHour.militaryTime > moment().format("HH")); {
        hourPlan.attr({
            "class": "form-control future"
        });
    };
    console.log(currentHour.militaryTime)
    console.log(moment().format("HH"))

    // Pass the function to parse save data from localstorage
    parsePlannerObj();

    // Saves user input plan to local storage
    $(".saveBtn").on("click", function(event) {
        event.preventDefault();
        // var savePlan = $(".future").val().trim();
        var savePlan = $(this).siblings(".input-group-prepend").children(".future").attr("id");
        workPlanner[savePlan].userPlan = $(this).siblings(".input-group-prepend").children(".future").val();
        console.log(savePlan);
        savePlannerObj();
        displayUserPlan();
    });
});


// ------------------------------------------------------------------

// // variable to store and loop through scheduler
// var myDay = [{
// id: "0",
// hour: "09",
// time: "09",
// meridiem: "am",
// reminder: ""
// },
// {
// id: "1",
// hour: "10",
// time: "10",
// meridiem: "am",
// reminder: ""
// },
// {
// id: "2",
// hour: "11",
// time: "11",
// meridiem: "am",
// reminder: ""
// },
// {
// id: "3",
// hour: "12",
// time: "12",
// meridiem: "pm",
// reminder: ""
// },
// {
// id: "4",
// hour: "01",
// time: "13",
// meridiem: "pm",
// reminder: ""
// },
// {
// id: "5",
// hour: "02",
// time: "14",
// meridiem: "pm",
// reminder: ""
// },
// {
// id: "6",
// hour: "03",
// time: "15",
// meridiem: "pm",
// reminder: ""
// },
// {
// id: "7",
// hour: "04",
// time: "16",
// meridiem: "pm",
// reminder: ""
// },
// {
// id: "8",
// hour: "05",
// time: "17",
// meridiem: "pm",
// reminder: ""
// },

// ]

// // gets data for the header date
// function getHeaderDate() {
// var currentHeaderDate = moment().format('dddd, MMMM Do');
// $("#currentDay").text(currentHeaderDate);
// }

// // saves data to localStorage
// function saveReminders() {
// localStorage.setItem("myDay", JSON.stringify(myDay));
// }

// // sets any data in localStorage to the view
// function displayReminders() {
// myDay.forEach(function(_thisHour) {
// $(`#${_thisHour.id}`).val(_thisHour.reminder);
// })
// }

// // sets any existing localStorage data to the view if it exists
// function init() {
// var storedDay = JSON.parse(localStorage.getItem("myDay"));

// if (storedDay) {
// myDay = storedDay;
// }

// saveReminders();
// displayReminders();
// }

// // loads header date
// getHeaderDate();

// creates the visuals for the scheduler body
// myDay.forEach(function(thisHour) {
//     // creates timeblocks row
//     var hourRow = $("<form>").attr({
//         "class": "row"
//     });
//     $(".container").append(hourRow);

//     // creates time field
//     var hourField = $("<div>")
//         .text(`${thisHour.hour}${thisHour.meridiem}`)
//         .attr({
//             "class": "col-md-2 hour"
//         });

//     // creates schdeduler data
//     var hourPlan = $("<div>")
//         .attr({
//             "class": "col-md-9 description p-0"
//         });
//     var planData = $("<textarea>");
//     hourPlan.append(planData);
//     planData.attr("id", thisHour.id);
//     if (thisHour.time < moment().format("HH")) {
//         planData.attr({
//             "class": "past",
//         })
//     } else if (thisHour.time === moment().format("HH")) {
//         planData.attr({
//             "class": "present"
//         })
//     } else if (thisHour.time > moment().format("HH")) {
//         planData.attr({
//             "class": "future"
//         })
//     }

//     // creates save button
//     var saveButton = $("<i class='far fa-save fa-lg'></i>")
//     var savePlan = $("<button>")
//         .attr({
//             "class": "col-md-1 saveBtn"
//         });
//     savePlan.append(saveButton);
//     hourRow.append(hourField, hourPlan, savePlan);
// })

// // loads any existing localstorage data after components created
// init();


// // saves data to be used in localStorage
// $(".saveBtn").on("click", function(event) {
// event.preventDefault();
// var saveIndex = $(this).siblings(".description").children(".future").attr("id");
// myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
// console.log(saveIndex);
// saveReminders();
// displayReminders();
// })