var savedEvents ;


function loadEvents() {

    savedEvents = JSON.parse(localStorage.getItem("events"));
    if (!savedEvents) {
        savedEvents = [];
        return;
    }
    else {
        for (var i = 0; i < savedEvents.length; i++) {
            $('textarea[data-hour=' + savedEvents[i].time + ']').val(savedEvents[i].activity);
        }
    }
}


function saveData () {
    console.log(this);
};

function storeData() {
    console.log(this);
    var timeSlot = {
        time: "",
        activity: ""
    }

    //var btnHour = this.getAttribute("data-hour");
    timeSlot.time = this.getAttribute("data-hour");
    console.log(timeSlot.time);
    //var textArea = $("textarea").find("[data-hour='" + btnHour + "']");
    textArea = $('textarea[data-hour='  + timeSlot.time +']');
    timeSlot.activity = $('textarea[data-hour='  + timeSlot.time +']').val();
    console.log(timeSlot.activity);
    textArea.addClass("past");
}

$("#calendar").on("click", "textarea", saveData);
$("#calendar").on("click", "button", storeData);
loadEvents();

