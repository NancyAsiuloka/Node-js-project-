const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {
        this.users = data;
    }
};

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); //unauthorized
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    console.log('Refersh Token:', refreshToken);

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    console.log('Found User:', foundUser);
    if (!foundUser) {
        return res.sendStatus(403); // Forbidden
    }

    // Verify the refresh token and user match
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) {
                return res.sendStatus(403); // Forbidden
            }
            const accessToken = jwt.sign(
                { username: decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60s' }
            );
            res.json({ accessToken });
        }
    );
};

module.exports = { handleRefreshToken }
