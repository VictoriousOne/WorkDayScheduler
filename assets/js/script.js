var savedEvents ;

function timeAudit() {

    var amTime = [9,10,11];
    var pmTime = [12,1,2,3,4,5];
    var calTime;
    var amORpm;
    var curTime = moment().format("MM-DD-YYY h:mm a");
    var theDate = moment().format("MM-DD-YYYY").toString();
    console.log(theDate);

    console.log("curTime is " + curTime);
    $("textarea").each(function () {
        
        if (jQuery.inArray(parseInt(this.getAttribute("data-hour")), amTime) !== -1) {
            amORpm = "AM";
        }
        else {
            amORpm = "PM";
        }
        calTime = (this.getAttribute("data-hour")).toString() + ':00' + amORpm;
        console.log("This is calTime before moment " + calTime);

        calTime = moment(theDate + " " + calTime, 'MM-DD-YYYY h:mm a').format('MM-DD-YYYY h:mm a');
        console.log("CalTime after date " + calTime);
        
        
        //calTime = moment(theDate + " " + calTime).format("h:mm  a")
        console.log("calTime is " + calTime);

        console.log(this);

        if (calTime < curTime) {
            $(this).addClass("past");
        }
        else if (calTime > curTime) {
            $(this).addClass("future");
        }
        else {
            $(this).addClass("present");
        }


    })
}


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
$("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));
loadEvents();
timeAudit();

