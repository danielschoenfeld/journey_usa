

window.onload = function () {
    var likes = 0
    var rating = 0
    var rating_divider = 0
    var happy = 0
    var overwhelmed = 0
    var sad = 0
    var meh = 0

    //fetch('/save')
        fetch('https://journey-usa.herokuapp.com/save')
        .then(response => response.json())
        .then(data => {
            console.log('Amount of data received: ' + data.length)
            //Amount of liked days
            for(var i=0; i<data.length; i++){
                if(data[i].heart){
                    likes = likes + 1
                }
                if (data[i].happy) {
                    happy = happy + 1
                }
                if (data[i].sad) {
                    sad = sad + 1
                }
                if (data[i].meh) {
                    meh = meh + 1
                }
                if (data[i].overwhelmed) {
                    overwhelmed = overwhelmed + 1
                }
                if (data[i].rating) {
                    rating = rating + data[i].rating
                    rating_divider = rating_divider + 1
                }
            }
            rating = Math.round((rating / rating_divider) * 100) / 100
            document.getElementById("rating").innerHTML = rating
            document.getElementById("liked_days").innerHTML = likes
            document.getElementById("happy").innerHTML = happy
            document.getElementById("overwhelmed").innerHTML = overwhelmed
            document.getElementById("sad").innerHTML = sad
            document.getElementById("meh").innerHTML = meh

            var search_day = 1
            var titles = [] 
            for (var i = 0; i < data.length; i++) {
                if(data[i].day == search_day){
                    titles.push(data[i].title)
                    search_day = search_day + 1
                    i = 0
                    if(search_day >= data.length + 1){
                        break
                    }
                }
            }
            console.log(titles.length + " Titles found")

            for(var i=1; i<titles.length+1; i++){
                if(titles[i-1] != ""){
                document.getElementById("titles").innerHTML += ('<h4 style="float: left; width: 4vw">'+i+'</h4><h5>'+titles[i-1]+'</h5>')
                }
            }

        });
}