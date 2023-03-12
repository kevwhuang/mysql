const express = require('express');

const controller = require('../controllers/users');

const router = express.Router();

router.get('/', controller.read);
router.get('/:id', controller.readSingle);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/', controller.del);

module.exports = router;
