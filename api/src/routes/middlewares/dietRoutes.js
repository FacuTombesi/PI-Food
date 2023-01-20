const { Router } = require("express");
const { getDiets } = require("../../controllers/controllers");

const router = Router();

router.get("/", async (req, res) => {
    try {
        const diets = await getDiets()
        res.status(200).send(diets)
    }   catch (error) {
        res.status(404).send("There are no diets yet")
    }
});


module.exports = router;