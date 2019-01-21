const Forum = require('../models/Forum');
const Category = require('../models/Category');
const Thread = require('../models/Thread');
const sequelize = require('sequelize');

const ForumController = () => {

    const getAll = async (req, res) => {
        try {
            const allForums = await Forum.findAll({
                include: [{
                    model: Category,
                    include: [{
                        model: Thread,
                        attributes: []
                    }],
                    attributes: {
                        exclude: ['forum_id'],
                        include: [[sequelize.fn('COUNT', sequelize.col('*')), 'threadsCount']]
                    },
                }],
                group: ['forum.id', 'categories.id']
            });

            return res.status(200).json(allForums);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'Internal Server Error' });
        }
    };

    return {
        getAll
    };
};

module.exports = ForumController;