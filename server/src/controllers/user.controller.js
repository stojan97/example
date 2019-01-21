const User = require('../models/User');
const AuthService = require('../services/auth.service');
const BcryptService = require('../services/bcrypt.service');

const UserController = () => {

    const hello = (req, res) => {
        return res.send('Welcome to IT forum API!');
    };

    const register = async (req, res) => {
        const newUser = req.body;
        try {
            const user = await User.create({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                password: newUser.password,
            });

            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'User already exists.' });
        }
    };

    const login = async (req, res) => {
        const loginUser = req.body;

        if (loginUser.email && loginUser.password) {
            try {
                const user = await User
                    .findOne({
                        where: {
                            email: loginUser.email
                        },
                    });

                if (!user) {
                    return res.status(400).json({ msg: 'Bad Credentials: Email or password is wrong' });
                }
                if (BcryptService().comparePassword(loginUser.password, user.password)) {
                    const token = AuthService().issue({ email: user.email, firstName: user.firstName, lastName: user.lastName });
                    return res.status(200).json(token);
                }

                return res.status(401).json({ msg: 'Unauthorized' });
            } catch (err) {
                console.log(err);
                return res.status(500).json({ msg: 'Internal server error' });
            }
        }

        return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
    };

    return {
        hello,
        register,
        login
    };
};

module.exports = UserController;