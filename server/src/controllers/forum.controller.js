const Forum = require('../models/Forum');

const ForumController = () => {

    const createForum = async (req, res) => {
        const createdForum = await Forum.create({
            name: 'Hardware'
        }); 

        return res.status(200).json(createdForum);
    };

    return {
        createForum
    };
};

module.exports = ForumController;