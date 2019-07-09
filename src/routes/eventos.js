const { Router } = require('express');
const router = Router();

const eventos = require("../eventos.json");

router.get('/', (req, res) => {
    res.json(eventos);
});

module.exports = router;