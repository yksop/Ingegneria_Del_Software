const router = require("express").Router();
const User = require("../models/User");

//Post alert into DB


//get alert from DB
router.get('/:id', async(req,res) => { 
	let alert = await Alert.findById(req.params.id);
    if(!alert) res.status(400).send("Alert does not exist\n");
	res.status(200).json({
		self: '/api/v1/alerts/' + alert.id
    })
});


module.exports = router;
