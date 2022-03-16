const express = require('express');
const router = express.Router();

const controller = require('../controller/controller.js')

router.get('/',controller.testing)
router.post('/newOrder',controller.addOrder);
router.get('/newOrder',controller.getNewOrderList);
router.get('/ongoingOrder',controller.getongoingOrder);
router.get('/readyOrder',controller.getreadyOrder);
router.get('/deliveredOrder',controller.getdeliveredOrder);
router.put('/updateStatus',controller.updateStatus);
router.post('/search',controller.search);

module.exports = router;
