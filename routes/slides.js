const fs = require('fs')
const express = require('express');
const router = express.Router()


router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/slides.html')
})

module.exports = router;