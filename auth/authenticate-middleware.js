/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	// check if token is valid
	if(token) {
		jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
			if(error) {
				// token is invalid
				res.status(401).json({message: 'Invalid authorization token'});
			} else {
				// token is valid
				req.user = {username: decodedToken.username}
				next();
			}
		})
	} else {
		res.status(400).json({message: 'Please provide authorization token'});
	}
};
