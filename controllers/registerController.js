const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {
        this.users = data;
    },
};

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check for duplicate usernames in the database
    const duplicate = usersDB.users.find(person => person.username === user);
    if (duplicate) {
        return res.sendStatus(409); // Conflict
    }

    try {
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // Store the new user
        const newUser = {
            username: user,
            roles: { "User": 2001 },
            password: hashedPwd,
        };
        usersDB.setUsers([...usersDB.users, newUser]);

        // Write the updated user data to the JSON file
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users, null, 2) // Use null, 2 for pretty formatting
        );

        console.log(usersDB.users);
        res.status(200).json({ success: `New user ${user} created` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { handleNewUser };
