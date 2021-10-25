

document.getElementById('s1').checked = false;
document.getElementById('s1').checked = true;


let sliders = []
let outputs = []

window.onload = function () {

    //
    //Calculate remaining days
    const checked = document.querySelector('input[type=radio]:checked');
    console.log(checked.id)

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
            console.log("Verbleibende Tage: " + (44 - m[0]))
        });
    }


    for (var i = 1; i < 45; i++) {
        if (document.getElementById("rating_slider" + i) != null && document.getElementById("demo" + i) != null) {
            sliders.push(document.getElementById("rating_slider" + i))
            outputs.push(document.getElementById("demo" + i))
            //pairs.push(array)
            console.log(sliders.length)
            document.getElementById("demo" + i).innerHTML = document.getElementById("rating_slider" + i).value
            const bar = document.getElementById("progress" + i).style["width"] = (i / 44) + "% !important"
        }
    }
}



function slider(number) {
    outputs[number - 1].innerHTML = document.getElementById('rating_slider' + number).value
}


function save(number) {

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

    const fs = require('fs')

    const path = '../data/data.json'

    try {
      if (fs.existsSync(path)) {
        fs.readFile('../data/data.json', 'utf8', function readFileCallback(err, data) {
          if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object

    for (var i = 0; i < obj.data.length; i++) {
        if (obj.data[i]["id"] == id) {
            if (obj.data[i]["rating"] != rating) {
                obj.data[i]["rating"] = rating
            }
            if (obj.data[i]["title"] != title) {
                obj.data[i]["title"] = title
            }
            if (obj.data[i]["happy"] != happy) {
                obj.data[i]["happy"] = happy
            }
            if (obj.data[i]["overwhelmed"] != overwhelmed) {
                obj.data[i]["overwhelmed"] = overwhelmed
            }
            if (obj.data[i]["sad"] != sad) {
                obj.data[i]["sad"] = sad
            }
            if (obj.data[i]["meh"] != meh) {
                obj.data[i]["meh"] = meh
            }
            if (obj.data[i]["heart"] != heart) {
                obj.data[i]["heart"] = heart
            }
            console.log("Data changed")
        } else {
            obj.data.push({ "id": id, "rating": rating, "title": title, "happy": happy, "overwhelmed": overwhelmed, "sad": sad, "meh": meh, "heart": heart })
            console.log("New data added")
        }
    }
    if (obj.data.length == 0) {
        obj.data.push({ "id": id, "rating": rating, "title": title, "happy": happy, "overwhelmed": overwhelmed, "sad": sad, "meh": meh, "heart": heart })
        console.log("First data added")
    }



          json = JSON.stringify(obj); //convert it back to json
          fs.writeFile('../data/data.json', json, 'utf8', callback); // write it back 
       }
     });
    }
     } catch (err) {
        obj.data.push({ "id": id, "rating": rating, "title": title, "happy": happy, "overwhelmed": overwhelmed, "sad": sad, "meh": meh, "heart": heart })
      console.log("First data added")
       json = JSON.stringify(obj); //convert it back to json
       fs.writeFile('../data/data.json', json, 'utf8', callback); // write it back 
       console.error(err)
    }

    postRequest('http://example.com/api/v1/users', { user: 'Dan' })
        .then(data => console.log(data)) // Result from the `response.json()` call
        .catch(error => console.error(error))

    function postRequest(url, data) {
        return fetch(url, {
            credentials: 'same-origin', // 'include', default: 'omit'
            method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
            body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
            .then(response => response.json())
    }

    //requestUserRepos(danielschoenfeld)
}

function requestUserRepos(username) {

    // create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // GitHub endpoint, dynamically passing in specified username
    const url = `https://api.github.com/users/${username}/repos`;

    // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('PUT', url, true);

}







    //var slider1 = document.getElementById("rating_slider1");
    //var output1 = document.getElementById("demo1");
    //output1.innerHTML = slider1.value;

/*
sliders[0].oninput = function () {
    outputs[0].innerHTML = this.value;
}

sliders[1].oninput = function () {
    outputs[1].innerHTML = this.value;
}

sliders[2].oninput = function () {
    outputs[2].innerHTML = this.value;
}

sliders[3].oninput = function () {
    outputs[3].innerHTML = this.value;
}

sliders[4].oninput = function () {
    outputs[4].innerHTML = this.value;
}

sliders[5].oninput = function () {
    outputs[5].innerHTML = this.value;
}

sliders[6].oninput = function () {
    outputs[6].innerHTML = this.value;
}

sliders[7].oninput = function () {
    outputs[7].innerHTML = this.value;
}

sliders[8].oninput = function () {
    outputs[8].innerHTML = this.value;
}

sliders[9].oninput = function () {
    outputs[9].innerHTML = this.value;
}

sliders[10].oninput = function () {
    outputs[10].innerHTML = this.value;
}

sliders[11].oninput = function () {
    outputs[11].innerHTML = this.value;
}

sliders[12].oninput = function () {
    outputs[12].innerHTML = this.value;
}

sliders[13].oninput = function () {
    outputs[13].innerHTML = this.value;
}

sliders[14].oninput = function () {
    outputs[14].innerHTML = this.value;
}

sliders[15].oninput = function () {
    outputs[15].innerHTML = this.value;
}

sliders[16].oninput = function () {
    outputs[16].innerHTML = this.value;
}

sliders[17].oninput = function () {
    outputs[17].innerHTML = this.value;
}

sliders[18].oninput = function () {
    outputs[18].innerHTML = this.value;
}

sliders[19].oninput = function () {
    outputs[19].innerHTML = this.value;
}

sliders[20].oninput = function () {
    outputs[20].innerHTML = this.value;
}

sliders[21].oninput = function () {
    outputs[21].innerHTML = this.value;
}

sliders[22].oninput = function () {
    outputs[22].innerHTML = this.value;
}

sliders[23].oninput = function () {
    outputs[23].innerHTML = this.value;
}

sliders[24].oninput = function () {
    outputs[24].innerHTML = this.value;
}

sliders[25].oninput = function () {
    outputs[25].innerHTML = this.value;
}

sliders[26].oninput = function () {
    outputs[26].innerHTML = this.value;
}

sliders[27].oninput = function () {
    outputs[27].innerHTML = this.value;
}

sliders[28].oninput = function () {
    outputs[28].innerHTML = this.value;
}

sliders[29].oninput = function () {
    outputs[29].innerHTML = this.value;
}

sliders[30].oninput = function () {
    outputs[31].innerHTML = this.value;
}

sliders[32].oninput = function () {
    outputs[32].innerHTML = this.value;
}

sliders[33].oninput = function () {
    outputs[33].innerHTML = this.value;
}

sliders[34].oninput = function () {
    outputs[34].innerHTML = this.value;
}

sliders[35].oninput = function () {
    outputs[35].innerHTML = this.value;
}

sliders[36].oninput = function () {
    outputs[36].innerHTML = this.value;
}

sliders[37].oninput = function () {
    outputs[37].innerHTML = this.value;
}

sliders[38].oninput = function () {
    outputs[38].innerHTML = this.value;
}

sliders[39].oninput = function () {
    outputs[39].innerHTML = this.value;
}

sliders[40].oninput = function () {
    outputs[40].innerHTML = this.value;
}

sliders[41].oninput = function () {
    outputs[41].innerHTML = this.value;
}

sliders[42].oninput = function () {
    outputs[42].innerHTML = this.value;
}

sliders[43].oninput = function () {
    outputs[43].innerHTML = this.value;
}

sliders[44].oninput = function () {
    outputs[44].innerHTML = this.value;
}*/


