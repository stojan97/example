const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Thread = require('./Thread');

const Post = sequelize.define('post', {

    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATEONLY,
        field: 'created_at'
    }
}, {
        timestamps: true,
        updatedAt: false
    }
);

Post.belongsTo(User, { foreignKey: 'user_id' });
Post.belongsTo(Thread, { foreignKey: 'thread_id' });

module.exports = Post;