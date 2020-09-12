const {check, validationResult} = require('express-validator');
const {Router} = require('express');
const jwt = require('jsonwebtoken');

const router = Router();

const User = require('../models/User');


router.post(
    '/register',
    [
        check("username", "Никнейм должен состоять из 6 символов и больше").isLength({min: 6}),
        check("password", "Пароль должен состоять из 6 символов и больше").isLength({min: 6})
    ],
    async (req, res)=>{
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({error: err.errors[0].msg});
        }
        const {username, password} = req.body;
        const weight = {};
        const candidate = await User.findOne({username});

        if(candidate){
            return res.status(400).json({error: "Такой пользователь уже существует"})
        }
        try {
            const user = new User({username, password, weight})
            await user.save()
            res.status(201).json({message: 'Пользователь создан'})
        }catch(e){
            return res.status(500).json({error: e.message});
        }
    }
);

router.post(
    '/login',
    [
        check('username').exists(),
        check('password').exists()
    ],
    async (req, res)=>{
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({error: err.errors[0].msg});
        }
        const {username, password} = req.body;

        const user = await User.findOne({username, password});

        if(!user){
            return res.status(400).json({error: "Неверные данные"})
        }
        try {
            const token = jwt.sign(
                {userId: user.id},
                 require('../config/config').secret
            )
            res.json({token, userId: user.id});

        }catch(e){
            return res.status(500).json({error: e.message});
        }

    }
);
module.exports = router;

