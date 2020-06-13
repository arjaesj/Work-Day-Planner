// Display Day, Date & cuttent time in the header
function getDateandTime() {
    var dateNow = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    $("#currentDay").text(dateNow);
    setTimeout(getDateandTime, 1000);
}
$(document).ready(function() {
    getDateandTime();

    // Create object variable for each timeblock to loop through the planner
    var workPlanner = [{
            id: "0",
            timeText: "09:00 am",
            militaryTime: "09",
            userPlan: ""
        },
        {
            id: "1",
            timeText: "10:00 am",
            militaryTime: "10",
            userPlan: ""
        },
        {
            id: "2",
            timeText: "11:00 am",
            militaryTime: "11",
            userPlan: ""
        },
        {
            id: "3",
            timeText: "12:00 pm",
            militaryTime: "12",
            userPlan: ""
        },
        {
            id: "4",
            timeText: "01:00 pm",
            militaryTime: "13",
            userPlan: ""
        },
        {
            id: "5",
            timeText: "02:00 pm",
            militaryTime: "14",
            userPlan: ""
        },
        {
            id: "6",
            timeText: "03:00 pm",
            militaryTime: "15",
            userPlan: ""
        },
        {
            id: "7",
            timeText: "04:00 pm",
            militaryTime: "16",
            userPlan: ""
        },
        {
            id: "8",
            timeText: "05:00 pm",
            militaryTime: "17",
            userPlan: ""
        },
    ];

    // Save workPlanner object to local storage and convert to strings
    function savePlannerObj() {
        localStorage.setItem("workPlanner", JSON.stringify(workPlanner));
    }

    // Persist user input plan
    function displayUserPlan() {
        workPlanner.forEach(function(_hourPlan) {
            $(`#${_hourPlan.id}`).val(_hourPlan.userPlan);
        });
    }

    // Get saved item from local storage
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
        var hourText = $("<span>").attr("class", "input-group-text hour").text(currentHour.timeText);
        hourDisplay.append(hourText);

        // Create textarea element as a sibling of hourDisplay div tht will contain user plan input
        var hourPlan = $("<textarea>");
        hourPlan.attr({
            "placeholder": "What do you want to do at this time?",
            "aria-label": "With textarea",
            "id": currentHour.id
        });

        // If else statement to change CSS properties of user plan input with regards to time
        if (currentHour.militaryTime == moment().format("HH")) {
            hourPlan.attr({
                "class": "form-control present"
            });
        } else if (currentHour.militaryTime > moment().format("HH")) {
            hourPlan.attr({
                "class": "form-control future"
            });
        } else {
            hourPlan.attr({
                "class": "form-control past"
            });
        }

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
    });

    // Pass the function to parse save data from localstorage
    parsePlannerObj();

    // Clear planner for next day
    function resetPlanner() {
        workPlanner.forEach(function(clearData) {
            clearData.userPlan = "";
        });
        // Resave to localstorage
        savePlannerObj();
    }
    if (moment().format("HHmm") === "0001") {
        resetPlanner();
        parsePlannerObj();
    }

    // Saves user input plan to local storage
    $(".saveBtn").on("click", function(event) {
        event.preventDefault();
        var savePlanId = $(this).parent().siblings(".future").attr("id");
        workPlanner[savePlanId].userPlan = $(this).parent().siblings(".future").val();
        console.log(savePlanId);
        savePlannerObj();
        displayUserPlan();
    });
});