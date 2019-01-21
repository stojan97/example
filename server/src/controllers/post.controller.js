const User = require('../models/User');
const Thread = require('../models/Thread');
const Post = require('../models/Post');

const PostController = () => {

    const createPost = async (req, res) => {
        

        const createdPost = await Post.create({
            body: 'CPUs, Motherboards and Memory'
        }); 

        return res.status(200).json(createdPost);
    };

    return {
        createPost
    };
};

module.exports = PostController;