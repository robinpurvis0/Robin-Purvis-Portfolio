var express = require('express');
var router = express.Router();
var indexControllers = require('../controller/indexControllers');


router.get('/', indexControllers.index);
router.get('/delete/:id', indexControllers.delete);

module.exports = router;