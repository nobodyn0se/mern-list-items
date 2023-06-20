const secretKey = process.env.JWT_SECRET_KEY;

const jwt = require('jsonwebtoken');

const authToken = (req, res, next)  => {
    const token = req.headers['authorization'];
    
    //const extractedToken = tokenInfo.split(' ')[1];

    if(token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if(err) {
                return res.status(403).json({ message: 'Invalid token' });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized access. Please log in to continue' });
    }
}

module.exports = { authToken };
