const Category = require('../models/Category');
const Forum = require('../models/Forum');

const CategoryController = () => {

    const createCategory = async (req, res) => {
        

        const createdCategory = await Category.create({
            name: 'CPUs, Motherboards and Memory'
        }); 

        return res.status(200).json(createdCategory);
    };

    return {
        createCategory
    };
};

module.exports = CategoryController;