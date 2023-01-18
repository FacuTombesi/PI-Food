const { Router } = require("express");
const { getDiets } = require("../../controllers/controllers");

const router = Router();

router.get("/", getDiets);


module.exports = router;