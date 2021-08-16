const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const MaskData = require('maskdata');

require('dotenv').config()

const emailMask2Options = {
    maskWith: "*", 
    unmaskedStartCharactersBeforeAt: 1,
    unmaskedEndCharactersAfterAt: 1,
    maskAtTheRate: false
};

const handleErrors = (err) =>
{
    console.log(err.message, err.code);
};


exports.signup = (req, res, next) => {
    const isPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    try{
        if (isPassword.test(req.body.password)) {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                        .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
                        .catch(error => res.status(400).json( handleErrors(error) ));
                })
                .catch(error => res.status(500).json({ error }));
        }
        else {
            throw new Error("Le mot de passe doit contenir au moins 8 caractères dont une majuscule, une minuscule, un nombre et un caractère spécial");
        }
    }
    catch(err) {
        return res.status(500).json( handleErrors(err) )
    }
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                console.log('Utilisateur non trouvé !')
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                    if (!valid) {
                        console.log('Mot de passe incorrect !')
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        process.env.TOKEN_ENCODED,
                        { expiresIn: '24h' },
                        )
                    });
                    user.email = MaskData.maskEmail2(req.body.email, emailMask2Options)
                    console.log(user)
                })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};