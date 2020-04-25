const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post(
    "/register",
    [
        check('email', 'incorrect email').isEmail(),
        check('password', 'minimum password lengths - 6 characters')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'incorrect data'
            })
        }

        const { email, password } = req.body;

        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.status(400).json({ message: "This user is already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: "user created" });
    } catch (e) {
        res.status(500).json({ message: "something went wrong. please try again" });
    }
});

// /api/auth/login
router.post("/login", async (req, res) => { });

module.exports = router;
