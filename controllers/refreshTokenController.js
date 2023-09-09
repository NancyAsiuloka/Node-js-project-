const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); //unauthorized
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    console.log('Refresh Token:', refreshToken);

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
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {   UserInfo: {
                    username: decoded.username,
                    roles: roles
                    }
                 },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60s' }
            );
            res.json({ accessToken });
        }
    );
};

module.exports = { handleRefreshToken }
