const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');
const sequelize = require('../config/database');
const Thread = require('./Thread');
const Post = require('./Post');

const hooks = {
    beforeCreate(user) {
        user.password = bcryptService().password(user);
    },
};

const User = sequelize.define('user', {

    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'first_name'
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'last_name'
    }
}, {
        hooks,
        timestamps: false
    }
);

User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.password;

    return values;
};


User.hasMany(Thread, { foreignKey: 'user_id' });
User.hasMany(Post, { foreignKey: 'user_id' });

module.exports = User;