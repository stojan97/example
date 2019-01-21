const User = require('../models/User');
const Thread = require('../models/Thread');
const Post = require('../models/Post');

const ThreadService = () => {

    const createThreads = async () => {
        console.log('Creation!!!');
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

            const thread1 = await Thread.create({
                title: 'Arduino not working',
            });
            thread1.setUser(user);

            const thread2 = await Thread.create({
                title: 'C++ online tutorials',
            });
            thread2.setUser(user);

            const post1 = await Post.create({
                body: 'Where to find good C++ tutorials?'
            });
            post1.setUser(user);
            post1.setThread(thread2);
            const post2 = await Post.create({
                body: 'There are alot of sites like learncpp.com.'
            });
            post2.setUser(user2);
            post2.setThread(thread2);

            const post3 = await Post.create({
                body: 'My Arduino is not working properly...'
            });
            post3.setUser(user);
            post3.setThread(thread1);

        }
        catch (err) {
            console.log(err);
        }
    };

    return {
        createThreads
    };
};

module.exports = ThreadService;