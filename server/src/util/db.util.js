const User = require('../models/User');
const Thread = require('../models/Thread');
const Post = require('../models/Post');
const Forum = require('../models/Forum');

const DatabaseUtil = () => {

    const fillDatabase = async () => {
        console.log('Database Util!');
        try {
            const user = await User.create({
                firstName: 'Test',
                lastName: 'Test',
                email: 'test@gmail.com',
                password: 'test123',
            });

            const user2 = await User.create({
                firstName: 'Test2',
                lastName: 'Test2',
                email: 'test2@gmail.com',
                password: 'test1234',
            });

            const forum1 = await Forum.create({
                name: 'Programming'
            });

            const forum2 = await Forum.create({
                name: 'Hardware'
            });

            const category1 = await forum1.createCategory({
                name: 'C and C++'
            });

            const category2 = await forum2.createCategory({
                name: 'Electronics and gadgets'
            });

            const thread1 = await user.createThread({
                title: 'Arduino not working'
            });
            category2.addThread(thread1);

            const thread2 = await user.createThread({
                title: 'C++ online tutorials'
            });
            category1.addThread(thread2);

            const thread3 = await user.createThread({
                title: 'How to sort vector<int>()'
            });
            category1.addThread(thread3);
            
            const post1 = await user.createPost({
                body: 'Where to find good C++ tutorials?'
            });
            thread2.addPost(post1);

            const post2 = await user2.createPost({
                body: 'There are alot of sites like learncpp.com.'
            });
            thread2.addPost(post2);

            const post3 = await user.createPost({
                body: 'My Arduino is not working properly...'
            });
            thread1.addPost(post3);

        }
        catch (err) {
            console.log(err);
        }
    };

    return {
        fillDatabase
    };
};

module.exports = DatabaseUtil;