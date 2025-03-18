const router = require("express").Router();
const {handleEntry, handleExit, checkParkingStatus} = require("../controllers/parking.controller")
const protectedRoute = require("../middlewire/auth.middlewire")

router.post("/entry",protectedRoute,handleEntry);
router.post("/exit",protectedRoute,handleExit);
router.post("/status",protectedRoute,checkParkingStatus);

module.exports = router;