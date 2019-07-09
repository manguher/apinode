const { Router } = require('express');
const router = Router();

const eventos = require("../eventos.json");

router.get('/eventos', (req, res) => {
    res.json(eventos);
});

module.exports = router;