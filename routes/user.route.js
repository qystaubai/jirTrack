const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const bodyParser = require('body-parser');

const router = Router();

const User = require('../models/User');

router.get('/test', (req, res) => {
    return res.json({ message: 'you did it' });
    }
)

router.post('/rename',  async (req, res) => {
    const {id, newName} = req.body;
    await User.findByIdAndUpdate( id,  { username: newName }, {useFindAndModify: false});
    return res.status(201);
})

router.post('/track', [
    check("weight", "You must enter the weight").notEmpty()
], async (req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({error: "Некорректные данные"});
    }
    const {id, date, weight} = req.body;
    try {
        const user = await User.findById(id, 'weight',{useFindAndModify: false});
        const update = await User.findByIdAndUpdate(id, {['weight.' + [Object.keys({...user.weight}).length]]: {date: date, weight: weight}}, {useFindAndModify: false});
    } catch (e) {
        return res.json(e.message)
    }
    return res.status(201).end();
})

router.get('/jir/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id, 'weight', {useFindAndModify: false});
        if (user.weight) {
            return res.json(Object.entries(user.weight).slice(-10));
        }
        res.json({});
    } catch (e) {
        console.log(e)
        return res.json(e.message)
    }
})
module.exports = router;