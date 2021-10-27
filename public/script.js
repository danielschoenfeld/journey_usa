document.getElementById('s1').checked = false;
document.getElementById('s1').checked = true;


let sliders = []
let outputs = []

window.onload = function () {

    fetch('/save')
    //fetch('https://journey-usa.herokuapp.com/save')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for(var i=0; i < data.data.length; i++){
                if (data.data[i].happy == true) {
                    document.getElementById('e' + data.data[i].id + '_1').checked = true;
                }
                if (data.data[i].overwhelmed == true) {
                    document.getElementById('e' + data.data[i].id + '_2').checked = true;
                }
                if (data.data[i].meh == true) {
                    document.getElementById('e' + data.data[i].id + '_3').checked = true;
                }
                if (data.data[i].sad == true) {
                    document.getElementById('e' + data.data[i].id + '_4').checked = true;
                }
                if (data.data[i].title != " ") {
                    document.getElementById('title' + data.data[i].id).value = data.data[i].title;
                }
                if (data.data[i].heart == true) {
                    document.getElementById('heart' + data.data[i].id).checked = true;
                }
                if (data.data[i].rating != '5') {
                    document.getElementById('rating_slider' + data.data[i].id).value = parseInt(data.data[i].rating)
                    document.getElementById("demo" + data.data[i].id).innerHTML = parseInt(data.data[i].rating)
                }
                
            }
            
        });


    //
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
            sliders.push(document.getElementById("rating_slider" + i))
            outputs.push(document.getElementById("demo" + i))
            //pairs.push(array)
            //console.log(sliders.length)
            document.getElementById("demo" + i).innerHTML = document.getElementById("rating_slider" + i).value
            var progress = (i / 44) * 100 + "%"
            var remaing_days = i+"/44"
            document.getElementById("progress" + i).style["width"] = progress
            document.getElementById("remaining_days" + i).innerHTML = remaing_days
        }
    }
}



function slider(number) {
    outputs[number - 1].innerHTML = document.getElementById('rating_slider' + number).value
}





function save(number) {
    console.log("New Data for day "+ number)
    var obj = {
        "data": []
    }

    var id = number
    var rating = document.getElementById('rating_slider' + number).value
    var title = document.getElementById('title' + number).value
    var happy = document.getElementById('e' + number + '_1').checked
    var overwhelmed = document.getElementById('e' + number + '_2').checked
    var sad = document.getElementById('e' + number + '_4').checked
    var meh = document.getElementById('e' + number + '_3').checked
    var heart = document.getElementById('heart' + number).checked

    

 
    if (obj.data.length == 0) {
        obj.data.push({ "id": id, "rating": rating, "title": title, "happy": happy, "overwhelmed": overwhelmed, "sad": sad, "meh": meh, "heart": heart })
        console.log("First data added")
    }

 

    fetch('/save', {
    //fetch('https://journey-usa.herokuapp.com/save', {
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