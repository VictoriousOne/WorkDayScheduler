var savedEvents ;


function loadEvents() {

    savedEvents = JSON.parse(localStorage.getItem("calEvents"));
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

    
    timeSlot.time = this.getAttribute("data-hour");
    console.log(timeSlot.time);
    
    textArea = $('textarea[data-hour='  + timeSlot.time +']');
    timeSlot.activity = $('textarea[data-hour='  + timeSlot.time +']').val();
    console.log(timeSlot.activity);
    //textArea.addClass("past");

    var dupTime = savedEvents.findIndex(x => x.time == timeSlot.time);
    console.log("dupTime is " + dupTime);

    if (!(dupTime == -1)) {
        localStorage.removeItem('calEvents');
        savedEvents[dupTime].time = timeSlot.time;
        savedEvents[dupTime].activity = timeSlot.activity;
        localStorage.setItem('calEvents', JSON.stringify(savedEvents));
    }
    else {
        savedEvents.push(timeSlot);
        localStorage.setItem('calEvents', JSON.stringify(savedEvents));
    }
    
}

$("#calendar").on("click", "textarea", saveData);
$("#calendar").on("click", "button", storeData);
loadEvents();

