const {check, validationResult} = require('express-validator');
const {Router} = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const router = Router();

const User = require('../models/User');


router.post(
    '/register',
    [
        check("username", "Username length must be greater than 6 symbols").isLength({min: 6}),
        check("password", "Password length must be greater than 6 symbols").isLength({min: 6})
    ],
    async (req, res)=>{
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({error: "Некорректные авторизационные данные"});
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
        bodyParser.json(),
        check('username', 'Слишком короткий юзернейм').isLength({min: 6}),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res)=>{
        const err = validationResult(req);
        console.log(err)
        if(!err.isEmpty()){
            return res.status(400).json({error: "Некорректные авторизационные данные"});
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

router.get('/ping', (req, res) => {
    console.log('something in here')
    res.json({answer: 'pong'});
})

module.exports = router;

