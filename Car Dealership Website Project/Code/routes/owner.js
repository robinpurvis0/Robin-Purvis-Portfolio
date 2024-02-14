var express = require('express');
var router = express.Router();
var ownerController = require('../controller/ownerController');

/* GET home page. */
router.get('/', ownerController.ownermain);
router.get('/id/:id', ownerController.ownersingle);
router.get('/create', ownerController.create);
router.get('/sell/:id', ownerController.sell_get);
router.post('/sell/:id', ownerController.sell_post);
router.get('/delete/:id', ownerController.delete);
router.get('/update/:id', ownerController.update_get);
router.post('/update/:id', ownerController.update_post);

module.exports = router;