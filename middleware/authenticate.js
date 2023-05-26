const jwt = require('jsonwebtoken');
require('dotenv').config()
module.exports.verifyToken = (req, res,next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        res.status(400).send('token is mandatory for all routes')
    }
    else {
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY)
            console.log('decoded-->', decoded)
            req.user = decoded
        } catch (err) {
            console.log('err---->', err)
            return res.status(400).send('invalid token ')
        }
        return next();
    }
}