const fs = require('fs')
const express = require('express');
const router = express.Router()


router.get('/', (req, res) => {
    var dataset = require('../dataset.json');
    jsondata = {
        "data": []
    }
    var jsonContent = JSON.stringify(jsondata);
    fs.writeFile("dataset.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been cleared.");
        res.send("Worked")
    });
})

module.exports = router;