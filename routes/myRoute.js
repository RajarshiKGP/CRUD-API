const express = require('express');
const router = express.Router();
const Crud = require('../models/crud');

router.get('/getuser', async (req, res)=>{
    try{
        const a = await Crud.find();
        res.json(a);
    }catch(err){
        res.send("Error: " + err);
    }
})

router.get('/getuser/:id', async(req, res) => {
    try{
        const a = await Crud.findById(req.params.id);
        if(!a){
            res.send("No such user exists");
            return;
        }

        res.json(a);
    }catch(err){
        res.send("Error: " + err);
    }

})

router.delete('/deleteuser/:id', async(req, res) => {
    try{
        const a = await Crud.findById(req.params.id);
        if(!a){
            res.send("No such user exists");
            return;
        }
        
        res.json(await a.delete());
    }catch(err){
        res.send("Error: " + err);
    }

})

router.post('/createuser', async(req, res) => {
    const a = new Crud({
        name : req.body.name,
        email : req.body.email,
        phoneNo : req.body.phoneNo,
        password : req.body.password
    })

    try{
        const a1 = await a.save();
        res.json(a1);
    }catch(err) {
        res.send("Error: " + err)
    }
})

router.patch("/updateuser/:id", async (req, res) => {
    try{
        const a = await Crud.findById(req.params.id);
        if (!a){
            res.send("No such user exits");
            return;
        }
        const body = req.body;
        if(body.name) a.name = body.name;
        if(body.email) a.email = body.email;
        if(body.phoneNo) a.phoneNo = body.phoneNo;
        if(body.password) a.password = body.password;
        res.json(await a.save());
    }
    catch(e){
        res.send("Error: " + e);
    }
})

module.exports = router;