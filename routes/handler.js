const fs = require('fs')
const express = require('express')
const router = express.Router()


router.post('/', (req, res) => {
    var dataset = require('../dataset.json');
    console.log(dataset)
    console.log("Länge: "+dataset.data.length)
    res.send(req.body.data[0])

    var id = req.body.data[0].id
    var rating = req.body.data[0].rating
    var title = req.body.data[0].title
    var happy = req.body.data[0].happy
    var overwhelmed = req.body.data[0].overwhelmed
    var sad = req.body.data[0].sad
    var meh = req.body.data[0].meh
    var heart = req.body.data[0].heart

    var found_item = false



    

    if(dataset.data.length == 0){
        dataset.data.push(req.body.data[0])
        var jsonContent = JSON.stringify(dataset);
        fs.writeFile("dataset.json", jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }

            console.log("JSON file has been saved.");
        });
    }else{


        for (var i = 0; i < dataset.data.length; i++) {
            if (dataset.data[i]["id"] == id) {
                if (dataset.data[i]["rating"] != rating) {
                    dataset.data[i]["rating"] = rating
                }
                if (dataset.data[i]["title"] != title) {
                    dataset.data[i]["title"] = title
                }
                if (dataset.data[i]["happy"] != happy) {
                    dataset.data[i]["happy"] = happy
                }
                if (dataset.data[i]["overwhelmed"] != overwhelmed) {
                    dataset.data[i]["overwhelmed"] = overwhelmed
                }
                if (dataset.data[i]["sad"] != sad) {
                    dataset.data[i]["sad"] = sad
                }
                if (dataset.data[i]["meh"] != meh) {
                    dataset.data[i]["meh"] = meh
                }
                if (dataset.data[i]["heart"] != heart) {
                    dataset.data[i]["heart"] = heart
                }
                console.log("Data changed")
                found_item = true
                break
            }
        }

        if(found_item == false){
            dataset.data.push({ "id": id, "rating": rating, "title": title, "happy": happy, "overwhelmed": overwhelmed, "sad": sad, "meh": meh, "heart": heart })
        }


        var jsonContent = JSON.stringify(dataset);
        fs.writeFile("dataset.json", jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }

            console.log("JSON file has been saved.");
        });

    }

    
/*
    var obj = {
        "data": []
    };

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
        console.log("First data added, because no data existed")
    }

    // parse json
    //var jsonObj = JSON.parse(jsonData);
    //console.log(jsonObj);

    // stringify JSON Object
    var jsonContent = JSON.stringify(jsonObj);
    console.log(jsonContent);

    fs.writeFile("dataset.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });

    /*
    try {
        if (fs.existsSync(path)) {
            fs.readFile(dataset, 'utf8', function readFileCallback(err, data) {
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
                        console.log("First data added, because no data existed")
                    }



                    json = JSON.stringify(obj); //convert it back to json
                    fs.writeFile("output.json", json, 'utf8', function (err) {
                        if (err) {
                            console.log("An error occured while writing JSON Object to File.");
                            return console.log(err);
                        }

                        console.log("JSON file has been saved.");
                    });
                }
            });
        }
    } catch (err) {
        var obj = {
            "data": []
        }

        obj.data.push({ "id": id, "rating": rating, "title": title, "happy": happy, "overwhelmed": overwhelmed, "sad": sad, "meh": meh, "heart": heart })
        console.log("First data added")
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile("output.json", json, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }

            console.log("JSON file has been saved.");
        });
        console.error(err)
    }*/

})


router.get('/delete', (req, res) => {
    var dataset = require('../dataset.json');
    dataset = {
        "data": []
    }
    var jsonContent = JSON.stringify(dataset);
    fs.writeFile("dataset.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been cleared.");
    });
    var dataset_new = require('../dataset.json');
    console.log(dataset_new)
    res.send("Worked")
})

router.get('/', (req, res) => {
    var dataset_get = require('../dataset.json');
    console.log(dataset_get)
    res.send(dataset_get)
})





    
module.exports = router;