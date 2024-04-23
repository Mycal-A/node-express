const express = require('express')
const router = express.Router()
const uuid = require('uuid')
let users = require('../../users')

//get all users
router.get('/', (req,res)=>{
    res.json(users)
})

//filter users by id
router.get('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ message: 'User not found' });
    }
});

//create new users
router.post('/', (req,res)=>{
    const newUser={
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }

    if(!newUser.name || !newUser.email){
        return res.status(400).json({ message: 'User not found' });
    }
    users.push(newUser)
    res.json(users)
})

//update user
router.put('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        const updateUser = req.body;
        users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {
                user.name = updateUser.name ?? user.name;
                user.email = updateUser.email ?? user.email;
                res.json({ message: 'User updated', user });
            }
        });
    } else {
        res.status(400).json({ message: 'User not found' });
    }
});

//Delete a user
router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const found = users.some(user => user.id === userId);

    if (found) {
        // Filter out the user with the specified ID
        users = users.filter(user => user.id !== userId);
        res.json({ message: 'User deleted', users });
    } else {
        res.status(400).json({ message: 'User not found' });
    }
});

module.exports = router