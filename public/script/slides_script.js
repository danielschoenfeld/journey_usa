document.getElementById('s1').checked = false;


let sliders = []
let outputs = []

window.onload = function () {

    var current = new Date()
    var first_day = new Date("10/28/2021")
    
    var current_day = parseInt((current - first_day) / (1000 * 3600 * 24)) + 1
    console.log('Current day: ' + current_day)
    if (current_day <= 44 && current_day > 0) {
        document.getElementById('s' + current_day).checked = true
    } else {
        document.getElementById('s1').checked = true;
    }
    //fetch('/save')
        fetch('https://journey-usa.herokuapp.com/save')
        .then(response => response.json())
        .then(data => {
            console.log('Amount of data received: ' + data.length)
            for (var i = 0; i < data.length; i++) {
                if (data[i].first_line != undefined) {
                    document.getElementById("first_line" + data[i].day).innerHTML = data[i].first_line
                }
                if (data[i].second_line != undefined) {
                    document.getElementById("second_line" + data[i].day).innerHTML = data[i].second_line
                }
                if (data[i].third_line != undefined) {
                    document.getElementById("third_line" + data[i].day).innerHTML = data[i].third_line
                }
                if (data[i].fourth_line != undefined) {
                    document.getElementById("fourth_line" + data[i].day).innerHTML = data[i].fourth_line
                }
                if (data[i].happy == true) {
                    document.getElementById('e' + data[i].day + '_1').checked = true;
                }
                if (data[i].overwhelmed == true) {
                    document.getElementById('e' + data[i].day + '_2').checked = true;
                }
                if (data[i].meh == true) {
                    document.getElementById('e' + data[i].day + '_3').checked = true;
                }
                if (data[i].sad == true) {
                    document.getElementById('e' + data[i].day + '_4').checked = true;
                }
                if (data[i].title != " ") {
                    document.getElementById('title' + data[i].day).value = data[i].title;
                }
                if (data[i].heart == true) {
                    document.getElementById('heart' + data[i].day).checked = true;
                }
                if (data[i].rating != '5') {
                    document.getElementById('rating_slider' + data[i].day).value = parseInt(data[i].rating)
                    document.getElementById("demo" + data[i].day).innerHTML = parseInt(data[i].rating)
                }

            }

        });

    //Calculate remaining days
    const checked = document.querySelector('input[type=radio]:checked');
    //console.log(checked.id)

    const regex = /\d+/gm;
    const str = checked.id;
    let m;

    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            //console.log("Verbleibende Tage: " + (44 - m[0]))
        });
    }


    for (var i = 1; i < 45; i++) {
        if (document.getElementById("rating_slider" + i) != null && document.getElementById("demo" + i) != null) {

            //Get List of all rating sliders
            sliders.push(document.getElementById("rating_slider" + i))
            //Get a list of all corresponding slider values
            outputs.push(document.getElementById("demo" + i))
            //Set everz slider value to the real value
            document.getElementById("demo" + i).innerHTML = document.getElementById("rating_slider" + i).value

            //Calculate percentage of days already used for progress bar
            var progress = (i / 44) * 100 + "%"
            var remaing_days = i + "/44"
            //Paint every bar depending on the calculated percentage
            document.getElementById("progress" + i).style["width"] = progress
            //
            document.getElementById("remaining_days" + i).innerHTML = remaing_days
        }
    }
}



function slider(number) {
    outputs[number - 1].innerHTML = document.getElementById('rating_slider' + number).value
}





function save(number) {
    document.getElementById("save" + number).style.backgroundColor = "rgb(223,213,202) !important"
    console.log("New Data for day " + number + " saved")
    var obj = {
        "data": []
    }

    var day = number
    var rating = document.getElementById('rating_slider' + number).value
    var title = document.getElementById('title' + number).value
    var happy = document.getElementById('e' + number + '_1').checked
    var overwhelmed = document.getElementById('e' + number + '_2').checked
    var sad = document.getElementById('e' + number + '_4').checked
    var meh = document.getElementById('e' + number + '_3').checked
    var heart = document.getElementById('heart' + number).checked

    if (obj.data.length == 0) {
        obj.data.push({ "day": day, "rating": rating, "title": title, "happy": happy, "overwhelmed": overwhelmed, "sad": sad, "meh": meh, "heart": heart })
    }



    //fetch('/save', {
        fetch('https://journey-usa.herokuapp.com/save', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });


}