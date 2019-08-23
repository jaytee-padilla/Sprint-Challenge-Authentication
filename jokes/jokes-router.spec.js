const request = require('supertest');
const server = require('../api/server');

// get authorization token
/*
	declare the token variable in a scope accessible
	by the entire test suite
*/
let token;

beforeAll((done) => {
	request(server)
		.post('/api/auth/login')
		.send({
			username: "jaytee",
			password: "yuh",
		})
		.end((err, response) => {
			token = response.body.token; // save the token!
			done();
		});
});

// jokes endpoint
describe('GET /jokes', () => {
	it('should return 200 OK', () => {
		return request(server)
			.get('/api/jokes')
			.set('Authorization', `${token}`)
			.then(res => {
				expect(res.status).toBe(200);
			})
	});

	it('should return 400 Bad Request', () => {
		return request(server)
			.get('/api/jokes')
			.then(res => {
				expect(res.status).toBe(400);
			})
	});
});