const bcrypt = require("bcryptjs");
const UserModel = require('../models/user.model')
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

exports.register = async (req, res, next) => {
    try {
        const userModel = await UserModel.findOne({ name: req.body.name })

        if (userModel) {
            res.status(400).json({ name: "Username already exists" }).send();
        } else {

            let newUser = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            console.log(newUser);

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    }
    catch (err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    UserModel.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
}

exports.googleAuth = (req, res) => {
    passport.authenticate('google', { scope: ['email', 'profile'] })(req, res);
}

exports.googleAuthCallback = (req, res, next) => {
    passport.authenticate('google', function (err, user) {

        if (err) {
        } else {
            const payload = {
                id: user._id,
                name: user.name
            };
            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                    expiresIn: 31556926
                },
                (err, token) => {
                    res.redirect(`http://localhost:3000/?token=Bearer ${token}`);
                }
            );

        }
    })(req, res, next);
}
