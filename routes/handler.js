const fs = require('fs')
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

//const uri = "mongodb+srv://danieltest:test@cluster0.bmbjr.mongodb.net/day_data?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
/*client.connect(err => {
    const collection = client.db("day_data").collection("USA_collection");
    // perform actions on the collection object
    console.log(client)

    client.close();
});*/

const uri = "mongodb+srv://danieltest:test@cluster0.bmbjr.mongodb.net/day_data?retryWrites=true&w=majority";
mongoose.connect(uri)

/*
async function main() {
    const uri = "mongodb+srv://danieltest:test@cluster0.bmbjr.mongodb.net/day_data?retryWrites=true&w=majority";

    const client = new MongoClient(uri)

    try{
        await client.connect();

        await listDatabases(client);
    }catch (e) {
        console.error(e)
    } finally {
        await client.close();
    }
    

}

main().catch(console.error)

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
*/





const dataSchema = new mongoose.Schema({
    day: Number,
    rating: Number,
    title: String,
    happy: Boolean,
    overwhelmed: Boolean,
    sad: Boolean,
    meh: Boolean,
    heart: Boolean,
    first_line: String,
    second_line: String,
    third_line: String,
    fourth_line: String
}, {collection: 'USA_collection'});

const day_data = mongoose.model('day_data', dataSchema);


/*
json = {
    day: req.body.id,
    happy: req.body.happy,
    ...
}
var data = new day_data(json);
data.save()*/


/*
var id = req.body.id
day_data.findById(id, function (err, doc) {
    if (err) {
        console.log(err)
    }
    doc.day = req.body.id;
    ...
})
*/

//
//day_data.deleteMany({}, callback)

router.post('/', (req, res) => {
 
    var dataset = require('../dataset.json');
    //console.log(dataset)
    //console.log("Länge: "+dataset.data.length)


    json = {
        day: req.body.data[0].day,
        rating: req.body.data[0].rating,
        title: req.body.data[0].title,
        happy: req.body.data[0].happy,
        overwhelmed: req.body.data[0].overwhelmed,
        sad: req.body.data[0].sad,
        meh: req.body.data[0].meh,
        heart: req.body.data[0].heart
    }
    var data = new day_data(json);

    day_data.findOne({day: req.body.data[0].day}, function(err, doc) {
        if(doc){
            day_data.findOneAndUpdate({ day: req.body.data[0].day }, json, function (err, doc) {
                if (err) return console.log(err);
                return console.log('Data for day ' + req.body.data[0].day + 'updated');
            });
        }else{
            console.log('New Data for day ' + req.body.data[0].day + 'added')
            data.save()
        }
    })
    



    
    /*
        var found_item = false

        var id = req.body.data[0].id
    var rating = req.body.data[0].rating
    var title = req.body.data[0].title
    var happy = req.body.data[0].happy
    var overwhelmed = req.body.data[0].overwhelmed
    var sad = req.body.data[0].sad
    var meh = req.body.data[0].meh
    var heart = req.body.data[0].heart

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

    */
})


router.get('/', (req, res) => {
    day_data.find()
        .then(function (doc) {
            console.log('All Data sent')
            res.send(doc)
        })
    
})

router.get('/soft_delete', (req, res) => {
    var json = {
        rating: 5,
        title: " ",
        happy: false,
        overwhelmed: false,
        sad: false,
        meh: false,
        heart: false
    }
    day_data.updateMany({}, json, function (err, doc) {
        if (err) return console.log(err);
        return console.log('Soft delete for all data (Text remains)');
    });
})

router.get('/hard_delete', (req, res) => {
    day_data.deleteMany({},function (err, doc) {
        console.log(doc.deletedCount + ' items deleted (hard)')
    })
})





    
module.exports = router;




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

