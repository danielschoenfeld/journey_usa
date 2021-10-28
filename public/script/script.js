function go_to_slides(){
        console.log("function slides called")
        //fetch('/slides')
            fetch('https://journey-usa.herokuapp.com/slides')
            .then(response => {
                console.log(response)
                window.location.assign(response.url);
            });
    
}

function go_to_overview() {
    console.log("function overview called")
    //fetch('/overview')
        fetch('https://journey-usa.herokuapp.com/overview')
        .then(response => {
            console.log(response)
            window.location.assign(response.url);
        });

}

window.onload = function () {
    
    var current = new Date()
    var first_day = new Date("10/28/2021")
    var current_hours = parseInt((current - first_day) / (1000 * 3600))
    var current_seconds = parseInt((current - first_day) / (1000))
    var current_day = parseInt((current - first_day) / (1000 * 3600 * 24)) + 1
    console.log('Current day: ' + current_day)
    if (current_day <= 44 && current_day > 0) {
        document.getElementById("days").innerHTML = current_day
        document.getElementById("hours").innerHTML = current_hours
        document.getElementById("seconds").innerHTML = current_seconds
    } else {
        document.getElementById("days").innerHTML = "0"
        document.getElementById("hours").innerHTML = "0"
        document.getElementById("seconds").innerHTML = "0"
    }

    
}
