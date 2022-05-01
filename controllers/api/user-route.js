const {User, Post, Comment} = require('../../models');
const router = require('express').Router();

router.get('/',async (req, res) => {

    try{
        const rows = await User.findAll({
            attributes:{exclude: ['password']}
        });

        res.json(rows);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/:id',async (req , res) => {
    try{
        const rows = await User.findOne({
            attributes:{exclude: ['password']},
            where: {
                id: req.params.id,
            }   
        });

        if(!rows)
        {
            res.status(404).json({message: 'User not found'});
        }

        res.json(rows);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
}   
);

router.post('/', async (req, res) => {
    try{
        const result = await User.create ( {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        res.json(result);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
});

router.put('/:id',async (req, res) => {
    try{
        const results = await User.update(req.body, {
            //This will load all instances that are updated into memory and run the beforeUpdate hook
            //Other wise update hook wont be fired for each individual record.
            individualHooks: true,
            where: {
                id: req.params.id
            }
        });

        if(!results)
        {
            res.status(404).json({message: 'Record not found for update'});
            return;
        }

        res.json(results);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
 }   
);

router.delete('/:id', async (req, res) => {

    try{

        const result = await User.destroy({
            where: {
                id: req.params.id
            }
        });

        if(!result)
        {
            res.status(404).json({message: 'User not found'});
            return;
        }
        res.json(result);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;

